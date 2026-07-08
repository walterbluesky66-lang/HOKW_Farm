const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const appJs = fs.readFileSync(path.join(root, "app.js"), "utf8");
const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const buildSiteJs = fs.readFileSync(path.join(root, "scripts", "build-site.js"), "utf8");
const storageKeysJs = fs.readFileSync(path.join(root, "storage-keys.js"), "utf8");
const cropArchiveHtml = fs.readFileSync(path.join(root, "crop-archive.html"), "utf8");
const valueCalculatorHtml = fs.readFileSync(path.join(root, "value-calculator.html"), "utf8");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function createFakeElement() {
  return {
    addEventListener() {},
    append() {},
    appendChild() {},
    click() {},
    closest() {
      return null;
    },
    contains() {
      return false;
    },
    focus() {},
    insertAdjacentElement() {},
    insertAdjacentHTML() {},
    matches() {
      return false;
    },
    querySelector() {
      return null;
    },
    querySelectorAll() {
      return [];
    },
    remove() {},
    removeAttribute() {},
    setAttribute() {},
    checked: false,
    classList: {
      add() {},
      contains() {
        return false;
      },
      remove() {},
      toggle() {}
    },
    className: "",
    dataset: {},
    disabled: false,
    innerHTML: "",
    options: [],
    selectedIndex: 0,
    selectedOptions: [],
    style: {},
    textContent: "",
    value: ""
  };
}

function loadAppForPlannerChecks(localStorageSeed = {}, elementOverrides = {}, now = null) {
  const DateCtor = now === null
    ? Date
    : class FixedDate extends Date {
        constructor(...args) {
          super(...(args.length ? args : [now]));
        }

        static now() {
          return now;
        }

        static parse(value) {
          return Date.parse(value);
        }

        static UTC(...args) {
          return Date.UTC(...args);
        }
      };
  const documentMock = {
    addEventListener() {},
    body: {
      append() {},
      appendChild() {},
      dataset: {}
    },
    createElement() {
      return createFakeElement();
    },
    getElementById(id) {
      return Object.prototype.hasOwnProperty.call(elementOverrides, id)
        ? elementOverrides[id]
        : null;
    },
    querySelector() {
      return null;
    },
    querySelectorAll() {
      return [];
    }
  };
  const localStorageStore = new Map(Object.entries(localStorageSeed));
  const localStorageMock = {
    getItem(key) {
      return localStorageStore.has(key) ? localStorageStore.get(key) : null;
    },
    removeItem(key) {
      localStorageStore.delete(key);
    },
    setItem(key, value) {
      localStorageStore.set(key, String(value));
    }
  };
  const windowMock = {
    addEventListener() {},
    clearInterval() {},
    clearTimeout,
    confirm() {
      return true;
    },
    HOKW_STORAGE: null,
    isSecureContext: true,
    location: { href: "test://planner" },
    setInterval() {
      return 0;
    },
    setTimeout
  };
  const context = {
    Array,
    clearInterval() {},
    clearTimeout,
    console,
    Date: DateCtor,
    document: documentMock,
    Intl,
    isFinite,
    JSON,
    localStorage: localStorageMock,
    Map,
    Math,
    Number,
    Object,
    parseFloat,
    parseInt,
    Set,
    setInterval() {
      return 0;
    },
    setTimeout,
    String,
    window: windowMock
  };

  windowMock.document = documentMock;
  windowMock.localStorage = localStorageMock;
  windowMock.window = windowMock;
  vm.createContext(context);
  vm.runInContext(appJs, context);
  context.__localStorageStore = localStorageStore;
  return context;
}

function between(source, start, end, label) {
  const startIndex = source.indexOf(start);
  assert(startIndex >= 0, `Missing start marker for ${label}: ${start}`);
  const endIndex = source.indexOf(end, startIndex + start.length);
  assert(endIndex >= 0, `Missing end marker for ${label}: ${end}`);
  return source.slice(startIndex, endIndex);
}

const farmHeader = between(
  appJs,
  '<div class="farm-title-row">',
  '<div class="metric-grid">',
  "farm card header"
);

