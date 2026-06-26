const fs = require("fs");
const path = require("path");

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

["selfWater", "friendWater", "sunbin", "harvest"].forEach(action => {
  assert(
    farmHeader.includes(`data-action="${action}"`),
    `Farm action ${action} should render in the farm card header`
  );
});

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

console.log("Home interaction and standard crop archive checks passed.");