const homeStats = between(
  indexHtml,
  '<section class="grid-stats">',
  '<main class="main">',
  "home stats cards"
);

assert(
  homeStats.includes("距离最大间隔") &&
  !homeStats.includes("下次自浇"),
  "Home top stat should guide users to the max-interval/final-watering target instead of next self-watering"
);

const farmMetricGrid = between(
  appJs,
  '<div class="metric-grid">',
  '<div class="progress-wrap">',
  "farm metric grid"
);

assert(
  farmMetricGrid.includes("剩余成熟") &&
  farmMetricGrid.includes("理论最短") &&
  farmMetricGrid.indexOf("理论最短") < farmMetricGrid.indexOf("💧"),
  "Remaining maturity card should include theoretical shortest maturity before the watering guidance card"
);

assert(
  farmMetricGrid.includes("距离最大间隔") &&
  !farmMetricGrid.includes("下次自浇") &&
  farmMetricGrid.includes("最佳收尾早于最大间隔"),
  "Farm metric grid should replace the next self-watering card with max-interval/final-watering guidance"
);

const waterReminderTarget = between(
  appJs,
  "function getWaterReminderTarget",
  "function getCurrentTheoreticalPlan",
  "water reminder target helper"
);

assert(
  waterReminderTarget.includes("finalAt && finalAt <= maxAt") &&
  waterReminderTarget.includes('type = shouldUseFinal ? "final"'),
  "Water reminder target should prefer best final watering when it is earlier than the max interval"
);

const reminderBlock = between(
  appJs,
  "function checkDueReminders()",
  "function showReminder(",
  "reminder scheduler"
);

assert(
  reminderBlock.includes("getWaterReminderTarget") &&
  !reminderBlock.includes("const nextWaterAt = getNextWaterAt(farm);"),
  "Farm reminders should target max interval or best final watering, not the earliest next self-watering"
);

["selfWater", "friendWater", "sunbin", "harvest"].forEach(action => {
  assert(
    farmHeader.includes(`data-action="${action}"`),
    `Farm action ${action} should render in the farm card header`
  );
});

const harvestButtonMatch = farmHeader.match(/<button class="btn amber" data-action="harvest"([^>]*)>/);
assert(
  harvestButtonMatch,
  "Farm harvest action should render as a button in the farm card header"
);
assert(
  !harvestButtonMatch[1].includes("disabled"),
  "Farm harvest action should stay enabled even while the crop is still growing"
);

assert(
  farmHeader.includes('class="farm-name-line"'),
  "Farm action buttons should align with the crop title line"
);

assert(
  (farmHeader.match(/class="btn-icon"/g) || []).length >= 5,
  "Farm action buttons should use fixed-size icon spans"
);

const ranchHome = between(
  appJs,
  "function renderRanchHome()",
  "function renderRanchPage()",
  "ranch home renderer"
);

assert(
  ranchHome.includes("data-ranch-home-harvest-group"),
  "Ranch reminder card should render harvest buttons on the home page"
);
assert(
  ranchHome.includes("<span>收获</span>"),
  "Ranch home harvest button should be labeled 收获"
);
assert(
  !ranchHome.includes("收${escapeHtml(info.meta.shortLabel)}"),
  "Ranch home harvest button should not include 16h/20h in its visible label"
);
assert(
  appJs.includes("data-ranch-home-harvest-group") && appJs.includes("harvestRanchGroup"),
  "Home ranch harvest buttons should be bound to the existing ranch harvest flow"
);

const ranchShortcutPattern = /<section class="panel shortcut-panel">[\s\S]*?href="ranch\.html"[\s\S]*?<\/section>/;
assert(
  !ranchShortcutPattern.test(indexHtml),
  "Duplicate ranch management shortcut card should be removed from the sidebar"
);

assert(
  indexHtml.includes('class="brand-row"') &&
  indexHtml.includes('href="residence-settings.html"') &&
  indexHtml.includes('href="user-storage.html"'),
  "Home header should expose residence settings and user/storage management beside the Farm Helper pill"
);

assert(
  !indexHtml.includes('class="panel farm-settings-panel"') &&
  !indexHtml.includes('id="plannerLevel"') &&
  !indexHtml.includes('id="cloudSyncMount"') &&
  !indexHtml.includes('id="dataExportBtn"'),
  "Home page should no longer render the large residence settings or user/storage panels"
);

const residenceHtml = fs.readFileSync(path.join(root, "residence-settings.html"), "utf8");
assert(
  residenceHtml.includes("<h1>居所设置</h1>") &&
  residenceHtml.includes("当前居所等级") &&
  residenceHtml.includes('id="plannerLevel"') &&
  residenceHtml.includes('id="plannerLandCount"') &&
  residenceHtml.includes('id="plannerCropStallLevel"') &&
  residenceHtml.includes("菜摊等级") &&
  residenceHtml.includes('src="app.js"'),
  "Residence settings should live on a secondary page using residence, land, and crop stall inputs"
);

const userStorageHtml = fs.readFileSync(path.join(root, "user-storage.html"), "utf8");
assert(
  userStorageHtml.includes("<h1>用户与存档管理</h1>") &&
  userStorageHtml.includes('id="cloudSyncMount"') &&
  userStorageHtml.includes('id="dataExportBtn"') &&
  userStorageHtml.includes('id="dataImportBtn"') &&
  userStorageHtml.includes('src="cloud-sync.js"') &&
  userStorageHtml.includes('src="app.js"'),
  "User/storage management should live on a secondary page with cloud sync and backup controls"
);

assert(
  buildSiteJs.includes('"residence-settings.html"') &&
  buildSiteJs.includes('"user-storage.html"'),
  "Build script should publish the new secondary pages"
);

const cropArchiveBlock = between(
  appJs,
  "const BUILT_IN_CROP_ARCHIVE = [",
  "];\n    const BUILT_IN_ANIMAL_ARCHIVE",
  "built-in crop archive"
);

const cropIds = [...cropArchiveBlock.matchAll(/id:\s*"([^"]+)"/g)].map(match => match[1]);
assert(cropIds.length === 34, "Built-in crop archive should contain exactly 34 standard crops");
assert(new Set(cropIds).size === 34, "Built-in crop archive crop ids should be unique");
assert(
  cropArchiveBlock.includes('name: "浣溪圆茄"') &&
  cropArchiveBlock.includes("basePriceMax: 200") &&
  cropArchiveBlock.includes("coins: 5000"),
  "浣溪圆茄 should use corrected max base price 200 and one-field coins 5000"
);
assert(
  cropArchiveBlock.includes('name: "粟米"') &&
  cropArchiveBlock.includes("archiveOnly: true"),
  "Level 1-5 crops should be present as archive-only entries"
);

assert(
  appJs.includes("function isCropArchiveItemComputable") &&
  appJs.includes("item.farmLevel >= 6") &&
  appJs.includes("getComputableCropArchiveItems"),
  "Crop calculations should filter out archive-only level 1-5 crops"
);
assert(
  appJs.includes("function getCropStallMultiplier") &&
  appJs.includes("plannerCropStallLevel") &&
  appJs.includes("cropStallLevel"),
  "Crop stall level should be stored with planner/residence settings"
);
assert(
  appJs.includes("菜摊参考") &&
  appJs.includes("基准收益") &&
  appJs.includes("仅档案"),
  "Read-only crop archive should render base, stall-reference, and archive-only labels"
);
assert(
  !cropArchiveHtml.includes('id="archiveForm"') &&
  !cropArchiveHtml.includes('id="archiveName"') &&
  !cropArchiveHtml.includes('id="archiveSaveBtn"') &&
  !cropArchiveHtml.includes('id="archiveExportBtn"'),
  "Crop archive page should no longer expose crop edit/export controls"
);
assert(
  cropArchiveHtml.includes("标准作物库") &&
  cropArchiveHtml.includes("只读"),
  "Crop archive page should explain that crops are a read-only standard library"
);
assert(
  cropArchiveHtml.includes('id="animalArchiveForm"') &&
  cropArchiveHtml.includes('id="animalArchiveSaveBtn"'),
  "Animal archive editing should remain available"
);
assert(
  valueCalculatorHtml.includes("满级基准单价 × 产量") &&
  valueCalculatorHtml.includes("不计算菜摊加成"),
  "Value calculator should document the crop coin formula without stall bonus"
);
assert(
  !storageKeysJs.includes('wzry-world-farm-crop-archive-v1", label: "作物档案"'),
  "Portable/cloud storage keys should not include the old user crop archive key"
);

const plannerStateKey = "wzry-world-farm-planner-v1";
const stalePlannerNow = new Date(2026, 6, 7, 9, 0, 0, 0).getTime();
const stalePlannerStartedAt = stalePlannerNow - 8 * 24 * 60 * 60 * 1000;
const stalePlannerContext = loadAppForPlannerChecks({
  [plannerStateKey]: JSON.stringify({
    active: true,
    currentLevel: 52,
    landCount: 30,
    weekendTarget: 6000,
    sleepStart: "00:00",
    sleepEnd: "08:00",
    includeBlessing: true,
    startedAt: stalePlannerStartedAt,
    progressWindowStart: stalePlannerStartedAt,
    weekendProgress: 0
  })
});
assert(
  typeof stalePlannerContext.refreshExpiredPlannerHorizon === "function",
  "Planner should expose a horizon refresh helper for expired active schedules"
);
assert(
  stalePlannerContext.refreshExpiredPlannerHorizon(stalePlannerNow),
  "Expired active planner schedules should roll the 7-day horizon forward"
);
const refreshedPlannerState = JSON.parse(
  stalePlannerContext.__localStorageStore.get(plannerStateKey)
);
assert(
  refreshedPlannerState.startedAt === stalePlannerNow,
  "Expired active planner should save a fresh horizon start instead of staying on an old 7-day window"
);
assert(
  stalePlannerContext.getPlannerAvailableCrops(52).some(item => item.name === "浣溪圆茄"),
  "Lv.52 planner candidates should include 浣溪圆茄 after the horizon refresh"
);
const heavyPlannerNow = new Date(2026, 5, 26, 8, 0, 0, 0).getTime();
const heavyPlannerContext = loadAppForPlannerChecks({
  [plannerStateKey]: JSON.stringify({
    active: true,
    currentLevel: 52,
    landCount: 30,
    weekendTarget: 6000,
    sleepStart: "00:00",
    sleepEnd: "08:00",
    includeBlessing: true,
    startedAt: heavyPlannerNow,
    progressWindowStart: heavyPlannerNow,
    weekendProgress: 0
  })
}, {}, heavyPlannerNow);
const heavyPlannerStartedAt = Date.now();
const heavyPlannerPreview = heavyPlannerContext.buildPlannerPreview(heavyPlannerNow);
const heavyPlannerElapsedMs = Date.now() - heavyPlannerStartedAt;
assert(
  heavyPlannerPreview.records.some(record => !record.locked),
  "Lv.52 planner preview should still produce an executable crop in the heavy Friday double-window scenario"
);
assert(
  heavyPlannerPreview.records.find(record => !record.locked)?.name === "星夜龙眼",
  "Lv.52 planner should keep the Friday double-window target recommendation on 星夜龙眼"
);
assert(
  heavyPlannerElapsedMs < 8000,
  `Lv.52 planner preview should finish quickly enough for the browser, took ${heavyPlannerElapsedMs}ms`
);
const plannerPlantAt = new Date(2026, 5, 26, 16, 45, 0, 0).getTime();
const plannerContext = loadAppForPlannerChecks({
  [plannerStateKey]: JSON.stringify({
    active: true,
    currentLevel: 52,
    landCount: 30,
    weekendTarget: 6000,
    sleepStart: "00:00",
    sleepEnd: "08:00",
    includeBlessing: true,
    startedAt: plannerPlantAt,
    progressWindowStart: plannerPlantAt,
    weekendProgress: 0
  })
}, {}, plannerPlantAt);
const plannerCycle = plannerContext.getPlannerCropCycle(
  { cropKey: "money20", coins: 1, exp: 0, name: "planner test crop" },
  plannerPlantAt,
  { sleepStartMinutes: 0, sleepEndMinutes: 8 * 60 }
);
const expectedSleepAwareMatureAt = new Date(2026, 5, 27, 7, 15, 0, 0).getTime();
const expectedSleepAwareHarvestAt = new Date(2026, 5, 27, 8, 0, 0, 0).getTime();
const sleepStartAt = new Date(2026, 5, 27, 0, 0, 0, 0).getTime();
const latestEveningWater = plannerCycle.waterEvents.find(event =>
  event.at > new Date(2026, 5, 26, 23, 30, 0, 0).getTime() &&
  event.at < sleepStartAt &&
  event.reduction > 0
);

assert(
  plannerCycle.matureAt === expectedSleepAwareMatureAt,
  "Planner should include the last available non-full self-watering before sleep when it advances maturity"
);
assert(
  plannerCycle.harvestAt === expectedSleepAwareHarvestAt,
  "Planner should still move a sleep-period maturity to the configured wake-up harvest time"
);
assert(
  latestEveningWater,
  "Planner should record the pre-sleep non-full self-watering event"
);

const currentNow = new Date(2026, 5, 26, 17, 31, 0, 0).getTime();
const currentPlantAt = new Date(2026, 5, 26, 16, 0, 0, 0).getTime();
const currentRawMatureAt = new Date(2026, 5, 27, 9, 45, 0, 0).getTime();
const currentPlannerCycle = plannerContext.getCurrentFarmPlannerCycle(
  {
    cropKey: "money20",
    plantedAt: currentPlantAt,
    totalReductionMs: currentPlantAt + 20 * 60 * 60 * 1000 - currentRawMatureAt,
    lastSelfWaterAt: new Date(2026, 5, 26, 16, 56, 0, 0).getTime(),
    friendWaterCount: 4
  },
  currentNow,
  { sleepStartMinutes: 0, sleepEndMinutes: 8 * 60 }
);
const currentPreSleepWater = currentPlannerCycle.waterEvents.find(event =>
  event.label.includes("睡前") &&
  event.at > new Date(2026, 5, 26, 23, 30, 0, 0).getTime() &&
  event.at < sleepStartAt
);

assert(
  currentPreSleepWater,
  "Current-crop planner should consider a pre-sleep partial watering before delaying the next full watering to wake-up"
);
assert(
  currentPlannerCycle.matureAt < currentPlannerCycle.harvestAt &&
    currentPlannerCycle.harvestAt === expectedSleepAwareHarvestAt,
  "Current-crop planner should expose a sleep gap when pre-sleep partial watering makes the crop mature before wake-up"
);

const plannerDisplayRecord = {
  archiveId: "planner-test",
  coinGain: 0,
  crop: { short: "20h 高价值" },
  doubleHarvest: false,
  durationMs: 8 * 60 * 60 * 1000,
  expGain: 0,
  goal: "coins",
  harvestAt: expectedSleepAwareHarvestAt,
  locked: true,
  matureAt: expectedSleepAwareMatureAt,
  name: "planner test crop",
  plantAt: plannerPlantAt,
  reason: "",
  sleepDelayMs: expectedSleepAwareHarvestAt - expectedSleepAwareMatureAt,
  targetGain: 0,
  type: "crop",
  waterEvents: plannerCycle.waterEvents
};
const overviewHtml = plannerContext.renderPlannerOverview({ records: [plannerDisplayRecord] });
const currentProgressHtml = plannerContext.renderCurrentPlannerProgress({ records: [plannerDisplayRecord] });

assert(
  overviewHtml.includes("实际") && overviewHtml.includes("成熟") && overviewHtml.includes("空窗"),
  "Planner overview cards should show actual maturity and the sleep gap before harvest"
);
assert(
  currentProgressHtml.includes("实际") && currentProgressHtml.includes("成熟") && currentProgressHtml.includes("空窗"),
  "Current crop progress should show actual maturity and the sleep gap before harvest"
);

console.log("Home interaction and standard crop archive checks passed.");
