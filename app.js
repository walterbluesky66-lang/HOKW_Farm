    const STORAGE_KEY = "wzry-world-farm-helper-html-single-v3";
    const NOTIFY_KEY = "wzry-world-farm-helper-html-notified-v3";
    const VALUE_CALCULATOR_KEY = "wzry-world-farm-value-calculator-v1";
    const VALUE_CALCULATOR_OPTIONS_KEY = "wzry-world-farm-value-calculator-options-v1";
    const CROP_ARCHIVE_KEY = "wzry-world-farm-crop-archive-v1";
    const ANIMAL_ARCHIVE_KEY = "wzry-world-farm-animal-archive-v1";
    const RANCH_KEY = "wzry-world-farm-ranch-v1";
    const ANIMAL_VALUE_CALCULATOR_KEY = "wzry-world-farm-animal-value-calculator-v1";
    const PLANNER_KEY = "wzry-world-farm-planner-v1";
    const INTEREST_CIRCLE_KEY = "wzry-world-interest-circle-v1";
    const PORTABLE_DATA_VERSION = window.HOKW_STORAGE?.portableDataVersion || 1;
    const MINUTE = 60 * 1000;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    const PLANNER_HORIZON_MS = 7 * DAY;
    const PLANNER_DEFAULT_LAND_COUNT = 100;
    const PLANNER_DEFAULT_WEEKEND_TARGET = 6000;
    const PLANNER_DEFAULT_SLEEP_START = "00:00";
    const PLANNER_DEFAULT_SLEEP_END = "08:00";
    const PLANNER_UNIT_NORMAL = 30;
    const PLANNER_UNIT_DOUBLE = 60;
    const PLANNER_BLESSING_MULTIPLIER = 3;
    const PLANNER_BLESSING_MIN_PER_DAY = 2;
    const PLANNER_BLESSING_MAX_PER_DAY = 5;
    const PLANNER_DP_DEPTH = 16;
    const PLANNER_DP_MAX_CANDIDATES = 14;
    const PLANNER_MAX_BLOCKS = 40;
    const VALUE_CROP_KEYS = ["fast5", "exp16", "money20", "exp28"];
    const BUILT_IN_CROP_ARCHIVE = [
      { id: "crop-lv01-sumi", name: "粟米", cropKey: "", durationMinutes: 1, durationLabel: "1分钟", yieldCount: 1, exp: 1, seedCost: 0, basePriceLevel1: 0.8, basePriceMax: 1.6, coins: 1.6, farmLevel: 1, archiveOnly: true, icon: "🌾", createdAt: 1, updatedAt: 1 },
      { id: "crop-lv02-xiangmigua", name: "香蜜瓜", cropKey: "", durationMinutes: 2, durationLabel: "2分钟", yieldCount: 1, exp: 2, seedCost: 2, basePriceLevel1: 2.98, basePriceMax: 5.96, coins: 5.96, farmLevel: 2, archiveOnly: true, icon: "🍈", createdAt: 2, updatedAt: 2 },
      { id: "crop-lv03-liangyuanqie", name: "亮圆茄", cropKey: "", durationMinutes: 5, durationLabel: "5分钟", yieldCount: 2, exp: 5, seedCost: 3, basePriceLevel1: 3.85, basePriceMax: 7.7, coins: 15.4, farmLevel: 3, archiveOnly: true, icon: "🍆", createdAt: 3, updatedAt: 3 },
      { id: "crop-lv04-yinggongding", name: "萤公丁", cropKey: "", durationMinutes: 15, durationLabel: "15分钟", yieldCount: 3, exp: 15, seedCost: 4, basePriceLevel1: 6.85, basePriceMax: 13.7, coins: 41.1, farmLevel: 4, archiveOnly: true, icon: "🌼", createdAt: 4, updatedAt: 4 },
      { id: "crop-lv05-guangyinkui", name: "光阴葵", cropKey: "", durationMinutes: 60, durationLabel: "1小时", yieldCount: 5, exp: 60, seedCost: 6, basePriceLevel1: 7.9, basePriceMax: 15.8, coins: 79, farmLevel: 5, archiveOnly: true, icon: "🌻", createdAt: 5, updatedAt: 5 },
      { id: "crop-lv06-caiyunmian", name: "彩云棉", cropKey: "fast5", durationMinutes: 300, durationLabel: "5小时", yieldCount: 20, exp: 360, seedCost: 18, basePriceLevel1: 8.95, basePriceMax: 17.9, coins: 358, farmLevel: 6, createdAt: 6, updatedAt: 6 },
      { id: "crop-lv07-chaogongshanyao", name: "朝贡山药", cropKey: "exp16", durationMinutes: 960, durationLabel: "16小时", yieldCount: 25, exp: 1540, seedCost: 56, basePriceLevel1: 23.85, basePriceMax: 47.7, coins: 1192.5, farmLevel: 7, createdAt: 7, updatedAt: 7 },
      { id: "crop-lv08-shuijingyumi", name: "水晶玉米", cropKey: "fast5", durationMinutes: 300, durationLabel: "5小时", yieldCount: 20, exp: 600, seedCost: 22, basePriceLevel1: 13, basePriceMax: 26, coins: 520, farmLevel: 8, createdAt: 8, updatedAt: 8 },
      { id: "crop-lv10-yanxialajiao", name: "炎霞辣椒", cropKey: "money20", durationMinutes: 1200, durationLabel: "20小时", yieldCount: 30, exp: 0, seedCost: 152, basePriceLevel1: 50, basePriceMax: 100, coins: 3000, farmLevel: 10, createdAt: 9, updatedAt: 9 },
      { id: "crop-lv10-shuangtianputao", name: "霜天葡萄", cropKey: "exp16", durationMinutes: 960, durationLabel: "16小时", yieldCount: 25, exp: 2300, seedCost: 66, basePriceLevel1: 28, basePriceMax: 56, coins: 1400, farmLevel: 10, createdAt: 10, updatedAt: 10 },
      { id: "crop-lv12-zhuyanyuanqie", name: "朱颜圆茄", cropKey: "exp28", durationMinutes: 1680, durationLabel: "28小时", yieldCount: 30, exp: 4440, seedCost: 106, basePriceLevel1: 36.85, basePriceMax: 73.7, coins: 2211, farmLevel: 12, createdAt: 11, updatedAt: 11 },
      { id: "crop-lv14-hupoyumi", name: "琥珀玉米", cropKey: "fast5", durationMinutes: 300, durationLabel: "5小时", yieldCount: 20, exp: 860, seedCost: 28, basePriceLevel1: 13.7, basePriceMax: 27.4, coins: 548, farmLevel: 14, createdAt: 12, updatedAt: 12 },
      { id: "crop-lv16-ziweishanyao", name: "紫微山药", cropKey: "exp16", durationMinutes: 960, durationLabel: "16小时", yieldCount: 25, exp: 3070, seedCost: 80, basePriceLevel1: 31.9, basePriceMax: 63.8, coins: 1595, farmLevel: 16, createdAt: 13, updatedAt: 13 },
      { id: "crop-lv17-canjinyunmian", name: "灿金云棉", cropKey: "money20", durationMinutes: 1200, durationLabel: "20小时", yieldCount: 30, exp: 0, seedCost: 176, basePriceLevel1: 60, basePriceMax: 120, coins: 3600, farmLevel: 17, createdAt: 14, updatedAt: 14 },
      { id: "crop-lv18-qiuxiangputao", name: "秋香葡萄", cropKey: "exp28", durationMinutes: 1680, durationLabel: "28小时", yieldCount: 30, exp: 5910, seedCost: 124, basePriceLevel1: 40, basePriceMax: 80, coins: 2400, farmLevel: 18, createdAt: 15, updatedAt: 15 },
      { id: "crop-lv20-chiguiyumi", name: "赤瑰玉米", cropKey: "fast5", durationMinutes: 300, durationLabel: "5小时", yieldCount: 20, exp: 1150, seedCost: 36, basePriceLevel1: 17.9, basePriceMax: 35.8, coins: 716, farmLevel: 20, createdAt: 16, updatedAt: 16 },
      { id: "crop-lv22-ruyishizi", name: "如意柿子", cropKey: "exp16", durationMinutes: 960, durationLabel: "16小时", yieldCount: 25, exp: 4070, seedCost: 106, basePriceLevel1: 43.85, basePriceMax: 88, coins: 2200, farmLevel: 22, createdAt: 17, updatedAt: 17 },
      { id: "crop-lv23-yeziyunmian", name: "曳紫云棉", cropKey: "money20", durationMinutes: 1200, durationLabel: "20小时", yieldCount: 30, exp: 0, seedCost: 240, basePriceLevel1: 80, basePriceMax: 160, coins: 4800, farmLevel: 23, createdAt: 18, updatedAt: 18 },
      { id: "crop-lv24-fulutaozi", name: "福禄桃子", cropKey: "exp28", durationMinutes: 1680, durationLabel: "28小时", yieldCount: 30, exp: 7800, seedCost: 168, basePriceLevel1: 56.85, basePriceMax: 113.7, coins: 3411, farmLevel: 24, createdAt: 19, updatedAt: 19 },
      { id: "crop-lv26-jianlingtiancai", name: "箭翎甜菜", cropKey: "fast5", durationMinutes: 300, durationLabel: "5小时", yieldCount: 20, exp: 1460, seedCost: 46, basePriceLevel1: 23.86, basePriceMax: 47.7, coins: 954, farmLevel: 26, createdAt: 20, updatedAt: 20 },
      { id: "crop-lv28-chongjinputao", name: "舂堇葡萄", cropKey: "exp16", durationMinutes: 960, durationLabel: "16小时", yieldCount: 25, exp: 4920, seedCost: 132, basePriceLevel1: 51.9, basePriceMax: 103.8, coins: 2595, farmLevel: 28, createdAt: 21, updatedAt: 21 },
      { id: "crop-lv30-xurilajiao", name: "旭日辣椒", cropKey: "money20", durationMinutes: 1200, durationLabel: "20小时", yieldCount: 30, exp: 0, seedCost: 290, basePriceLevel1: 97, basePriceMax: 194, coins: 5820, farmLevel: 30, createdAt: 22, updatedAt: 22 },
      { id: "crop-lv32-molubingtao", name: "魔露冰桃", cropKey: "exp28", durationMinutes: 1680, durationLabel: "28小时", yieldCount: 30, exp: 9005, seedCost: 204, basePriceLevel1: 66.85, basePriceMax: 133.7, coins: 4011, farmLevel: 32, createdAt: 23, updatedAt: 23 },
      { id: "crop-lv34-hongyingtiancai", name: "红缨甜菜", cropKey: "fast5", durationMinutes: 300, durationLabel: "5小时", yieldCount: 20, exp: 1680, seedCost: 56, basePriceLevel1: 29.8, basePriceMax: 59.6, coins: 1192, farmLevel: 34, createdAt: 24, updatedAt: 24 },
      { id: "crop-lv36-bilinghuoshi", name: "碧伶火柿", cropKey: "exp16", durationMinutes: 960, durationLabel: "16小时", yieldCount: 25, exp: 5683, seedCost: 162, basePriceLevel1: 63.86, basePriceMax: 128, coins: 3200, farmLevel: 36, createdAt: 25, updatedAt: 25 },
      { id: "crop-lv38-yanshayunmian", name: "胭纱云棉", cropKey: "money20", durationMinutes: 1200, durationLabel: "20小时", yieldCount: 30, exp: 0, seedCost: 366, basePriceLevel1: 123, basePriceMax: 246, coins: 7380, farmLevel: 38, createdAt: 26, updatedAt: 26 },
      { id: "crop-lv40-bingpolajiao", name: "冰魄辣椒", cropKey: "exp28", durationMinutes: 1680, durationLabel: "28小时", yieldCount: 30, exp: 10483, seedCost: 256, basePriceLevel1: 88.45, basePriceMax: 174, coins: 5220, farmLevel: 40, createdAt: 27, updatedAt: 27 },
      { id: "crop-lv42-cuixiyuanqie", name: "翠洗圆茄", cropKey: "fast5", durationMinutes: 300, durationLabel: "5小时", yieldCount: 20, exp: 1968, seedCost: 72, basePriceLevel1: 36, basePriceMax: 72, coins: 1440, farmLevel: 42, createdAt: 28, updatedAt: 28 },
      { id: "crop-lv44-ganlinputao", name: "甘霖葡萄", cropKey: "exp16", durationMinutes: 960, durationLabel: "16小时", yieldCount: 25, exp: 6605, seedCost: 208, basePriceLevel1: 84, basePriceMax: 168, coins: 4200, farmLevel: 44, createdAt: 29, updatedAt: 29 },
      { id: "crop-lv46-xingyelongyan", name: "星夜龙眼", cropKey: "money20", durationMinutes: 1200, durationLabel: "20小时", yieldCount: 30, exp: 0, seedCost: 0, basePriceLevel1: 157, basePriceMax: 314, coins: 9420, farmLevel: 46, createdAt: 30, updatedAt: 30 },
      { id: "crop-lv48-jingzhelajiao", name: "惊蛰辣椒", cropKey: "exp28", durationMinutes: 1680, durationLabel: "28小时", yieldCount: 30, exp: 12096, seedCost: 0, basePriceLevel1: 110, basePriceMax: 220, coins: 6600, farmLevel: 48, createdAt: 31, updatedAt: 31 },
      { id: "crop-lv50-jinqingyumi", name: "堇青玉米", cropKey: "fast5", durationMinutes: 300, durationLabel: "5小时", yieldCount: 20, exp: 2280, seedCost: 0, basePriceLevel1: 45, basePriceMax: 90, coins: 1800, farmLevel: 50, createdAt: 32, updatedAt: 32 },
      { id: "crop-lv52-huanxiyuanqie", name: "浣溪圆茄", cropKey: "exp16", durationMinutes: 960, durationLabel: "16小时", yieldCount: 25, exp: 7680, seedCost: 252, basePriceLevel1: 100, basePriceMax: 200, coins: 5000, farmLevel: 52, createdAt: 33, updatedAt: 33 },
      { id: "crop-lv54-dieyinglianzi", name: "蝶影莲子", cropKey: "money20", durationMinutes: 1200, durationLabel: "20小时", yieldCount: 30, exp: 0, seedCost: 560, basePriceLevel1: 184, basePriceMax: 368, coins: 11040, farmLevel: 54, createdAt: 34, updatedAt: 34 }
    ];
    const BUILT_IN_ANIMAL_ARCHIVE = [
      // 后续确认具体动物数据后，可以把标准档案写在这里。
      // 页面内录入的数据会保存在浏览器 localStorage；导出的标准库数据可用于更新这个数组。
    ];
    const RANCH_GROUPS = [
      { key: "h16", durationHours: 16, label: "16小时动物", shortLabel: "16h", role: "高经验", countInputId: "ranchCount16", remainHoursId: "ranchRemainHours16", remainMinutesId: "ranchRemainMinutes16" },
      { key: "h20", durationHours: 20, label: "20小时动物", shortLabel: "20h", role: "高百工币", countInputId: "ranchCount20", remainHoursId: "ranchRemainHours20", remainMinutesId: "ranchRemainMinutes20" }
    ];
    const PORTABLE_STORAGE_KEYS = window.HOKW_STORAGE?.portableKeys || [
      { key: STORAGE_KEY, label: "种植打卡" },
      { key: VALUE_CALCULATOR_KEY, label: "作物对比" },
      { key: VALUE_CALCULATOR_OPTIONS_KEY, label: "计算器选项" },
      { key: ANIMAL_ARCHIVE_KEY, label: "动物档案" },
      { key: RANCH_KEY, label: "牧场管理" },
      { key: ANIMAL_VALUE_CALCULATOR_KEY, label: "动物对比" },
      { key: PLANNER_KEY, label: "一键规划" },
      { key: INTEREST_CIRCLE_KEY, label: "兴趣圈" }
    ];

    const CROP_TYPES = {
      test3: {
        key: "test3",
        minutes: 3,
        label: "3分钟测试作物",
        short: "3min 测试",
        purpose: "开发 / BUG / 提醒测试专用",
        gradient: "test3",
        icon: "🧪",
        // 测试作物不是游戏内真实作物，不做“成熟时间向上取整至分钟”。
        // 否则 3 分钟周期会被最多额外抬高 59 秒，导致测试时看起来比 3 分钟还长。
        roundMatureToMinute: false
      },
      fast5: {
        key: "fast5",
        minutes: 5 * 60,
        label: "5小时快速作物",
        short: "5h 快速",
        purpose: "补空档",
        gradient: "fast",
        icon: "🌱",
        roundMatureToMinute: true
      },
      exp16: {
        key: "exp16",
        minutes: 16 * 60,
        label: "16小时经验作物",
        short: "16h 经验",
        purpose: "高经验",
        gradient: "exp16",
        icon: "💠",
        roundMatureToMinute: true
      },
      money20: {
        key: "money20",
        minutes: 20 * 60,
        label: "20小时经济作物",
        short: "20h 高价值",
        purpose: "高百工币，无经验",
        gradient: "money20",
        icon: "💰",
        roundMatureToMinute: true
      },
      exp28: {
        key: "exp28",
        minutes: 28 * 60,
        label: "28小时经验作物",
        short: "28h 长线经验",
        purpose: "高经验",
        gradient: "exp28",
        icon: "🔮",
        roundMatureToMinute: true
      }
    };

    let state = loadState();
    let cropArchiveItems = loadCropArchiveItems();
    let animalArchiveItems = loadAnimalArchiveItems();
    let calculatorItems = loadCalculatorItems();
    let animalCalculatorItems = loadAnimalCalculatorItems();
    let calculatorOptions = loadCalculatorOptions();
    let ranchState = loadRanchState();
    let plannerState = loadPlannerState();
    let audioCtx = null;
    const customSelects = [];
    migrateLegacyCalculatorItems();

    const els = {
      cropSelect: document.getElementById("cropSelect"),
      startModeInputs: Array.from(document.querySelectorAll('input[name="startMode"]')),
      plantSunbin: document.getElementById("plantSunbin"),
      plantBtn: document.getElementById("plantBtn"),
      plantNoWaterBtn: document.getElementById("plantNoWaterBtn"),
      syncForm: document.getElementById("syncForm"),
      syncCropSelect: document.getElementById("syncCropSelect"),
      syncRemainHours: document.getElementById("syncRemainHours"),
      syncRemainMinutes: document.getElementById("syncRemainMinutes"),
      syncReduceHours: document.getElementById("syncReduceHours"),
      syncReduceMinutes: document.getElementById("syncReduceMinutes"),
      syncWaitHours: document.getElementById("syncWaitHours"),
      syncWaitMinutes: document.getElementById("syncWaitMinutes"),
      syncSunbin: document.getElementById("syncSunbin"),
      syncFriendCount: document.getElementById("syncFriendCount"),
      clearBtn: document.getElementById("clearBtn"),
      notifyBtn: document.getElementById("notifyBtn"),
      testNotifyBtn: document.getElementById("testNotifyBtn"),
      notifyStatus: document.getElementById("notifyStatus"),
      farmArea: document.getElementById("farmArea"),
      plannerArea: document.getElementById("plannerArea"),
      plannerForm: document.getElementById("plannerForm"),
      plannerLevel: document.getElementById("plannerLevel"),
      plannerLevelDown: document.getElementById("plannerLevelDown"),
      plannerLevelUp: document.getElementById("plannerLevelUp"),
      plannerLandCount: document.getElementById("plannerLandCount"),
      plannerCropStallLevel: document.getElementById("plannerCropStallLevel"),
      plannerWeekendTarget: document.getElementById("plannerWeekendTarget"),
      plannerIncludeBlessing: document.getElementById("plannerIncludeBlessing"),
      plannerSleepStart: document.getElementById("plannerSleepStart"),
      plannerSleepEnd: document.getElementById("plannerSleepEnd"),
      plannerStartBtn: document.getElementById("plannerStartBtn"),
      plannerStopBtn: document.getElementById("plannerStopBtn"),
      plannerFormNote: document.getElementById("plannerFormNote"),
      toastZone: document.getElementById("toastZone"),
      statStatus: document.getElementById("statStatus"),
      statStatusSub: document.getElementById("statStatusSub"),
      statHarvest: document.getElementById("statHarvest"),
      statHarvestSub: document.getElementById("statHarvestSub"),
      statWater: document.getElementById("statWater"),
      statWaterSub: document.getElementById("statWaterSub"),
      statFriend: document.getElementById("statFriend"),
      archiveForm: document.getElementById("archiveForm"),
      archiveEditingId: document.getElementById("archiveEditingId"),
      archiveName: document.getElementById("archiveName"),
      archiveCropTime: document.getElementById("archiveCropTime"),
      archiveCoins: document.getElementById("archiveCoins"),
      archiveExp: document.getElementById("archiveExp"),
      archiveLevel: document.getElementById("archiveLevel"),
      archiveSaveBtn: document.getElementById("archiveSaveBtn"),
      archiveCancelBtn: document.getElementById("archiveCancelBtn"),
      archiveExportBtn: document.getElementById("archiveExportBtn"),
      archiveExportPanel: document.getElementById("archiveExportPanel"),
      archiveExportText: document.getElementById("archiveExportText"),
      archiveSummaryText: document.getElementById("archiveSummaryText"),
      archiveList: document.getElementById("archiveList"),
      animalArchiveForm: document.getElementById("animalArchiveForm"),
      animalArchiveEditingId: document.getElementById("animalArchiveEditingId"),
      animalArchiveName: document.getElementById("animalArchiveName"),
      animalArchiveLevel: document.getElementById("animalArchiveLevel"),
      animalPurchasePrice: document.getElementById("animalPurchasePrice"),
      animalDuration: document.getElementById("animalDuration"),
      animalFeedCost: document.getElementById("animalFeedCost"),
      animalProductSaleBase: document.getElementById("animalProductSaleBase"),
      animalRecyclePrice: document.getElementById("animalRecyclePrice"),
      animalExp: document.getElementById("animalExp"),
      animalArchiveSaveBtn: document.getElementById("animalArchiveSaveBtn"),
      animalArchiveCancelBtn: document.getElementById("animalArchiveCancelBtn"),
      animalArchiveExportBtn: document.getElementById("animalArchiveExportBtn"),
      animalArchiveExportPanel: document.getElementById("animalArchiveExportPanel"),
      animalArchiveExportText: document.getElementById("animalArchiveExportText"),
      animalArchiveSummaryText: document.getElementById("animalArchiveSummaryText"),
      animalArchiveList: document.getElementById("animalArchiveList"),
      valueForm: document.getElementById("valueForm"),
      valueArchiveSelect: document.getElementById("valueArchiveSelect"),
      valueSunbin: document.getElementById("valueSunbin"),
      valueClearBtn: document.getElementById("valueClearBtn"),
      valueSort: document.getElementById("valueSort"),
      valueSummaryText: document.getElementById("valueSummaryText"),
      valueSummary: document.getElementById("valueSummary"),
      valueResults: document.getElementById("valueResults"),
      valueAnimalForm: document.getElementById("valueAnimalForm"),
      valueAnimalArchiveSelect: document.getElementById("valueAnimalArchiveSelect"),
      valueAnimalBaselineSelect: document.getElementById("valueAnimalBaselineSelect"),
      valueAnimalSort: document.getElementById("valueAnimalSort"),
      valueAnimalClearBtn: document.getElementById("valueAnimalClearBtn"),
      valueAnimalSummaryText: document.getElementById("valueAnimalSummaryText"),
      valueAnimalSummary: document.getElementById("valueAnimalSummary"),
      valueAnimalResults: document.getElementById("valueAnimalResults"),
      ranchHomeArea: document.getElementById("ranchHomeArea"),
      ranchSlotCount: document.getElementById("ranchSlotCount"),
      ranchStallLevel: document.getElementById("ranchStallLevel"),
      ranchCount16: document.getElementById("ranchCount16"),
      ranchCount20: document.getElementById("ranchCount20"),
      ranchSummary: document.getElementById("ranchSummary"),
      ranchBatchList: document.getElementById("ranchBatchList"),
      dataExportBtn: document.getElementById("dataExportBtn"),
      dataImportBtn: document.getElementById("dataImportBtn"),
      dataImportFile: document.getElementById("dataImportFile"),
      dataImportText: document.getElementById("dataImportText"),
      dataTransferStatus: document.getElementById("dataTransferStatus")
    };

    const isMainPage = Boolean(els.farmArea);
    const isRanchPage = Boolean(els.ranchBatchList);
    const isPlannerDetailPage = document.body?.dataset.page === "planner-detail";

    init();

    function init() {
      if (els.cropSelect) renderCropOptions();
      if (els.syncCropSelect) renderSyncCropOptions();
      if (els.archiveCropTime) renderArchiveCropOptions();
      if (els.archiveList) renderCropArchive();
      if (els.animalArchiveList) renderAnimalArchive();
      if (els.valueArchiveSelect) renderValueArchiveOptions();
      if (els.valueAnimalArchiveSelect) renderAnimalValueArchiveOptions();
      if (els.valueSunbin) els.valueSunbin.checked = calculatorOptions.sunbin === true;
      initializeRanchForm();
      initializePlannerForm();
      updateValueSortOptions();
      enhanceCustomSelects();
      updateStartModeUI();
      updateSyncModeUI();
      bindEvents();
      updateNotifyUI();
      render();
      renderRanchHome();
      renderRanchPage();
      renderValueCalculator();
      renderAnimalValueCalculator();
      renderPlanner();
      if (isMainPage || isRanchPage) {
        setInterval(tick, 1000);
        document.addEventListener("visibilitychange", tick);
        window.addEventListener("focus", tick);
      }
    }

    function renderCropOptions() {
      if (!els.cropSelect) return;
      els.cropSelect.innerHTML = Object.values(CROP_TYPES).map(crop => `
        <option value="${crop.key}">${crop.label} · ${crop.purpose}</option>
      `).join("");
      els.cropSelect.value = "money20";
    }

    function renderSyncCropOptions() {
      if (!els.syncCropSelect) return;
      els.syncCropSelect.innerHTML = Object.values(CROP_TYPES).map(crop => `
        <option value="${crop.key}">${crop.label} · 原始成熟 ${formatDuration(crop.minutes * MINUTE, true)}</option>
      `).join("");
      els.syncCropSelect.value = "money20";
    }

    function renderArchiveCropOptions() {
      if (!els.archiveCropTime) return;
      els.archiveCropTime.innerHTML = VALUE_CROP_KEYS.map(key => {
        const crop = CROP_TYPES[key];
        return `<option value="${crop.key}">${crop.label} · ${formatDuration(crop.minutes * MINUTE, true)}</option>`;
      }).join("");
      els.archiveCropTime.value = "money20";
    }

    function renderValueArchiveOptions() {
      if (!els.valueArchiveSelect) return;
      const availableItems = getComputableCropArchiveItems()
        .filter(item => item.farmLevel <= plannerState.currentLevel);

      if (!availableItems.length) {
        els.valueArchiveSelect.innerHTML = `<option value="">当前居所等级暂无可计算作物</option>`;
        els.valueArchiveSelect.value = "";
        refreshCustomSelect(els.valueArchiveSelect);
        return;
      }

      const currentValue = els.valueArchiveSelect.value;
      els.valueArchiveSelect.innerHTML = availableItems.map(item => {
        const crop = CROP_TYPES[item.cropKey];
        const meta = [
          `${crop.short}`,
          `Lv.${item.farmLevel}`,
          `${formatNumber(item.exp)} 经验`,
          `${formatNumber(item.coins)} 基准百工币`
        ].join(" · ");
        return `<option value="${escapeHtml(item.id)}" data-icon="${escapeHtml(crop.icon)}">${escapeHtml(item.name)} · ${escapeHtml(meta)}</option>`;
      }).join("");

      if (availableItems.some(item => item.id === currentValue)) {
        els.valueArchiveSelect.value = currentValue;
      } else {
        els.valueArchiveSelect.value = availableItems[0].id;
      }

      refreshCustomSelect(els.valueArchiveSelect);
    }

    function updateValueSortOptions() {
      if (!els.valueSunbin || !els.valueSort) return;
      const sunbinMode = els.valueSunbin.checked;
      Array.from(els.valueSort.options).forEach(option => {
        if (option.value === "cycleExp" || option.value === "cycleCoins") {
          option.disabled = !sunbinMode;
        }
      });

      if (!sunbinMode && (els.valueSort.value === "cycleExp" || els.valueSort.value === "cycleCoins")) {
        els.valueSort.value = "exp";
      }

      const customSelect = customSelects.find(item => item.select === els.valueSort);
      if (customSelect) renderCustomSelect(customSelect);
    }

    function enhanceCustomSelects() {
      [
        els.cropSelect,
        els.syncCropSelect,
        els.archiveCropTime,
        els.animalDuration,
        els.valueArchiveSelect,
        els.valueSort,
        els.valueAnimalArchiveSelect,
        els.valueAnimalBaselineSelect,
        els.valueAnimalSort
      ].forEach(enhanceCustomSelect);

      document.addEventListener("click", event => {
        if (event.target.closest(".custom-select")) return;
        closeAllCustomSelects();
      });

      document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeAllCustomSelects();
      });
    }

    function enhanceCustomSelect(select) {
      if (!select || select.dataset.customReady === "true") return;

      select.dataset.customReady = "true";
      select.classList.add("native-select-hidden");

      const wrapper = document.createElement("div");
      wrapper.className = "custom-select";

      const button = document.createElement("button");
      button.className = "custom-select-button";
      button.type = "button";
      button.setAttribute("aria-haspopup", "listbox");
      button.setAttribute("aria-expanded", "false");

      const menu = document.createElement("div");
      menu.className = "custom-select-menu";
      menu.setAttribute("role", "listbox");

      wrapper.append(button, menu);
      select.insertAdjacentElement("afterend", wrapper);

      const customSelect = {
        select,
        wrapper,
        button,
        menu,
        activeIndex: select.selectedIndex >= 0 ? select.selectedIndex : 0
      };
      customSelects.push(customSelect);

      button.addEventListener("click", event => {
        event.stopPropagation();
        if (wrapper.classList.contains("is-open")) {
          closeCustomSelect(customSelect);
        } else {
          openCustomSelect(customSelect);
        }
      });

      button.addEventListener("keydown", event => handleCustomSelectKeydown(event, customSelect));

      menu.addEventListener("click", event => {
        event.stopPropagation();
        const option = event.target.closest("[data-select-value]");
        if (!option) return;
        if (option.disabled) return;
        chooseCustomSelectValue(customSelect, option.dataset.selectValue);
      });

      select.addEventListener("change", () => renderCustomSelect(customSelect));
      renderCustomSelect(customSelect);
    }

    function renderCustomSelect(customSelect) {
      const { select, button, menu } = customSelect;
      const options = Array.from(select.options);
      const selectedOption = select.selectedOptions[0] || options[0];
      const selectedParts = getCustomSelectParts(selectedOption);
      const selectedIndex = Math.max(select.selectedIndex, 0);

      if (customSelect.activeIndex < 0 || customSelect.activeIndex >= options.length) {
        customSelect.activeIndex = selectedIndex;
      }

      button.innerHTML = renderCustomSelectFace(selectedParts);
      menu.innerHTML = options.map((option, index) => {
        const parts = getCustomSelectParts(option);
        const isSelected = option.value === select.value;
        const isActive = index === customSelect.activeIndex;
        const isDisabled = option.disabled;

        return `
          <button class="custom-select-option${isSelected ? " is-selected" : ""}${isActive ? " is-active" : ""}${isDisabled ? " is-disabled" : ""}" type="button" role="option" aria-selected="${isSelected ? "true" : "false"}" data-select-value="${escapeHtml(option.value)}" ${isDisabled ? "disabled" : ""}>
            ${renderCustomSelectFace(parts, true)}
          </button>
        `;
      }).join("");
    }

    function renderCustomSelectFace(parts, isOption = false) {
      return `
        <span class="custom-select-left">
          ${parts.icon ? `<span class="custom-select-icon">${escapeHtml(parts.icon)}</span>` : ""}
          <span class="custom-select-copy">
            <span class="custom-select-main">${escapeHtml(parts.main)}</span>
            ${parts.sub ? `<span class="custom-select-sub">${escapeHtml(parts.sub)}</span>` : ""}
          </span>
        </span>
        <span class="${isOption ? "custom-select-check" : "custom-select-chevron"}" aria-hidden="true">${isOption ? "✓" : ""}</span>
      `;
    }

    function getCustomSelectParts(option) {
      if (!option) return { icon: "", main: "", sub: "" };

      const crop = CROP_TYPES[option.value];
      const parts = option.textContent.trim().split(" · ");

      return {
        icon: option.dataset.icon || (crop ? crop.icon : ""),
        main: parts[0] || option.textContent.trim(),
        sub: parts.slice(1).join(" · ")
      };
    }

    function refreshCustomSelect(select) {
      const customSelect = customSelects.find(item => item.select === select);
      if (customSelect) renderCustomSelect(customSelect);
    }

    function openCustomSelect(customSelect) {
      closeAllCustomSelects(customSelect);
      customSelect.activeIndex = Math.max(customSelect.select.selectedIndex, 0);
      customSelect.wrapper.classList.add("is-open");
      customSelect.button.setAttribute("aria-expanded", "true");
      renderCustomSelect(customSelect);
      scrollActiveOptionIntoView(customSelect);
    }

    function closeCustomSelect(customSelect) {
      customSelect.wrapper.classList.remove("is-open");
      customSelect.button.setAttribute("aria-expanded", "false");
    }

    function closeAllCustomSelects(except = null) {
      customSelects.forEach(customSelect => {
        if (customSelect !== except) closeCustomSelect(customSelect);
      });
    }

    function chooseCustomSelectValue(customSelect, value) {
      const { select, button } = customSelect;
      const previousValue = select.value;
      const targetOption = Array.from(select.options).find(option => option.value === value);
      if (!targetOption || targetOption.disabled) return;

      select.value = value;
      customSelect.activeIndex = Array.from(select.options).findIndex(option => option.value === value);
      renderCustomSelect(customSelect);
      closeCustomSelect(customSelect);
      button.focus();

      if (previousValue !== value) {
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }

    function handleCustomSelectKeydown(event, customSelect) {
      const options = Array.from(customSelect.select.options);
      if (!options.length) return;

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        if (!customSelect.wrapper.classList.contains("is-open")) openCustomSelect(customSelect);
        const direction = event.key === "ArrowDown" ? 1 : -1;
        customSelect.activeIndex = (customSelect.activeIndex + direction + options.length) % options.length;
        renderCustomSelect(customSelect);
        scrollActiveOptionIntoView(customSelect);
      }

      if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        if (!customSelect.wrapper.classList.contains("is-open")) openCustomSelect(customSelect);
        customSelect.activeIndex = event.key === "Home" ? 0 : options.length - 1;
        renderCustomSelect(customSelect);
        scrollActiveOptionIntoView(customSelect);
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (!customSelect.wrapper.classList.contains("is-open")) {
          openCustomSelect(customSelect);
          return;
        }

        chooseCustomSelectValue(customSelect, options[customSelect.activeIndex].value);
      }

      if (event.key === "Escape") {
        closeCustomSelect(customSelect);
      }
    }

    function scrollActiveOptionIntoView(customSelect) {
      const activeOption = customSelect.menu.querySelector(".is-active");
      if (activeOption) activeOption.scrollIntoView({ block: "nearest" });
    }

    function bindEvents() {
      els.plantBtn?.addEventListener("click", () => plantCrop(true));
      els.plantNoWaterBtn?.addEventListener("click", () => plantCrop(false));
      els.startModeInputs.forEach(input => {
        input.addEventListener("change", updateStartModeUI);
      });
      els.syncForm?.addEventListener("submit", syncExistingCrop);
      els.syncForm?.querySelectorAll('input[name="syncWaterMode"]').forEach(input => {
        input.addEventListener("change", updateSyncModeUI);
      });
      els.clearBtn?.addEventListener("click", clearAll);
      els.notifyBtn?.addEventListener("click", enableNotifications);
      els.dataExportBtn?.addEventListener("click", exportPortableData);
      els.dataImportBtn?.addEventListener("click", importPortableDataFromText);
      els.dataImportFile?.addEventListener("change", readPortableDataFile);
      els.archiveForm?.addEventListener("submit", saveArchiveItemFromForm);
      els.archiveCancelBtn?.addEventListener("click", resetArchiveForm);
      els.archiveExportBtn?.addEventListener("click", exportCropArchive);
      els.archiveList?.addEventListener("click", event => {
        const editButton = event.target.closest("[data-archive-edit]");
        const deleteButton = event.target.closest("[data-archive-delete]");

        if (editButton) {
          editArchiveItem(editButton.dataset.archiveEdit);
          return;
        }

        if (deleteButton) {
          deleteArchiveItem(deleteButton.dataset.archiveDelete);
        }
      });
      els.animalArchiveForm?.addEventListener("submit", saveAnimalArchiveItemFromForm);
      els.animalArchiveCancelBtn?.addEventListener("click", resetAnimalArchiveForm);
      els.animalArchiveExportBtn?.addEventListener("click", exportAnimalArchive);
      els.animalArchiveList?.addEventListener("click", event => {
        const editButton = event.target.closest("[data-animal-archive-edit]");
        const deleteButton = event.target.closest("[data-animal-archive-delete]");

        if (editButton) {
          editAnimalArchiveItem(editButton.dataset.animalArchiveEdit);
          return;
        }

        if (deleteButton) {
          deleteAnimalArchiveItem(deleteButton.dataset.animalArchiveDelete);
        }
      });
      els.valueForm?.addEventListener("submit", addCalculatorItem);
      els.valueClearBtn?.addEventListener("click", clearCalculatorItems);
      els.valueSort?.addEventListener("change", renderValueCalculator);
      els.valueSunbin?.addEventListener("change", () => {
        calculatorOptions.sunbin = els.valueSunbin.checked;
        saveCalculatorOptions();
        updateValueSortOptions();
        renderValueCalculator();
      });
      els.valueResults?.addEventListener("click", event => {
        const button = event.target.closest("[data-value-delete]");
        if (!button) return;
        deleteCalculatorItem(button.dataset.valueDelete);
      });
      els.valueAnimalForm?.addEventListener("submit", addAnimalCalculatorItem);
      els.valueAnimalClearBtn?.addEventListener("click", clearAnimalCalculatorItems);
      els.valueAnimalSort?.addEventListener("change", renderAnimalValueCalculator);
      els.valueAnimalBaselineSelect?.addEventListener("change", () => {
        calculatorOptions.animalBaselineId = els.valueAnimalBaselineSelect.value;
        saveCalculatorOptions();
        renderAnimalValueCalculator();
      });
      els.valueAnimalResults?.addEventListener("click", event => {
        const button = event.target.closest("[data-animal-value-delete]");
        if (!button) return;
        deleteAnimalCalculatorItem(button.dataset.animalValueDelete);
      });
      [els.ranchSlotCount, els.ranchStallLevel].forEach(input => {
        input?.addEventListener("change", () => updateRanchSettingsFromInputs(""));
        input?.addEventListener("input", () => updateRanchSettingsFromInputs(""));
      });
      [
        { input: els.ranchCount16, key: "h16" },
        { input: els.ranchCount20, key: "h20" }
      ].forEach(({ input, key }) => {
        input?.addEventListener("change", () => updateRanchSettingsFromInputs(key));
        input?.addEventListener("input", () => updateRanchSettingsFromInputs(key));
      });
      els.ranchBatchList?.addEventListener("click", event => {
        const saveButton = event.target.closest("[data-ranch-save-group]");
        const harvestButton = event.target.closest("[data-ranch-harvest-group]");
        const clearButton = event.target.closest("[data-ranch-clear-group]");

        if (saveButton) {
          saveRanchGroupTime(saveButton.dataset.ranchSaveGroup);
          return;
        }

        if (harvestButton) {
          harvestRanchGroup(harvestButton.dataset.ranchHarvestGroup);
          return;
        }

        if (clearButton) {
          clearRanchGroup(clearButton.dataset.ranchClearGroup);
        }
      });
      els.testNotifyBtn?.addEventListener("click", () => {
        ensureAudio();
        showReminder("测试提醒", "如果你看到这条提示，页面内提醒正常。若已允许浏览器通知，也会出现系统通知。");
      });
      els.plannerForm?.addEventListener("submit", startOrUpdatePlanner);
      els.plannerStopBtn?.addEventListener("click", stopPlanner);
      els.plannerLevelDown?.addEventListener("click", () => adjustPlannerLevel(-1));
      els.plannerLevelUp?.addEventListener("click", () => adjustPlannerLevel(1));
      [els.plannerLevel, els.plannerLandCount, els.plannerCropStallLevel, els.plannerWeekendTarget, els.plannerIncludeBlessing, els.plannerSleepStart, els.plannerSleepEnd].forEach(input => {
        input?.addEventListener("change", updatePlannerFromInputs);
        input?.addEventListener("input", () => {
          if (input.type === "number") updatePlannerFromInputs();
        });
      });
      els.plannerArea?.addEventListener("click", event => {
        const plantButton = event.target.closest("[data-planner-plant]");
        if (plantButton) {
          plantPlannerRecommendation(plantButton.dataset.plannerPlant);
          return;
        }

        const refreshButton = event.target.closest("[data-planner-refresh]");
        if (refreshButton) renderPlanner();
      });
    }

    function updateStartModeUI() {
      const mode = getStartMode();
      document.querySelectorAll("[data-start-panel]").forEach(panel => {
        panel.classList.toggle("is-hidden", panel.dataset.startPanel !== mode);
      });
    }

    function getStartMode() {
      return els.startModeInputs.find(input => input.checked)?.value || "plant";
    }

    function updateSyncModeUI() {
      if (!els.syncForm) return;
      const mode = getSyncWaterMode();
      els.syncForm.querySelectorAll("[data-sync-panel]").forEach(panel => {
        panel.classList.toggle("is-hidden", panel.dataset.syncPanel !== mode);
      });
    }

    function getSyncWaterMode() {
      if (!els.syncForm) return "ready";
      return els.syncForm.querySelector('input[name="syncWaterMode"]:checked')?.value || "ready";
    }

    function initializeRanchForm() {
      syncRanchFormInputs();
    }

    function updateRanchSettingsFromInputs(changedKey = "") {
      if (!readRanchSettingsIntoState(changedKey)) return;
      ranchState.updatedAt = Date.now();
      syncRanchFormInputs();
      saveRanchState();
      renderRanchHome();
      renderRanchPage();
      renderAnimalValueCalculator();
    }

    function readRanchSettingsIntoState(changedKey = "") {
      const slotCount = els.ranchSlotCount ? readPositiveInteger(els.ranchSlotCount.value) : ranchState.slotCount;
      const stallLevel = els.ranchStallLevel ? readPositiveInteger(els.ranchStallLevel.value) : ranchState.stallLevel;
      const count16 = els.ranchCount16 ? readNonNegativeInteger(els.ranchCount16.value) : getRanchGroup("h16").count;
      const count20 = els.ranchCount20 ? readNonNegativeInteger(els.ranchCount20.value) : getRanchGroup("h20").count;
      if (slotCount === null || stallLevel === null || count16 === null || count20 === null) return false;

      ranchState.slotCount = clamp(slotCount, 1, 12);
      ranchState.stallLevel = stallLevel;
      getRanchGroup("h16").count = clamp(count16, 0, ranchState.slotCount);
      getRanchGroup("h20").count = clamp(count20, 0, ranchState.slotCount);
      fitRanchGroupCounts(ranchState, changedKey);
      return true;
    }

    function syncRanchFormInputs() {
      if (els.ranchSlotCount) els.ranchSlotCount.value = ranchState.slotCount;
      if (els.ranchStallLevel) els.ranchStallLevel.value = ranchState.stallLevel;
      if (els.ranchCount16) els.ranchCount16.value = getRanchGroup("h16").count;
      if (els.ranchCount20) els.ranchCount20.value = getRanchGroup("h20").count;
    }

    function initializePlannerForm() {
      if (els.plannerLevel) els.plannerLevel.value = plannerState.currentLevel;
      if (els.plannerLandCount) els.plannerLandCount.value = plannerState.landCount;
      if (els.plannerCropStallLevel) els.plannerCropStallLevel.value = plannerState.cropStallLevel;
      if (els.plannerWeekendTarget) els.plannerWeekendTarget.value = plannerState.weekendTarget;
      if (els.plannerIncludeBlessing) els.plannerIncludeBlessing.checked = plannerState.includeBlessing !== false;
      if (els.plannerSleepStart) els.plannerSleepStart.value = plannerState.sleepStart;
      if (els.plannerSleepEnd) els.plannerSleepEnd.value = plannerState.sleepEnd;
    }

    function readPlannerFormValues() {
      const currentLevel = els.plannerLevel
        ? readPositiveInteger(els.plannerLevel.value)
        : plannerState.currentLevel;
      const landCount = els.plannerLandCount
        ? readPositiveInteger(els.plannerLandCount.value)
        : plannerState.landCount;
      const cropStallLevel = els.plannerCropStallLevel
        ? readPositiveInteger(els.plannerCropStallLevel.value)
        : plannerState.cropStallLevel;
      const weekendTarget = els.plannerWeekendTarget
        ? readNonNegativeNumber(els.plannerWeekendTarget.value)
        : plannerState.weekendTarget;
      const includeBlessing = els.plannerIncludeBlessing
        ? els.plannerIncludeBlessing.checked
        : plannerState.includeBlessing !== false;
      const sleepStart = els.plannerSleepStart
        ? (els.plannerSleepStart.value || PLANNER_DEFAULT_SLEEP_START)
        : plannerState.sleepStart;
      const sleepEnd = els.plannerSleepEnd
        ? (els.plannerSleepEnd.value || PLANNER_DEFAULT_SLEEP_END)
        : plannerState.sleepEnd;

      if (currentLevel === null || landCount === null || cropStallLevel === null || weekendTarget === null) return null;
      if (!isValidTimeValue(sleepStart) || !isValidTimeValue(sleepEnd)) return null;

      return {
        currentLevel,
        landCount,
        cropStallLevel,
        weekendTarget,
        includeBlessing,
        sleepStart,
        sleepEnd
      };
    }

    function startOrUpdatePlanner(event) {
      event.preventDefault();
      const values = readPlannerFormValues();
      if (!values) {
        showToast("规划参数不对", "居所设置、目标数量和睡眠时间都需要填写有效值。", "warn");
        return;
      }

      const now = Date.now();
      const wasActive = plannerState.active === true;
      plannerState = {
        ...plannerState,
        ...values,
        active: true,
        startedAt: wasActive ? plannerState.startedAt : now,
        progressWindowStart: wasActive ? plannerState.progressWindowStart : getCurrentOrNextDoubleWindow(now).start,
        weekendProgress: wasActive ? plannerState.weekendProgress : 0,
        updatedAt: now
      };
      normalizePlannerProgress(now);
      savePlannerState();
      renderPlanner();
      showToast(wasActive ? "规划已更新" : "规划已开启", "后续打卡、等级变化和延误都会触发重新排期。", "good");
    }

    function updatePlannerFromInputs() {
      const values = readPlannerFormValues();
      if (!values) return;
      plannerState = {
        ...plannerState,
        ...values,
        updatedAt: Date.now()
      };
      normalizePlannerProgress();
      savePlannerState();
      if (isMainPage) render();
      renderPlanner();
    }

    function stopPlanner() {
      if (!plannerState.active) {
        showToast("规划尚未开启", "填写参数后点击生成规划即可。", "warn");
        return;
      }

      plannerState = {
        ...plannerState,
        active: false,
        updatedAt: Date.now()
      };
      savePlannerState();
      renderPlanner();
      showToast("已停止规划", "现有作物打卡记录不会被清除。");
    }

    function adjustPlannerLevel(delta) {
      if (!els.plannerLevel) return;
      const current = readPositiveInteger(els.plannerLevel.value) || 1;
      els.plannerLevel.value = Math.max(1, current + delta);
      updatePlannerFromInputs();
    }

    function tick() {
      render();
      renderRanchHome();
      renderRanchPage();
      renderPlanner();
      checkDueReminders();
    }

    function buildPortableData() {
      if (window.HOKW_STORAGE?.buildPortableData) {
        return window.HOKW_STORAGE.buildPortableData(window.location.href);
      }

      const storage = {};
      const summary = [];

      PORTABLE_STORAGE_KEYS.forEach(item => {
        const value = localStorage.getItem(item.key);
        if (value === null) return;
        storage[item.key] = value;
        summary.push({
          key: item.key,
          label: item.label,
          bytes: value.length
        });
      });

      return {
        app: "HOKW_Farm",
        version: PORTABLE_DATA_VERSION,
        exportedAt: new Date().toISOString(),
        source: window.location.href,
        storage,
        summary
      };
    }

    function exportPortableData() {
      const payload = buildPortableData();
      const text = JSON.stringify(payload, null, 2);
      if (els.dataImportText) {
        els.dataImportText.value = text;
      }

      downloadPortableData(text, payload.exportedAt);
      const count = payload.summary.length;
      const message = count > 0
        ? `已导出 ${formatNumber(count)} 组本地数据，可到线上新网址导入。`
        : "当前浏览器还没有可导出的本地数据。";
      updateDataTransferStatus(message);
      showToast("备份已生成", message);
    }

    function downloadPortableData(text, exportedAt) {
      const blob = new Blob([text], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const safeDate = String(exportedAt || new Date().toISOString()).slice(0, 19).replace(/[T:]/g, "-");
      link.href = url;
      link.download = `hokw-farm-helper-backup-${safeDate}.json`;
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    function readPortableDataFile() {
      const file = els.dataImportFile?.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const text = String(reader.result || "");
        if (els.dataImportText) els.dataImportText.value = text;
        updateDataTransferStatus(`已读取 ${file.name}，确认内容无误后点击“导入并刷新页面”。`);
      });
      reader.addEventListener("error", () => {
        updateDataTransferStatus("读取备份文件失败，请重新选择文件或直接粘贴备份内容。");
        showToast("读取失败", "备份文件没有读出来，请重新选择一次。", "warn");
      });
      reader.readAsText(file, "utf-8");
    }

    function importPortableDataFromText() {
      const text = els.dataImportText?.value.trim() || "";
      if (!text) {
        showToast("没有备份内容", "请先选择备份文件，或把导出的 JSON 粘贴到文本框里。", "warn");
        return;
      }

      let payload;
      try {
        payload = JSON.parse(text);
      } catch (err) {
        showToast("备份格式不对", "这段内容不是有效的 JSON。", "warn");
        return;
      }

      let nextValues = [];
      if (window.HOKW_STORAGE?.validatePortableData) {
        const validation = window.HOKW_STORAGE.validatePortableData(payload);
        if (!validation.ok) {
          showToast("备份格式不对", validation.message, "warn");
          return;
        }
        nextValues = validation.items;
      } else {
        const storage = payload?.storage && typeof payload.storage === "object" ? payload.storage : null;
        if (!storage) {
          showToast("备份格式不对", "没有找到可导入的本地数据。", "warn");
          return;
        }

        for (const item of PORTABLE_STORAGE_KEYS) {
          if (!Object.prototype.hasOwnProperty.call(storage, item.key)) continue;
          const rawValue = storage[item.key];
          const value = typeof rawValue === "string" ? rawValue : JSON.stringify(rawValue);
          try {
            JSON.parse(value);
          } catch (err) {
            showToast("备份内容有误", `${item.label} 数据无法解析，已停止导入。`, "warn");
            return;
          }
          nextValues.push({ ...item, value });
        }
      }

      if (!nextValues.length) {
        showToast("没有可导入数据", "备份里没有当前版本认识的数据项。", "warn");
        return;
      }

      const confirmed = window.confirm(`导入会覆盖当前浏览器中的 ${nextValues.length} 组本地数据。确认继续吗？`);
      if (!confirmed) return;

      if (window.HOKW_STORAGE?.applyPortableData) {
        const result = window.HOKW_STORAGE.applyPortableData(payload);
        if (!result.ok) {
          showToast("导入失败", result.message, "warn");
          return;
        }
      } else {
        nextValues.forEach(item => {
          localStorage.setItem(item.key, item.value);
        });
      }

      updateDataTransferStatus(`已导入 ${formatNumber(nextValues.length)} 组本地数据，页面正在刷新。`);
      showToast("导入完成", "页面会刷新，并按导入后的数据重新显示。");
      setTimeout(() => window.location.reload(), 700);
    }

    function updateDataTransferStatus(message) {
      if (els.dataTransferStatus) els.dataTransferStatus.textContent = message;
    }

    function loadState() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : { farm: null };
      } catch (err) {
        return { farm: null };
      }
    }

    function saveState() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }

    function loadCalculatorItems() {
      try {
        const raw = localStorage.getItem(VALUE_CALCULATOR_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
      } catch (err) {
        return [];
      }
    }

    function saveCalculatorItems() {
      localStorage.setItem(VALUE_CALCULATOR_KEY, JSON.stringify(calculatorItems));
    }

    function loadCropArchiveItems() {
      localStorage.removeItem(CROP_ARCHIVE_KEY);
      return sortCropArchiveItems(BUILT_IN_CROP_ARCHIVE.map(normalizeArchiveItem).filter(Boolean));
    }

    function saveCropArchiveItems() {
      localStorage.removeItem(CROP_ARCHIVE_KEY);
    }

    function loadAnimalArchiveItems() {
      try {
        const raw = localStorage.getItem(ANIMAL_ARCHIVE_KEY);
        const parsed = raw ? JSON.parse(raw) : BUILT_IN_ANIMAL_ARCHIVE;
        const list = Array.isArray(parsed) ? parsed : [];
        return list
          .map(normalizeAnimalArchiveItem)
          .filter(Boolean)
          .sort((a, b) => a.createdAt - b.createdAt);
      } catch (err) {
        return BUILT_IN_ANIMAL_ARCHIVE.map(normalizeAnimalArchiveItem).filter(Boolean);
      }
    }

    function saveAnimalArchiveItems() {
      localStorage.setItem(ANIMAL_ARCHIVE_KEY, JSON.stringify(animalArchiveItems));
    }

    function normalizeAnimalArchiveItem(raw, index = 0) {
      if (!raw || typeof raw !== "object") return null;
      const name = String(raw.name || "").trim();
      const farmLevel = Number(raw.farmLevel);
      const purchasePrice = Number(raw.purchasePrice);
      const durationHours = Number(raw.durationHours);
      const feedCost = Number(raw.feedCost);
      const productSaleBase = Number(raw.productSaleBase);
      const exp = Number(raw.exp || 0);
      const rawRecycle = raw.recyclePrice === "" || raw.recyclePrice === null || raw.recyclePrice === undefined
        ? purchasePrice * 0.5
        : Number(raw.recyclePrice);
      const recyclePrice = Number.isFinite(rawRecycle) ? rawRecycle : purchasePrice * 0.5;

      if (!name) return null;
      if (!Number.isFinite(farmLevel) || farmLevel < 1 || !Number.isInteger(farmLevel)) return null;
      if (!Number.isFinite(purchasePrice) || purchasePrice < 0) return null;
      if (durationHours !== 16 && durationHours !== 20) return null;
      if (!Number.isFinite(feedCost) || feedCost < 0) return null;
      if (!Number.isFinite(productSaleBase) || productSaleBase < 0) return null;
      if (!Number.isFinite(recyclePrice) || recyclePrice < 0) return null;
      if (!Number.isFinite(exp) || exp < 0) return null;

      return {
        id: String(raw.id || `animal-${index}-${Date.now()}`),
        name: name.slice(0, 24),
        farmLevel,
        purchasePrice,
        durationHours,
        feedCost,
        productSaleBase,
        recyclePrice,
        exp,
        createdAt: Number.isFinite(raw.createdAt) ? Number(raw.createdAt) : Date.now(),
        updatedAt: Number.isFinite(raw.updatedAt) ? Number(raw.updatedAt) : Date.now()
      };
    }

    function loadAnimalCalculatorItems() {
      try {
        const raw = localStorage.getItem(ANIMAL_VALUE_CALCULATOR_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed.filter(item => item && item.archiveId) : [];
      } catch (err) {
        return [];
      }
    }

    function saveAnimalCalculatorItems() {
      localStorage.setItem(ANIMAL_VALUE_CALCULATOR_KEY, JSON.stringify(animalCalculatorItems));
    }

    function loadRanchState() {
      try {
        const raw = localStorage.getItem(RANCH_KEY);
        return normalizeRanchState(raw ? JSON.parse(raw) : {});
      } catch (err) {
        return normalizeRanchState({});
      }
    }

    function saveRanchState() {
      localStorage.setItem(RANCH_KEY, JSON.stringify(ranchState));
    }

    function normalizeRanchState(raw) {
      const state = raw && typeof raw === "object" ? raw : {};
      const slotCountRaw = Number(state.slotCount);
      const stallLevelRaw = Number(state.stallLevel);
      const slotCount = Number.isInteger(slotCountRaw) ? clamp(slotCountRaw, 1, 12) : 1;
      const stallLevel = Number.isInteger(stallLevelRaw) && stallLevelRaw >= 1 ? stallLevelRaw : 1;
      const rawGroups = state.groups && typeof state.groups === "object" ? state.groups : null;
      const groups = rawGroups
        ? normalizeRanchGroups(rawGroups)
        : migrateRanchSlotsToGroups(Array.isArray(state.slots) ? state.slots : []);

      const nextState = {
        slotCount,
        stallLevel,
        groups,
        updatedAt: Number.isFinite(Number(state.updatedAt)) ? Number(state.updatedAt) : Date.now()
      };
      fitRanchGroupCounts(nextState, "");
      return nextState;
    }

    function normalizeRanchSlot(raw, index) {
      const slot = raw && typeof raw === "object" ? raw : {};
      const animalId = String(slot.animalId || "");
      const startedAt = Number(slot.startedAt);
      const history = Array.isArray(slot.history)
        ? slot.history.filter(item => item && item.text && Number.isFinite(Number(item.at))).slice(0, 12)
        : [];

      return {
        index: index + 1,
        animalId,
        startedAt: animalId && Number.isFinite(startedAt) ? startedAt : 0,
        history
      };
    }

    function normalizeRanchGroups(rawGroups) {
      return RANCH_GROUPS.reduce((groups, meta) => {
        groups[meta.key] = normalizeRanchGroup(rawGroups[meta.key], meta);
        return groups;
      }, {});
    }

    function normalizeRanchGroup(raw, meta) {
      const group = raw && typeof raw === "object" ? raw : {};
      const countRaw = Number(group.count);
      const count = Number.isInteger(countRaw) ? clamp(countRaw, 0, 12) : 0;
      const startedAt = Number(group.startedAt);
      const history = Array.isArray(group.history)
        ? group.history.filter(item => item && item.text && Number.isFinite(Number(item.at))).slice(0, 12)
        : [];

      return {
        durationHours: meta.durationHours,
        count,
        startedAt: count > 0 && Number.isFinite(startedAt) ? startedAt : 0,
        history
      };
    }

    function migrateRanchSlotsToGroups(slots) {
      const groups = normalizeRanchGroups({});
      const now = Date.now();

      slots.forEach((rawSlot, index) => {
        const slot = normalizeRanchSlot(rawSlot, index);
        if (!slot.animalId || !slot.startedAt) return;

        const animal = getAnimalArchiveById(slot.animalId);
        const meta = animal ? RANCH_GROUPS.find(group => group.durationHours === animal.durationHours) : null;
        if (!animal || !meta) return;

        const group = groups[meta.key];
        const currentHarvestAt = group.startedAt
          ? group.startedAt + meta.durationHours * HOUR * 0.75
          : Infinity;
        const slotHarvestAt = slot.startedAt + getAnimalHarvestDuration(animal);
        group.count += 1;
        if (!group.startedAt || slotHarvestAt < currentHarvestAt) {
          group.startedAt = slot.startedAt;
        }
        group.history = [
          historyItem(`由旧栏位合并：${animal.name}，原 ${formatNumber(slot.index)}号栏`, now),
          ...group.history
        ].slice(0, 12);
      });

      return groups;
    }

    function fitRanchGroupCounts(targetState = ranchState, changedKey = "") {
      if (!targetState?.groups) return;
      targetState.slotCount = clamp(Number(targetState.slotCount) || 1, 1, 12);
      RANCH_GROUPS.forEach(meta => {
        targetState.groups[meta.key] = normalizeRanchGroup(targetState.groups[meta.key], meta);
      });

      const first = targetState.groups.h16;
      const second = targetState.groups.h20;
      if (first.count + second.count > targetState.slotCount) {
        if (changedKey === "h16") {
          second.count = Math.max(0, targetState.slotCount - first.count);
        } else if (changedKey === "h20") {
          first.count = Math.max(0, targetState.slotCount - second.count);
        } else {
          first.count = Math.min(first.count, targetState.slotCount);
          second.count = Math.max(0, targetState.slotCount - first.count);
        }
      }

      RANCH_GROUPS.forEach(meta => {
        const group = targetState.groups[meta.key];
        group.count = clamp(Number(group.count) || 0, 0, targetState.slotCount);
        if (group.count <= 0) group.startedAt = 0;
      });
    }

    function getRanchGroup(key) {
      return ranchState.groups?.[key] || normalizeRanchGroup({}, RANCH_GROUPS.find(group => group.key === key) || RANCH_GROUPS[0]);
    }

    function getRanchActiveCount() {
      return RANCH_GROUPS.reduce((total, meta) => total + getRanchGroup(meta.key).count, 0);
    }

    function getPreferredArchiveItem(cropKey, level = plannerState.currentLevel, mode = "balanced") {
      const maxLevel = Math.max(1, Number(level) || 1);
      const candidates = getComputableCropArchiveItems()
        .filter(item => item.cropKey === cropKey && item.farmLevel <= maxLevel);

      if (!candidates.length) return null;

      return [...candidates].sort((a, b) => compareArchivePreference(a, b, mode))[0];
    }

    function compareArchivePreference(a, b, mode = "balanced") {
      if (b.farmLevel !== a.farmLevel) return b.farmLevel - a.farmLevel;
      if (mode === "coins") return b.coins - a.coins || b.exp - a.exp || a.createdAt - b.createdAt;
      if (mode === "exp") return b.exp - a.exp || b.coins - a.coins || a.createdAt - b.createdAt;
      return (b.exp + b.coins) - (a.exp + a.coins) || b.exp - a.exp || b.coins - a.coins || a.createdAt - b.createdAt;
    }

    function getArchiveModeForCrop(cropKey) {
      if (cropKey === "money20") return "coins";
      if (cropKey === "exp16" || cropKey === "exp28" || cropKey === "fast5") return "exp";
      return "balanced";
    }

    function getFarmArchiveItem(farm, level = plannerState.currentLevel) {
      if (!farm || !CROP_TYPES[farm.cropKey]) return null;
      const archiveId = farm.planner?.archiveId || farm.archiveId;
      if (archiveId) {
        const archiveItem = cropArchiveItems.find(item => item.id === archiveId);
        if (archiveItem && isCropArchiveItemComputable(archiveItem)) return archiveItem;
      }
      return getPreferredArchiveItem(farm.cropKey, level, getArchiveModeForCrop(farm.cropKey));
    }

    function getWeekendTargetArchive(level = plannerState.currentLevel) {
      return getPreferredArchiveItem("money20", level, "coins");
    }

    function isWeekendTargetArchive(item, settings = getPlannerSettings()) {
      if (!item || item.cropKey !== "money20") return false;
      const target = getWeekendTargetArchive(settings.currentLevel);
      return Boolean(target && target.id === item.id);
    }

    function normalizeArchiveItem(raw, index = 0) {
      if (!raw || typeof raw !== "object") return null;
      const archiveOnly = raw.archiveOnly === true || Number(raw.farmLevel) < 6;
      const cropKey = CROP_TYPES[raw.cropKey] && VALUE_CROP_KEYS.includes(raw.cropKey) ? raw.cropKey : "";
      const name = String(raw.name || "").trim();
      const exp = Number(raw.exp);
      const yieldCount = Number(raw.yieldCount);
      const basePriceLevel1 = Number(raw.basePriceLevel1);
      const basePriceMax = Number(raw.basePriceMax);
      const fallbackCoins = Number.isFinite(basePriceMax) && Number.isFinite(yieldCount)
        ? basePriceMax * yieldCount
        : Number(raw.coins);
      const coins = Number.isFinite(Number(raw.coins)) ? Number(raw.coins) : fallbackCoins;
      const seedCost = Number(raw.seedCost || 0);
      const durationMinutes = Number(raw.durationMinutes);
      const farmLevel = Number(raw.farmLevel);

      if (!name) return null;
      if (!archiveOnly && !cropKey) return null;
      if (!Number.isFinite(exp) || exp < 0) return null;
      if (!Number.isFinite(coins) || coins < 0) return null;
      if (!Number.isFinite(farmLevel) || farmLevel < 1 || !Number.isInteger(farmLevel)) return null;
      if (!Number.isFinite(yieldCount) || yieldCount < 0) return null;
      if (!Number.isFinite(basePriceLevel1) || basePriceLevel1 < 0) return null;
      if (!Number.isFinite(basePriceMax) || basePriceMax < 0) return null;

      return {
        id: String(raw.id || `archive-${index}-${Date.now()}`),
        name: name.slice(0, 24),
        cropKey,
        durationMinutes: Number.isFinite(durationMinutes) && durationMinutes > 0
          ? durationMinutes
          : (CROP_TYPES[cropKey]?.minutes || 0),
        durationLabel: String(raw.durationLabel || "").trim(),
        yieldCount,
        exp,
        seedCost: Number.isFinite(seedCost) && seedCost >= 0 ? seedCost : 0,
        basePriceLevel1,
        basePriceMax,
        coins,
        farmLevel,
        archiveOnly,
        icon: String(raw.icon || "").trim(),
        createdAt: Number.isFinite(raw.createdAt) ? Number(raw.createdAt) : Date.now(),
        updatedAt: Number.isFinite(raw.updatedAt) ? Number(raw.updatedAt) : Date.now()
      };
    }

    function sortCropArchiveItems(items) {
      return [...items].sort((a, b) => b.farmLevel - a.farmLevel || a.createdAt - b.createdAt);
    }

    function isCropArchiveItemComputable(item) {
      return Boolean(
        item &&
        !item.archiveOnly &&
        item.farmLevel >= 6 &&
        CROP_TYPES[item.cropKey] &&
        VALUE_CROP_KEYS.includes(item.cropKey)
      );
    }

    function getComputableCropArchiveItems() {
      return cropArchiveItems.filter(isCropArchiveItemComputable);
    }

    function migrateLegacyCalculatorItems() {
      let calculatorChanged = false;

      calculatorItems = calculatorItems.map(item => {
        if (!item?.archiveId) {
          calculatorChanged = true;
          return null;
        }
        const archiveItem = cropArchiveItems.find(archive => archive.id === item.archiveId);
        if (!archiveItem || !isCropArchiveItemComputable(archiveItem)) {
          calculatorChanged = true;
          return null;
        }
        return {
          id: item.id || `value-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          archiveId: archiveItem.id,
          createdAt: item.createdAt || Date.now()
        };
      }).filter(Boolean);

      if (calculatorChanged) saveCalculatorItems();
    }

    function loadCalculatorOptions() {
      try {
        const raw = localStorage.getItem(VALUE_CALCULATOR_OPTIONS_KEY);
        const parsed = raw ? JSON.parse(raw) : {};
        return parsed && typeof parsed === "object" ? parsed : {};
      } catch (err) {
        return {};
      }
    }

    function saveCalculatorOptions() {
      localStorage.setItem(VALUE_CALCULATOR_OPTIONS_KEY, JSON.stringify(calculatorOptions));
    }

    function loadPlannerState() {
      try {
        const raw = localStorage.getItem(PLANNER_KEY);
        return normalizePlannerState(raw ? JSON.parse(raw) : {});
      } catch (err) {
        return normalizePlannerState({});
      }
    }

    function savePlannerState() {
      localStorage.setItem(PLANNER_KEY, JSON.stringify(plannerState));
    }

    function normalizePlannerState(raw) {
      const now = Date.now();
      const state = raw && typeof raw === "object" ? raw : {};
      const active = state.active === true;
      const startedAt = Number.isFinite(Number(state.startedAt)) ? Number(state.startedAt) : now;
      const currentLevel = Number.isInteger(Number(state.currentLevel)) && Number(state.currentLevel) > 0
        ? Number(state.currentLevel)
        : 1;
      const landCount = Number.isInteger(Number(state.landCount)) && Number(state.landCount) > 0
        ? Number(state.landCount)
        : PLANNER_DEFAULT_LAND_COUNT;
      const cropStallLevel = Number.isInteger(Number(state.cropStallLevel)) && Number(state.cropStallLevel) > 0
        ? Number(state.cropStallLevel)
        : 1;
      const weekendTarget = Number.isFinite(Number(state.weekendTarget)) && Number(state.weekendTarget) >= 0
        ? Number(state.weekendTarget)
        : PLANNER_DEFAULT_WEEKEND_TARGET;
      const sleepStart = isValidTimeValue(state.sleepStart) ? state.sleepStart : PLANNER_DEFAULT_SLEEP_START;
      const sleepEnd = isValidTimeValue(state.sleepEnd) ? state.sleepEnd : PLANNER_DEFAULT_SLEEP_END;
      const includeBlessing = state.includeBlessing === false ? false : true;
      const progressWindowStart = Number.isFinite(Number(state.progressWindowStart))
        ? Number(state.progressWindowStart)
        : getCurrentOrNextDoubleWindow(now).start;
      const weekendProgress = Number.isFinite(Number(state.weekendProgress)) && Number(state.weekendProgress) >= 0
        ? Number(state.weekendProgress)
        : 0;

      return {
        active,
        startedAt,
        currentLevel,
        landCount,
        cropStallLevel,
        weekendTarget,
        includeBlessing,
        sleepStart,
        sleepEnd,
        weekendProgress,
        progressWindowStart,
        updatedAt: Number.isFinite(Number(state.updatedAt)) ? Number(state.updatedAt) : now
      };
    }

    function isValidTimeValue(value) {
      return typeof value === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
    }

    function normalizePlannerProgress(now = Date.now()) {
      if (!plannerState.active) return;
      const currentWindow = getCurrentOrNextDoubleWindow(now);
      const storedStart = Number(plannerState.progressWindowStart);
      const storedWindow = Number.isFinite(storedStart) ? getDoubleWindowByStart(storedStart) : currentWindow;

      if (now >= storedWindow.end && storedStart !== currentWindow.start) {
        plannerState.weekendProgress = 0;
        plannerState.progressWindowStart = currentWindow.start;
        plannerState.updatedAt = now;
        savePlannerState();
      }
    }

    function loadNotifyState() {
      try {
        return JSON.parse(localStorage.getItem(NOTIFY_KEY) || "{}");
      } catch (err) {
        return {};
      }
    }

    function saveNotifyState(next) {
      localStorage.setItem(NOTIFY_KEY, JSON.stringify(next));
    }

    function cropRule(cropKey) {
      const crop = CROP_TYPES[cropKey];
      const base = crop.minutes * MINUTE;
      return {
        base,
        firstWaterReduce: base * 0.07,
        maxSelfReduce: base * 0.07,
        friendReduce: base * 0.025,
        minSelfReduce: base * 0.0175,
        firstNextInterval: base * 0.06,
        maxInterval: base * 0.24,
        friendMaxCount: 4
      };
    }

    function clamp(value, min, max) {
      return Math.min(max, Math.max(min, value));
    }

    function ceilToMinute(timestamp) {
      return Math.ceil(timestamp / MINUTE) * MINUTE;
    }

    function roundMatureTimestamp(cropKey, timestamp) {
      const crop = CROP_TYPES[cropKey];
      return crop.roundMatureToMinute === false ? timestamp : ceilToMinute(timestamp);
    }

    function getRawMatureAt(farm) {
      const rule = cropRule(farm.cropKey);
      return farm.plantedAt + rule.base - farm.totalReductionMs;
    }

    function getSunbinReduction(cropKey) {
      return cropRule(cropKey).base * 0.5;
    }

    function getMatureAt(farm) {
      const raw = getRawMatureAt(farm);
      return roundMatureTimestamp(farm.cropKey, raw);
    }

    function getSelfWaterReductionByElapsed(rule, elapsed) {
      if (elapsed < rule.firstNextInterval) return 0;

      const progress = clamp(
        (elapsed - rule.firstNextInterval) / (rule.maxInterval - rule.firstNextInterval),
        0,
        1
      );
      return rule.minSelfReduce + progress * (rule.maxSelfReduce - rule.minSelfReduce);
    }

    function getSelfWaterReduction(farm, at = Date.now()) {
      const rule = cropRule(farm.cropKey);
      if (!farm.lastSelfWaterAt) return rule.firstWaterReduce;

      const elapsed = Math.max(0, at - farm.lastSelfWaterAt);
      return getSelfWaterReductionByElapsed(rule, elapsed);
    }

    function getNextWaterAt(farm) {
      if (!farm.lastSelfWaterAt) return farm.plantedAt;
      return farm.lastSelfWaterAt + cropRule(farm.cropKey).firstNextInterval;
    }

    function getProgress(farm, now = Date.now()) {
      const rule = cropRule(farm.cropKey);
      const matureAt = getMatureAt(farm);
      const elapsedReal = Math.max(0, now - farm.plantedAt);
      const effectiveGrown = elapsedReal + farm.totalReductionMs;
      const rawProgress = clamp((effectiveGrown / rule.base) * 100, 0, 100);

      // 进度条表达“有效成长进度”：自然时间 + 已浇水减少的时间。
      // 真实作物存在成熟时间向上取整到分钟，避免倒计时还有几十秒时进度条已经显示 100%。
      if (now < matureAt && rawProgress >= 100) return 99.9;
      return rawProgress;
    }

    function getProgressNote(farm, now = Date.now()) {
      const rule = cropRule(farm.cropKey);
      const elapsedReal = Math.max(0, now - farm.plantedAt);
      const naturalPct = clamp((elapsedReal / rule.base) * 100, 0, 100);
      const sunbinReduction = farm.sunbinUsed ? (farm.sunbinReductionMs || getSunbinReduction(farm.cropKey)) : 0;
      const waterReduction = Math.max(0, farm.totalReductionMs - sunbinReduction);
      const waterPct = clamp((waterReduction / rule.base) * 100, 0, 100);
      const sunbinPct = clamp((sunbinReduction / rule.base) * 100, 0, 100);
      const note = farm.sunbinUsed
        ? `自然生长 ${naturalPct.toFixed(1)}% + 浇水加速 ${waterPct.toFixed(1)}% + 孙膑催熟 ${sunbinPct.toFixed(1)}%`
        : `自然生长 ${naturalPct.toFixed(1)}% + 浇水加速 ${waterPct.toFixed(1)}%`;
      return farm.syncedFromGame
        ? `${note}（已按游戏剩余成熟同步，历史浇水减时未反推）`
        : note;
    }

    function getWaterHint(farm, now = Date.now()) {
      const matureAt = getMatureAt(farm);
      if (now >= matureAt) {
        return { ready: false, done: true, label: "作物已成熟", maxLabel: "作物已成熟", waitMs: 0, maxWaitMs: 0, reduction: 0, nextAt: null, maxAt: null };
      }

      const nextAt = getNextWaterAt(farm);
      const rule = cropRule(farm.cropKey);
      const maxAt = farm.lastSelfWaterAt ? farm.lastSelfWaterAt + rule.maxInterval : null;
      const maxWaitMs = maxAt ? Math.max(0, maxAt - now) : 0;
      const maxLabel = !farm.lastSelfWaterAt
        ? "首次自浇无需等待最大间隔"
        : now < maxAt
          ? `距最大间隔还剩 ${formatDuration(maxWaitMs, true)}`
          : "已达到最大浇水间隔";

      if (now < nextAt) {
        return { ready: false, done: false, label: `还需 ${formatDuration(nextAt - now, true)}`, maxLabel, waitMs: nextAt - now, maxWaitMs, reduction: 0, nextAt, maxAt };
      }

      const reduction = getSelfWaterReduction(farm, now);
      const pct = reduction / rule.base * 100;
      return { ready: true, done: false, label: `本次约减 ${formatDuration(reduction, true)}（${pct.toFixed(2)}%）`, maxLabel, waitMs: 0, maxWaitMs, reduction, nextAt, maxAt };
    }

    function getWaterReminderTarget(farm, now = Date.now(), theoreticalPlan = null) {
      const matureAt = getMatureAt(farm);
      if (now >= matureAt) {
        return {
          type: "done",
          at: null,
          ready: false,
          waitMs: 0,
          value: "—",
          sub: "作物已成熟",
          label: "作物已成熟"
        };
      }

      const rule = cropRule(farm.cropKey);
      const nextAt = getNextWaterAt(farm);
      const maxAt = farm.lastSelfWaterAt ? farm.lastSelfWaterAt + rule.maxInterval : nextAt;
      const plan = theoreticalPlan || getCurrentTheoreticalPlan(farm, now);
      const finalAt = plan.finalWaterAt && plan.finalWaterAt < matureAt ? plan.finalWaterAt : null;
      const shouldUseFinal = finalAt && finalAt <= maxAt;
      const targetAt = shouldUseFinal ? finalAt : maxAt;
      const waitMs = Math.max(0, targetAt - now);
      const ready = now >= targetAt;
      const targetReduction = getSelfWaterReduction(farm, Math.max(targetAt, now));
      const isFirstWater = !farm.lastSelfWaterAt && !shouldUseFinal;
      const type = shouldUseFinal ? "final" : isFirstWater ? "first" : "max";

      if (type === "final") {
        return {
          type,
          at: targetAt,
          ready,
          waitMs,
          value: ready ? "现在" : formatDuration(waitMs, true),
          sub: `最佳收尾 ${formatClock(targetAt)} · 浇完约 ${formatClock(plan.fastestAt)} 成熟`,
          label: ready ? "最佳收尾浇水已到" : "等待最佳收尾浇水"
        };
      }

      if (type === "first") {
        return {
          type,
          at: targetAt,
          ready,
          waitMs,
          value: ready ? "现在" : formatDuration(waitMs, true),
          sub: `首次自浇可直接满额减时 · 约减 ${formatDuration(targetReduction, true)}`,
          label: ready ? "首次自浇可用" : "等待首次自浇"
        };
      }

      return {
        type,
        at: targetAt,
        ready,
        waitMs,
        value: ready ? "现在" : formatDuration(waitMs, true),
        sub: `${ready ? "已达最大间隔" : `最大间隔 ${formatClock(targetAt)}`} · 约减 ${formatDuration(targetReduction, true)}`,
        label: ready ? "最大间隔浇水已到" : "等待最大间隔浇水"
      };
    }

    function getCurrentTheoreticalPlan(farm, now = Date.now()) {
      const rule = cropRule(farm.cropKey);
      const matureAt = getMatureAt(farm);
      if (now >= matureAt) {
        return {
          fastestAt: matureAt,
          durationMs: 0,
          friendWaterCount: 0,
          friendReductionMs: 0,
          finalWaterAt: null,
          finalWaterReductionMs: 0,
          intermediateSelfWaterCount: 0,
          label: "作物已成熟"
        };
      }

      const remainingFriendCount = Math.max(0, rule.friendMaxCount - farm.friendWaterCount);
      const friendReductionMs = remainingFriendCount * rule.friendReduce;
      let rawMatureAt = getRawMatureAt(farm) - friendReductionMs;
      let lastSelfWaterAt = farm.lastSelfWaterAt;
      let intermediateSelfWaterCount = 0;

      if (roundMatureTimestamp(farm.cropKey, rawMatureAt) <= now) {
        return {
          fastestAt: now,
          durationMs: 0,
          friendWaterCount: remainingFriendCount,
          friendReductionMs,
          finalWaterAt: null,
          finalWaterReductionMs: 0,
          intermediateSelfWaterCount,
          label: remainingFriendCount > 0 ? "补满好友浇水后可成熟" : "当前已可成熟"
        };
      }

      if (!lastSelfWaterAt) {
        const firstWaterAt = Math.max(now, farm.plantedAt);
        const finalFirstWaterAt = rawMatureAt - rule.firstWaterReduce;
        if (firstWaterAt >= finalFirstWaterAt) {
          const fastestAt = roundMatureTimestamp(farm.cropKey, Math.max(firstWaterAt, rawMatureAt - rule.firstWaterReduce));
          return {
            fastestAt,
            durationMs: Math.max(0, fastestAt - now),
            friendWaterCount: remainingFriendCount,
            friendReductionMs,
            finalWaterAt: firstWaterAt,
            finalWaterReductionMs: rule.firstWaterReduce,
            intermediateSelfWaterCount,
            label: "首次自浇可作为收尾浇水"
          };
        }

        rawMatureAt -= rule.firstWaterReduce;
        lastSelfWaterAt = firstWaterAt;
        intermediateSelfWaterCount += 1;
      }

      for (let i = 0; i < 30; i += 1) {
        const finalWater = getFinalSelfWaterOpportunity(farm.cropKey, rawMatureAt, lastSelfWaterAt, now);
        const fullWaterAt = Math.max(now, lastSelfWaterAt + rule.maxInterval);
        const nextAfterFullAt = fullWaterAt + rule.firstNextInterval;
        const canUseFullWaterBeforeMature = fullWaterAt < rawMatureAt;
        const fullWaterCreatesAnotherChance = finalWater.finalWaterAt && nextAfterFullAt < finalWater.fastestAt - 1000;

        if (!canUseFullWaterBeforeMature || !fullWaterCreatesAnotherChance) {
          return {
            ...finalWater,
            durationMs: Math.max(0, finalWater.fastestAt - now),
            friendWaterCount: remainingFriendCount,
            friendReductionMs,
            intermediateSelfWaterCount
          };
        }

        const elapsed = Math.max(0, fullWaterAt - lastSelfWaterAt);
        const reduction = getSelfWaterReductionByElapsed(rule, elapsed);
        rawMatureAt -= reduction;
        lastSelfWaterAt = fullWaterAt;
        intermediateSelfWaterCount += 1;

        if (roundMatureTimestamp(farm.cropKey, rawMatureAt) <= fullWaterAt) {
          return {
            fastestAt: fullWaterAt,
            durationMs: Math.max(0, fullWaterAt - now),
            friendWaterCount: remainingFriendCount,
            friendReductionMs,
            finalWaterAt: fullWaterAt,
            finalWaterReductionMs: reduction,
            intermediateSelfWaterCount: Math.max(0, intermediateSelfWaterCount - 1),
            label: "满减自浇后可成熟"
          };
        }
      }

      const fallbackAt = roundMatureTimestamp(farm.cropKey, rawMatureAt);
      return {
        fastestAt: fallbackAt,
        durationMs: Math.max(0, fallbackAt - now),
        friendWaterCount: remainingFriendCount,
        friendReductionMs,
        finalWaterAt: null,
        finalWaterReductionMs: 0,
        intermediateSelfWaterCount,
        label: "按当前状态自然成熟"
      };
    }

    function getFinalSelfWaterOpportunity(cropKey, rawMatureAt, lastSelfWaterAt, now = Date.now()) {
      const rule = cropRule(cropKey);
      const naturalMatureAt = roundMatureTimestamp(cropKey, rawMatureAt);
      const earliestWaterAt = Math.max(now, lastSelfWaterAt + rule.firstNextInterval);

      if (earliestWaterAt >= rawMatureAt) {
        return {
          fastestAt: naturalMatureAt,
          finalWaterAt: null,
          finalWaterReductionMs: 0,
          label: "下次自浇前会自然成熟"
        };
      }

      const earliestReduction = getSelfWaterReductionByElapsed(rule, earliestWaterAt - lastSelfWaterAt);
      if (rawMatureAt - earliestWaterAt <= earliestReduction) {
        const fastestAt = roundMatureTimestamp(cropKey, Math.max(earliestWaterAt, rawMatureAt - earliestReduction));
        return {
          fastestAt,
          finalWaterAt: earliestWaterAt,
          finalWaterReductionMs: earliestReduction,
          label: earliestWaterAt <= now + 1000 ? "现在自浇即可收尾" : "到最小间隔即可收尾"
        };
      }

      const slope = (rule.maxSelfReduce - rule.minSelfReduce) / (rule.maxInterval - rule.firstNextInterval);
      const elapsedForExact = (rawMatureAt - lastSelfWaterAt - rule.minSelfReduce + slope * rule.firstNextInterval) / (1 + slope);
      const exactAt = lastSelfWaterAt + elapsedForExact;
      const minAt = lastSelfWaterAt + rule.firstNextInterval;
      const maxAt = lastSelfWaterAt + rule.maxInterval;

      if (exactAt >= earliestWaterAt && exactAt >= minAt && exactAt <= maxAt) {
        const reduction = getSelfWaterReductionByElapsed(rule, exactAt - lastSelfWaterAt);
        return {
          fastestAt: roundMatureTimestamp(cropKey, exactAt),
          finalWaterAt: exactAt,
          finalWaterReductionMs: reduction,
          label: "线性减时区间内收尾最合适"
        };
      }

      const cappedExactAt = rawMatureAt - rule.maxSelfReduce;
      const earliestMaxWaterAt = Math.max(now, maxAt);
      if (cappedExactAt >= earliestMaxWaterAt && cappedExactAt < rawMatureAt) {
        return {
          fastestAt: roundMatureTimestamp(cropKey, cappedExactAt),
          finalWaterAt: cappedExactAt,
          finalWaterReductionMs: rule.maxSelfReduce,
          label: "达到满减后等到收尾点再浇"
        };
      }

      return {
        fastestAt: naturalMatureAt,
        finalWaterAt: null,
        finalWaterReductionMs: 0,
        label: "本轮不需要新的自浇"
      };
    }

    function formatBestFinalWater(plan, matured) {
      if (matured) {
        return { value: "无需浇水", sub: "作物已经成熟" };
      }

      if (!plan.finalWaterAt) {
        return {
          value: "无需自浇",
          sub: `${plan.label}，预计 ${formatClock(plan.fastestAt)}`
        };
      }

      const value = plan.finalWaterAt <= Date.now() + 1000 ? "现在" : formatClock(plan.finalWaterAt);
      const subParts = [
        `约减 ${formatDuration(plan.finalWaterReductionMs, true)}`,
        `浇完约 ${formatClock(plan.fastestAt)} 成熟`
      ];

      if (plan.intermediateSelfWaterCount > 0) {
        subParts.push(`前面还需按最大间隔自浇 ${plan.intermediateSelfWaterCount} 次`);
      }

      return {
        value,
        sub: subParts.join(" · ")
      };
    }

    function getTheoreticalFastestMatureAt(farm) {
      const rule = cropRule(farm.cropKey);
      const crop = CROP_TYPES[farm.cropKey];
      const start = farm.plantedAt;
      let totalReduction = (farm.sunbinUsed ? getSunbinReduction(farm.cropKey) : 0) + rule.firstWaterReduce + rule.friendReduce * rule.friendMaxCount;
      let lastFullSelfWaterAt = start;
      let rawMatureAt = start + rule.base - totalReduction;

      for (let i = 0; i < 20; i += 1) {
        const nextFullSelfWaterAt = lastFullSelfWaterAt + rule.maxInterval;
        if (nextFullSelfWaterAt >= rawMatureAt) break;

        totalReduction += rule.maxSelfReduce;
        lastFullSelfWaterAt = nextFullSelfWaterAt;
        rawMatureAt = start + rule.base - totalReduction;
      }

      return crop.roundMatureToMinute === false ? rawMatureAt : ceilToMinute(rawMatureAt);
    }

    function getTheoreticalFastestDuration(cropKey, options = {}) {
      const rule = cropRule(cropKey);
      const crop = CROP_TYPES[cropKey];
      const sunbinReduction = options.sunbin ? rule.base * 0.5 : 0;
      let totalReduction = sunbinReduction + rule.firstWaterReduce + rule.friendReduce * rule.friendMaxCount;
      let lastFullSelfWaterAt = 0;
      let rawDuration = Math.max(0, rule.base - totalReduction);

      for (let i = 0; i < 20; i += 1) {
        const nextFullSelfWaterAt = lastFullSelfWaterAt + rule.maxInterval;
        if (nextFullSelfWaterAt >= rawDuration) break;

        totalReduction += rule.maxSelfReduce;
        lastFullSelfWaterAt = nextFullSelfWaterAt;
        rawDuration = Math.max(0, rule.base - totalReduction);
      }

      return crop.roundMatureToMinute === false ? rawDuration : Math.ceil(rawDuration / MINUTE) * MINUTE;
    }

    function syncExistingCrop(event) {
      event.preventDefault();
      if (state.farm && !confirm("当前已有一批作物，是否覆盖并同步游戏里的已有作物？")) return;

      const cropKey = els.syncCropSelect.value;
      const crop = CROP_TYPES[cropKey];
      const rule = cropRule(cropKey);
      const archiveItem = getPreferredArchiveItem(cropKey, plannerState.currentLevel, getArchiveModeForCrop(cropKey));
      const now = Date.now();
      const remainingMs = readDurationInputs(els.syncRemainHours, els.syncRemainMinutes);
      const friendWaterCount = readNonNegativeInteger(els.syncFriendCount.value);

      if (remainingMs === null) {
        showToast("剩余时间格式不对", "小时和分钟请填写为 0 或正整数。", "warn");
        return;
      }

      if (friendWaterCount === null || friendWaterCount > rule.friendMaxCount) {
        showToast("好友浇水次数不对", "好友浇水次数请填写 0 到 4 之间的整数。", "warn");
        return;
      }

      if (remainingMs <= 0) {
        showToast("作物可能已经成熟", "剩余成熟时间需要大于 0；如果已经成熟，可以直接回游戏收菜。", "warn");
        return;
      }

      const mode = getSyncWaterMode();
      const sunbinUsed = els.syncSunbin.checked;
      const sunbinReduction = sunbinUsed ? getSunbinReduction(cropKey) : 0;
      const targetMatureAt = crop.roundMatureToMinute === false
        ? now + remainingMs
        : ceilToMinute(now + remainingMs);
      const plantedAt = targetMatureAt - rule.base + sunbinReduction;
      const maxRemainingAfterSunbin = Math.max(0, rule.base - sunbinReduction);

      if (plantedAt > now + 1000) {
        showToast(
          "剩余成熟时间超出范围",
          `${crop.label}${sunbinUsed ? "并已用孙膑时" : ""}最多还会剩 ${formatDuration(maxRemainingAfterSunbin, true)}。请检查作物成熟时间或孙膑选项。`,
          "warn"
        );
        return;
      }

      let lastSelfWaterAt = null;
      let syncWaterText = "";
      const syncWaterSource = { mode };

      if (mode === "ready") {
        const reductionMs = readDurationInputs(els.syncReduceHours, els.syncReduceMinutes);
        if (reductionMs === null || reductionMs <= 0) {
          showToast("浇水减时时间不对", "现在可浇时，请填写本次浇水可以减少的小时和分钟。", "warn");
          return;
        }

        const elapsedSinceLastWater = getElapsedForSelfWaterReduction(cropKey, reductionMs);
        if (elapsedSinceLastWater === null) {
          showToast(
            "浇水减时和作物不匹配",
            `${crop.label} 后续自浇通常减少 ${formatDuration(rule.minSelfReduce, true)} 到 ${formatDuration(rule.maxSelfReduce, true)}。请检查作物成熟时间或减时输入。`,
            "warn"
          );
          return;
        }

        lastSelfWaterAt = now - elapsedSinceLastWater;
        syncWaterSource.reductionMs = reductionMs;
        syncWaterText = `现在自浇约可减 ${formatDuration(reductionMs, true)}`;
      } else {
        const waitMs = readDurationInputs(els.syncWaitHours, els.syncWaitMinutes);
        if (waitMs === null) {
          showToast("等待时间格式不对", "等待小时和分钟请填写为 0 或正整数。", "warn");
          return;
        }

        if (waitMs > rule.firstNextInterval + MINUTE) {
          showToast(
            "等待时间超出规则范围",
            `${crop.label} 后续自浇可用间隔是 ${formatDuration(rule.firstNextInterval, true)}。如果游戏显示更久，请检查作物成熟时间。`,
            "warn"
          );
          return;
        }

        lastSelfWaterAt = now + waitMs - rule.firstNextInterval;
        syncWaterSource.waitMs = waitMs;
        syncWaterText = waitMs > 0
          ? `距离下次自浇还需 ${formatDuration(waitMs, true)}`
          : "下次自浇已到时间";
      }

      if (lastSelfWaterAt !== null && lastSelfWaterAt < plantedAt - MINUTE) {
        showToast(
          "这组数据暂时对不上",
          "按剩余成熟时间反推，作物还没有早到足够发生这次浇水状态。请检查剩余成熟、作物成熟时间或孙膑选项。",
          "warn"
        );
        return;
      }

      state.farm = {
        id: `farm-${now}`,
        cropKey,
        plantedAt,
        lastSelfWaterAt,
        selfWaterCount: lastSelfWaterAt ? 1 : 0,
        friendWaterCount,
        sunbinUsed,
        sunbinReductionMs: sunbinReduction,
        totalReductionMs: sunbinReduction,
        archiveId: archiveItem?.id || "",
        archiveName: archiveItem?.name || "",
        archiveFarmLevel: archiveItem?.farmLevel || null,
        syncedFromGame: {
          at: now,
          remainingMs: targetMatureAt - now,
          ...syncWaterSource
        },
        history: [
          historyItem(`同步已有作物：游戏剩余成熟 ${formatDuration(targetMatureAt - now, true)}，${syncWaterText}`, now),
          historyItem("同步口径：历史浇水和好友浇水不反推，从这次同步后继续打卡", now),
          ...(archiveItem ? [historyItem(`已按当前 Lv.${plannerState.currentLevel} 绑定档案：${archiveItem.name}（Lv.${archiveItem.farmLevel}）`, now)] : []),
          ...(friendWaterCount > 0 ? [historyItem(`已按游戏现状记录好友浇水次数：${friendWaterCount}/4（不重复扣减成熟时间）`, now)] : []),
          ...(sunbinUsed ? [historyItem(`已按孙膑催熟同步：固定减少 ${formatDuration(sunbinReduction, true)}`, now)] : [])
        ]
      };

      localStorage.removeItem(NOTIFY_KEY);
      saveState();
      render();
      renderPlanner();
      showToast("已同步已有作物", `${archiveItem?.name || crop.label} 已按游戏数据接管，后续可以继续打卡浇水。`, "good");
    }

    function plantCrop(withFirstWater) {
      if (state.farm && !confirm("当前已有一批作物，是否覆盖并重新开始？")) return;

      const cropKey = els.cropSelect.value;
      const now = Date.now();
      const rule = cropRule(cropKey);
      const archiveItem = getPreferredArchiveItem(cropKey, plannerState.currentLevel, getArchiveModeForCrop(cropKey));
      const sunbinUsed = els.plantSunbin.checked;
      const sunbinReduction = sunbinUsed ? getSunbinReduction(cropKey) : 0;
      const firstReduction = withFirstWater ? rule.firstWaterReduce : 0;
      const totalReduction = sunbinReduction + firstReduction;

      state.farm = {
        id: `farm-${now}`,
        cropKey,
        plantedAt: now,
        lastSelfWaterAt: withFirstWater ? now : null,
        selfWaterCount: withFirstWater ? 1 : 0,
        friendWaterCount: 0,
        sunbinUsed,
        sunbinReductionMs: sunbinReduction,
        totalReductionMs: totalReduction,
        archiveId: archiveItem?.id || "",
        archiveName: archiveItem?.name || "",
        archiveFarmLevel: archiveItem?.farmLevel || null,
        history: [
          historyItem(withFirstWater ? "种下整块菜地，并完成首次浇水" : "种下整块菜地，尚未首次浇水", now),
          ...(archiveItem ? [historyItem(`已按当前 Lv.${plannerState.currentLevel} 绑定档案：${archiveItem.name}（Lv.${archiveItem.farmLevel}）`, now)] : []),
          ...(sunbinUsed ? [historyItem(`孙膑催熟：固定减少 ${formatDuration(sunbinReduction, true)}`, now)] : []),
          ...(withFirstWater ? [historyItem(`首次浇水：减少 ${formatDuration(firstReduction, true)}`, now)] : [])
        ]
      };

      localStorage.removeItem(NOTIFY_KEY);
      saveState();
      render();
      renderPlanner();
      showToast("已开始管理", `${archiveItem?.name || CROP_TYPES[cropKey].label} 已记录${sunbinUsed ? "，已计入孙膑催熟。" : "。"}`);
    }

    function useSunbin() {
      const farm = state.farm;
      if (!farm) return;
      if (farm.sunbinUsed) {
        showToast("孙膑催熟已记录", "同一批作物只需要记录一次孙膑催熟。", "warn");
        return;
      }

      const now = Date.now();
      const reduction = getSunbinReduction(farm.cropKey);
      farm.sunbinUsed = true;
      farm.sunbinReductionMs = reduction;
      farm.totalReductionMs += reduction;
      farm.history.unshift(historyItem(`孙膑催熟：固定减少 ${formatDuration(reduction, true)}`, now));
      localStorage.removeItem(NOTIFY_KEY);
      saveState();
      render();
      renderPlanner();
      showToast("孙膑催熟已记录", `成熟时间已重新计算，固定减少 ${formatDuration(reduction, true)}。`, "good");
    }

    function selfWater() {
      const farm = state.farm;
      if (!farm) return;
      const now = Date.now();
      const reduction = getSelfWaterReduction(farm, now);
      if (reduction <= 0) {
        const hint = getWaterHint(farm, now);
        showToast("还不能浇水", hint.label);
        return;
      }

      farm.lastSelfWaterAt = now;
      farm.selfWaterCount += 1;
      farm.totalReductionMs += reduction;
      farm.history.unshift(historyItem(`自浇打卡：减少 ${formatDuration(reduction, true)}`, now));
      saveState();
      render();
      renderPlanner();
      showToast("浇水已记录", `成熟时间已重新计算，本次减少 ${formatDuration(reduction, true)}。`);
    }

    function friendWater() {
      const farm = state.farm;
      if (!farm) return;
      const rule = cropRule(farm.cropKey);
      if (farm.friendWaterCount >= rule.friendMaxCount) {
        showToast("好友浇水已达上限", "成熟前最多计入 4 次好友浇水。");
        return;
      }

      const now = Date.now();
      farm.friendWaterCount += 1;
      farm.totalReductionMs += rule.friendReduce;
      farm.history.unshift(historyItem(`好友浇水 +1：减少 ${formatDuration(rule.friendReduce, true)}`, now));
      saveState();
      render();
      renderPlanner();
      showToast("好友浇水已记录", `当前 ${farm.friendWaterCount}/4 次。`);
    }

    function harvestDone() {
      if (!state.farm) return;
      if (!confirm("确认已经在游戏内收菜了吗？确认后将清空当前作物记录。")) return;
      const farm = state.farm;
      const label = CROP_TYPES[farm.cropKey].label;
      const plannerGain = recordPlannerHarvestProgress(farm);
      state.farm = null;
      localStorage.removeItem(NOTIFY_KEY);
      saveState();
      render();
      renderPlanner();
      showToast("收获完成", `${label} 已从管理列表移除。${plannerGain > 0 ? `周末目标 +${formatNumber(plannerGain)}。` : ""}`);
    }

    function clearAll() {
      if (!confirm("确认清空当前种植记录和提醒记录吗？")) return;
      state = { farm: null };
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(NOTIFY_KEY);
      render();
      renderPlanner();
      showToast("已清空", "可以重新开始记录。");
    }

    function saveArchiveItemFromForm(event) {
      event.preventDefault();

      const editingId = els.archiveEditingId.value;
      const name = els.archiveName.value.trim();
      const cropKey = els.archiveCropTime.value;
      const exp = readNonNegativeNumber(els.archiveExp.value);
      const coins = readNonNegativeNumber(els.archiveCoins.value);
      const farmLevel = readPositiveInteger(els.archiveLevel.value);

      if (!name) {
        showToast("请填写作物名称", "名称会用于档案库和收益对比表。", "warn");
        return;
      }

      if (!CROP_TYPES[cropKey] || !VALUE_CROP_KEYS.includes(cropKey)) {
        showToast("请选择成熟时间", "档案库作物需要绑定一个成熟时间档位。", "warn");
        return;
      }

      if (exp === null || coins === null || farmLevel === null) {
        showToast("输入有误", "经验、百工币和居所等级都需要填写为有效数字。", "warn");
        return;
      }

      if (exp === 0 && coins === 0) {
        showToast("还没有收益数据", "至少填写经验或百工币中的一项。", "warn");
        return;
      }

      const duplicated = cropArchiveItems.some(item => item.id !== editingId && item.name === name);
      if (duplicated) {
        showToast("作物已存在", "档案库里已经有同名作物，可以直接编辑原档案。", "warn");
        return;
      }

      const now = Date.now();

      if (editingId) {
        const target = cropArchiveItems.find(item => item.id === editingId);
        if (!target) {
          resetArchiveForm();
          showToast("档案不存在", "当前编辑的作物已经被删除。", "warn");
          return;
        }

        target.name = name;
        target.cropKey = cropKey;
        target.exp = exp;
        target.coins = coins;
        target.farmLevel = farmLevel;
        target.updatedAt = now;
        showToast("已更新档案", `${name} 的数据已更新。`, "good");
      } else {
        cropArchiveItems.push({
          id: `archive-${now}-${Math.random().toString(36).slice(2)}`,
          name,
          cropKey,
          exp,
          coins,
          farmLevel,
          createdAt: now,
          updatedAt: now
        });
        showToast("已加入档案库", `${name} 之后可以直接用于收益对比。`, "good");
      }

      cropArchiveItems.sort((a, b) => a.createdAt - b.createdAt);
      saveCropArchiveItems();
      resetArchiveForm();
      renderCropArchive();
      renderValueArchiveOptions();
      renderValueCalculator();
      renderPlanner();
    }

    function editArchiveItem(itemId) {
      const item = cropArchiveItems.find(archiveItem => archiveItem.id === itemId);
      if (!item) {
        showToast("档案不存在", "这条作物档案可能已经被删除。", "warn");
        return;
      }

      els.archiveEditingId.value = item.id;
      els.archiveName.value = item.name;
      els.archiveCropTime.value = item.cropKey;
      els.archiveExp.value = item.exp;
      els.archiveCoins.value = item.coins;
      els.archiveLevel.value = item.farmLevel;
      els.archiveSaveBtn.textContent = "保存修改";
      els.archiveCancelBtn.classList.remove("is-hidden");
      refreshCustomSelect(els.archiveCropTime);
      els.archiveName.focus();
    }

    function deleteArchiveItem(itemId) {
      const item = cropArchiveItems.find(archiveItem => archiveItem.id === itemId);
      if (!item) return;

      const usedInCompare = calculatorItems.some(compareItem => compareItem.archiveId === item.id);
      const message = usedInCompare
        ? `确认删除“${item.name}”吗？它也会从当前收益对比中移除。`
        : `确认删除“${item.name}”吗？`;

      if (!confirm(message)) return;

      cropArchiveItems = cropArchiveItems.filter(archiveItem => archiveItem.id !== item.id);
      calculatorItems = calculatorItems.filter(compareItem => compareItem.archiveId !== item.id);
      saveCropArchiveItems();
      saveCalculatorItems();
      if (els.archiveEditingId.value === item.id) resetArchiveForm();
      renderCropArchive();
      renderValueArchiveOptions();
      renderValueCalculator();
      renderPlanner();
      showToast("已删除档案", `${item.name} 已从档案库移除。`);
    }

    function resetArchiveForm() {
      els.archiveEditingId.value = "";
      els.archiveName.value = "";
      els.archiveCropTime.value = "money20";
      els.archiveExp.value = "";
      els.archiveCoins.value = "";
      els.archiveLevel.value = "";
      els.archiveSaveBtn.textContent = "保存到档案库";
      els.archiveCancelBtn.classList.add("is-hidden");
      refreshCustomSelect(els.archiveCropTime);
    }

    function exportCropArchive() {
      if (!cropArchiveItems.length) {
        showToast("暂无档案可导出", "先录入作物档案后再导出标准库。", "warn");
        return;
      }

      const exportText = JSON.stringify(cropArchiveItems.map(item => ({
        id: item.id,
        name: item.name,
        cropKey: item.cropKey,
        coins: item.coins,
        exp: item.exp,
        farmLevel: item.farmLevel,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      })), null, 2);

      els.archiveExportText.value = exportText;
      els.archiveExportPanel.classList.remove("is-hidden");
      els.archiveExportText.focus();
      els.archiveExportText.select();

      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(exportText).then(() => {
          showToast("已复制标准库数据", "可以用于固化到网页文件里。", "good");
        }).catch(() => {
          showToast("已生成标准库数据", "复制下方文本即可。");
        });
      } else {
        showToast("已生成标准库数据", "复制下方文本即可。");
      }
    }

    function saveAnimalArchiveItemFromForm(event) {
      event.preventDefault();

      const editingId = els.animalArchiveEditingId.value;
      const name = els.animalArchiveName.value.trim();
      const farmLevel = readPositiveInteger(els.animalArchiveLevel.value);
      const purchasePrice = readNonNegativeNumber(els.animalPurchasePrice.value);
      const durationHours = Number(els.animalDuration.value);
      const feedCost = readNonNegativeNumber(els.animalFeedCost.value);
      const productSaleBase = readNonNegativeNumber(els.animalProductSaleBase.value);
      const recycleInput = els.animalRecyclePrice.value.trim();
      const recyclePrice = recycleInput ? readNonNegativeNumber(recycleInput) : (purchasePrice === null ? null : purchasePrice * 0.5);
      const exp = readNonNegativeNumber(els.animalExp.value);

      if (!name) {
        showToast("请填写动物名称", "名称会用于牧场栏位和动物收益对比。", "warn");
        return;
      }

      if (farmLevel === null || purchasePrice === null || feedCost === null || productSaleBase === null || recyclePrice === null || exp === null) {
        showToast("输入有误", "等级、价格、饲料费、产物售价、回收价格和经验都需要填写为有效数字。", "warn");
        return;
      }

      if (durationHours !== 16 && durationHours !== 20) {
        showToast("请选择成熟时间", "动物成熟时间目前只支持 16 小时或 20 小时。", "warn");
        return;
      }

      if (productSaleBase === 0 && exp === 0) {
        showToast("还没有收益数据", "至少填写产物出售总价或每轮经验中的一项。", "warn");
        return;
      }

      const duplicated = animalArchiveItems.some(item => item.id !== editingId && item.name === name);
      if (duplicated) {
        showToast("动物已存在", "档案库里已经有同名动物，可以直接编辑原档案。", "warn");
        return;
      }

      const now = Date.now();

      if (editingId) {
        const target = animalArchiveItems.find(item => item.id === editingId);
        if (!target) {
          resetAnimalArchiveForm();
          showToast("档案不存在", "当前编辑的动物已经被删除。", "warn");
          return;
        }

        Object.assign(target, {
          name,
          farmLevel,
          purchasePrice,
          durationHours,
          feedCost,
          productSaleBase,
          recyclePrice,
          exp,
          updatedAt: now
        });
        showToast("已更新动物档案", `${name} 的数据已更新。`, "good");
      } else {
        animalArchiveItems.push({
          id: `animal-${now}-${Math.random().toString(36).slice(2)}`,
          name,
          farmLevel,
          purchasePrice,
          durationHours,
          feedCost,
          productSaleBase,
          recyclePrice,
          exp,
          createdAt: now,
          updatedAt: now
        });
        showToast("已加入动物档案", `${name} 之后可以用于牧场栏位和动物收益对比。`, "good");
      }

      animalArchiveItems.sort((a, b) => a.createdAt - b.createdAt);
      saveAnimalArchiveItems();
      resetAnimalArchiveForm();
      renderAnimalArchive();
      renderAnimalValueArchiveOptions();
      renderAnimalValueCalculator();
      renderRanchHome();
      renderRanchPage();
    }

    function editAnimalArchiveItem(itemId) {
      const item = animalArchiveItems.find(archiveItem => archiveItem.id === itemId);
      if (!item) {
        showToast("档案不存在", "这条动物档案可能已经被删除。", "warn");
        return;
      }

      els.animalArchiveEditingId.value = item.id;
      els.animalArchiveName.value = item.name;
      els.animalArchiveLevel.value = item.farmLevel;
      els.animalPurchasePrice.value = item.purchasePrice;
      els.animalDuration.value = String(item.durationHours);
      els.animalFeedCost.value = item.feedCost;
      els.animalProductSaleBase.value = item.productSaleBase;
      els.animalRecyclePrice.value = item.recyclePrice;
      els.animalExp.value = item.exp;
      els.animalArchiveSaveBtn.textContent = "保存修改";
      els.animalArchiveCancelBtn.classList.remove("is-hidden");
      refreshCustomSelect(els.animalDuration);
      els.animalArchiveName.focus();
    }

    function deleteAnimalArchiveItem(itemId) {
      const item = animalArchiveItems.find(archiveItem => archiveItem.id === itemId);
      if (!item) return;

      const usedInCompare = animalCalculatorItems.some(compareItem => compareItem.archiveId === item.id);
      const usedInRanch = RANCH_GROUPS.some(meta => {
        const group = getRanchGroup(meta.key);
        const preferred = getPreferredRanchAnimal(meta.durationHours).animal;
        return group.count > 0 && preferred?.id === item.id;
      });
      const message = usedInCompare || usedInRanch
        ? `确认删除“${item.name}”吗？它也会从动物对比中移除；牧场会自动改用同档位下一条可用动物。`
        : `确认删除“${item.name}”吗？`;

      if (!confirm(message)) return;

      animalArchiveItems = animalArchiveItems.filter(archiveItem => archiveItem.id !== item.id);
      animalCalculatorItems = animalCalculatorItems.filter(compareItem => compareItem.archiveId !== item.id);

      if (calculatorOptions.animalBaselineId === item.id) {
        calculatorOptions.animalBaselineId = "";
        saveCalculatorOptions();
      }

      saveAnimalArchiveItems();
      saveAnimalCalculatorItems();
      saveRanchState();
      if (els.animalArchiveEditingId.value === item.id) resetAnimalArchiveForm();
      renderAnimalArchive();
      renderAnimalValueArchiveOptions();
      renderAnimalValueCalculator();
      renderRanchHome();
      renderRanchPage();
      showToast("已删除动物档案", `${item.name} 已从动物档案库移除。`);
    }

    function resetAnimalArchiveForm() {
      els.animalArchiveEditingId.value = "";
      els.animalArchiveName.value = "";
      els.animalArchiveLevel.value = "";
      els.animalPurchasePrice.value = "";
      els.animalDuration.value = "16";
      els.animalFeedCost.value = "3200";
      els.animalProductSaleBase.value = "";
      els.animalRecyclePrice.value = "";
      els.animalExp.value = "";
      els.animalArchiveSaveBtn.textContent = "保存动物档案";
      els.animalArchiveCancelBtn.classList.add("is-hidden");
      refreshCustomSelect(els.animalDuration);
    }

    function exportAnimalArchive() {
      if (!animalArchiveItems.length) {
        showToast("暂无动物档案可导出", "先录入动物档案后再导出标准库。", "warn");
        return;
      }

      const exportText = JSON.stringify(animalArchiveItems.map(item => ({
        id: item.id,
        name: item.name,
        farmLevel: item.farmLevel,
        purchasePrice: item.purchasePrice,
        durationHours: item.durationHours,
        feedCost: item.feedCost,
        productSaleBase: item.productSaleBase,
        recyclePrice: item.recyclePrice,
        exp: item.exp,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      })), null, 2);

      els.animalArchiveExportText.value = exportText;
      els.animalArchiveExportPanel.classList.remove("is-hidden");
      els.animalArchiveExportText.focus();
      els.animalArchiveExportText.select();

      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(exportText).then(() => {
          showToast("已复制动物标准库数据", "可以用于固化到网页文件里。", "good");
        }).catch(() => {
          showToast("已生成动物标准库数据", "复制下方文本即可。");
        });
      } else {
        showToast("已生成动物标准库数据", "复制下方文本即可。");
      }
    }

    function addCalculatorItem(event) {
      event.preventDefault();

      const archiveId = els.valueArchiveSelect.value;
      const archiveItem = cropArchiveItems.find(item => item.id === archiveId);

      if (!archiveItem || !isCropArchiveItemComputable(archiveItem) || archiveItem.farmLevel > plannerState.currentLevel) {
        showToast("暂无可用作物", "收益对比只使用当前居所等级可种的 Lv.6 及以上标准作物。", "warn");
        return;
      }

      if (calculatorItems.some(item => item.archiveId === archiveItem.id)) {
        showToast("已经在对比中", `${archiveItem.name} 已经加入当前对比。`, "warn");
        return;
      }

      calculatorItems.unshift({
        id: `value-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        archiveId: archiveItem.id,
        createdAt: Date.now()
      });

      saveCalculatorItems();
      renderCropArchive();
      renderValueCalculator();
      showToast("已加入对比", `${archiveItem.name} 已按 ${CROP_TYPES[archiveItem.cropKey].label} 的理论最短成熟时间计算。`, "good");
    }

    function clearCalculatorItems() {
      if (!calculatorItems.length) {
        showToast("暂无对比数据", "先从档案库选择作物后再清空。", "warn");
        return;
      }

      if (!confirm("确认清空所有作物性价比对比数据吗？")) return;
      calculatorItems = [];
      localStorage.removeItem(VALUE_CALCULATOR_KEY);
      renderCropArchive();
      renderValueCalculator();
      showToast("已清空对比", "可以重新从档案库选择作物。");
    }

    function deleteCalculatorItem(itemId) {
      const target = calculatorItems.find(item => item.id === itemId);
      const targetArchive = target?.archiveId ? cropArchiveItems.find(item => item.id === target.archiveId) : null;
      calculatorItems = calculatorItems.filter(item => item.id !== itemId);
      saveCalculatorItems();
      renderCropArchive();
      renderValueCalculator();
      if (target) showToast("已移除", `${targetArchive?.name || target.name || "该作物"} 已从对比中删除。`);
    }

    function addAnimalCalculatorItem(event) {
      event.preventDefault();

      const archiveId = els.valueAnimalArchiveSelect.value;
      const archiveItem = animalArchiveItems.find(item => item.id === archiveId);

      if (!archiveItem) {
        showToast("先录入动物档案", "动物收益对比会直接从档案库选择动物。", "warn");
        return;
      }

      if (animalCalculatorItems.some(item => item.archiveId === archiveItem.id)) {
        showToast("已经在对比中", `${archiveItem.name} 已经加入当前动物对比。`, "warn");
        return;
      }

      animalCalculatorItems.unshift({
        id: `animal-value-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        archiveId: archiveItem.id,
        createdAt: Date.now()
      });

      if (!calculatorOptions.animalBaselineId) {
        calculatorOptions.animalBaselineId = archiveItem.id;
        saveCalculatorOptions();
      }

      saveAnimalCalculatorItems();
      renderAnimalArchive();
      renderAnimalValueArchiveOptions();
      renderAnimalValueCalculator();
      showToast("已加入动物对比", `${archiveItem.name} 已按 ${formatDuration(getAnimalHarvestDuration(archiveItem), true)} 催产周期计算。`, "good");
    }

    function clearAnimalCalculatorItems() {
      if (!animalCalculatorItems.length) {
        showToast("暂无动物对比数据", "先从档案库选择动物后再清空。", "warn");
        return;
      }

      if (!confirm("确认清空所有动物性价比对比数据吗？")) return;
      animalCalculatorItems = [];
      calculatorOptions.animalBaselineId = "";
      localStorage.removeItem(ANIMAL_VALUE_CALCULATOR_KEY);
      saveCalculatorOptions();
      renderAnimalArchive();
      renderAnimalValueArchiveOptions();
      renderAnimalValueCalculator();
      showToast("已清空动物对比", "可以重新从档案库选择动物。");
    }

    function deleteAnimalCalculatorItem(itemId) {
      const target = animalCalculatorItems.find(item => item.id === itemId);
      const targetArchive = target?.archiveId ? animalArchiveItems.find(item => item.id === target.archiveId) : null;
      animalCalculatorItems = animalCalculatorItems.filter(item => item.id !== itemId);

      if (targetArchive && calculatorOptions.animalBaselineId === targetArchive.id) {
        calculatorOptions.animalBaselineId = animalCalculatorItems[0]?.archiveId || "";
        saveCalculatorOptions();
      }

      saveAnimalCalculatorItems();
      renderAnimalArchive();
      renderAnimalValueArchiveOptions();
      renderAnimalValueCalculator();
      if (target) showToast("已移除", `${targetArchive?.name || "该动物"} 已从动物对比中删除。`);
    }

    function readDurationInputs(hoursInput, minutesInput) {
      const hours = readNonNegativeInteger(hoursInput.value);
      const minutes = readNonNegativeInteger(minutesInput.value);
      if (hours === null || minutes === null) return null;
      return (hours * 60 + minutes) * MINUTE;
    }

    function readNonNegativeInteger(value) {
      if (value === "") return 0;
      const next = Number(value);
      if (!Number.isFinite(next) || next < 0 || !Number.isInteger(next)) return null;
      return next;
    }

    function readNonNegativeNumber(value) {
      if (value === "") return 0;
      const next = Number(value);
      if (!Number.isFinite(next) || next < 0) return null;
      return next;
    }

    function readPositiveInteger(value) {
      if (value === "") return null;
      const next = Number(value);
      if (!Number.isFinite(next) || next < 1 || !Number.isInteger(next)) return null;
      return next;
    }

    function renderCropArchive() {
      if (!els.archiveSummaryText || !els.archiveList) return;
      const currentLevel = plannerState.currentLevel;
      const availableItems = sortCropArchiveItems(cropArchiveItems.filter(item => item.farmLevel <= currentLevel));
      const lockedItems = sortCropArchiveItems(cropArchiveItems.filter(item => item.farmLevel > currentLevel));
      const computableCount = getComputableCropArchiveItems().length;

      els.archiveSummaryText.textContent = cropArchiveItems.length
        ? `标准库共 ${cropArchiveItems.length} 种作物；当前 Lv.${formatNumber(currentLevel)} 可查看 ${availableItems.length} 种，${computableCount} 种可参与计算。`
        : "还没有录入作物。";

      if (!cropArchiveItems.length) {
        els.archiveList.innerHTML = `
          <div class="value-empty">
            <strong>标准作物库为空</strong>
            <span>作物档案现在由代码维护，发布后会成为所有计算和规划的唯一来源。</span>
          </div>
        `;
        return;
      }

      els.archiveList.innerHTML = `
        <div class="archive-section">
          <div class="archive-section-head">
            <h3>当前等级可用作物</h3>
            <span>按等级从高到低排序</span>
          </div>
          ${availableItems.length
            ? availableItems.map(item => renderCropArchiveItem(item, "available")).join("")
            : `<div class="value-empty"><strong>当前等级暂无可用作物</strong><span>提高居所等级后会在这里显示标准库作物。</span></div>`}
        </div>
        ${lockedItems.length ? `
          <details class="archive-section archive-locked-section">
            <summary>查看更高等级作物（${formatNumber(lockedItems.length)} 种）</summary>
            <div class="archive-locked-list">
              ${lockedItems.map(item => renderCropArchiveItem(item, "locked")).join("")}
            </div>
          </details>
        ` : ""}
      `;
    }

    function renderCropArchiveItem(item, status) {
      const meta = getCropArchiveMeta(item);
      const inCompare = isCropArchiveItemComputable(item) && calculatorItems.some(compareItem => compareItem.archiveId === item.id);
      const cropStallCoins = item.coins * getCropStallMultiplier();
      const statusBadge = item.archiveOnly
        ? `<span class="archive-badge archive-badge-warn">仅档案</span>`
        : status === "locked"
          ? `<span class="archive-badge archive-badge-blue">未解锁</span>`
          : `<span class="archive-badge">可计算</span>`;

      return `
        <article class="archive-item crop-archive-item">
          <div class="archive-main">
            <div class="archive-icon">${escapeHtml(meta.icon)}</div>
            <div>
              <div class="archive-title-row">
                <h3>${escapeHtml(item.name)}</h3>
                ${statusBadge}
                ${inCompare ? `<span class="archive-badge archive-badge-blue">对比中</span>` : ""}
              </div>
              <div class="archive-meta">
                <span>${escapeHtml(meta.short)}</span>
                <span>Lv.${formatNumber(item.farmLevel)}</span>
                <span>产量 ${formatNumber(item.yieldCount)}</span>
                <span>${formatNumber(item.exp)} 经验</span>
                <span>种子 ${formatNumber(item.seedCost)} 百工币</span>
                <span>满级基准单价 ${formatNumber(item.basePriceMax)}</span>
              </div>
              <div class="archive-meta archive-profit-meta">
                <span>基准收益 ${formatNumber(item.coins)} 百工币/田</span>
                <span>菜摊参考 Lv.${formatNumber(plannerState.cropStallLevel)}：${formatNumber(cropStallCoins)} 百工币/田</span>
              </div>
            </div>
          </div>
        </article>
      `;
    }

    function getCropArchiveMeta(item) {
      const crop = CROP_TYPES[item.cropKey];
      if (crop) {
        return {
          icon: crop.icon,
          short: `${crop.short} · ${formatDuration(crop.minutes * MINUTE, true)}`
        };
      }

      return {
        icon: item.icon || "🌱",
        short: item.durationLabel || (item.durationMinutes ? formatDuration(item.durationMinutes * MINUTE, true) : "档案作物")
      };
    }

    function renderAnimalArchive() {
      if (!els.animalArchiveSummaryText || !els.animalArchiveList) return;
      els.animalArchiveSummaryText.textContent = animalArchiveItems.length
        ? `已收录 ${animalArchiveItems.length} 种动物。`
        : "还没有录入动物。";

      if (!animalArchiveItems.length) {
        els.animalArchiveList.innerHTML = `
          <div class="value-empty">
            <strong>先保存一条动物档案</strong>
            <span>动物档案会成为牧场栏位和动物收益对比的来源。</span>
          </div>
        `;
        return;
      }

      els.animalArchiveList.innerHTML = animalArchiveItems.map(item => {
        const inCompare = animalCalculatorItems.some(compareItem => compareItem.archiveId === item.id);
        const inRanch = RANCH_GROUPS.some(meta => {
          const group = getRanchGroup(meta.key);
          const preferred = getPreferredRanchAnimal(meta.durationHours).animal;
          return group.count > 0 && preferred?.id === item.id;
        });
        const economy = getAnimalEconomy(item);
        return `
          <article class="archive-item">
            <div class="archive-main">
              <div class="archive-icon">🐮</div>
              <div>
                <div class="archive-title-row">
                  <h3>${escapeHtml(item.name)}</h3>
                  ${inCompare ? `<span class="archive-badge">对比中</span>` : ""}
                  ${inRanch ? `<span class="archive-badge archive-badge-blue">牧场采用</span>` : ""}
                </div>
                <div class="archive-meta">
                  <span>${getAnimalDurationLabel(item)}</span>
                  <span>Lv.${formatNumber(item.farmLevel)}</span>
                  <span>购买 ${formatNumber(item.purchasePrice)} 百工币</span>
                  <span>回收 ${formatNumber(item.recyclePrice)} 百工币</span>
                  <span>饲料 ${formatNumber(item.feedCost)}</span>
                  <span>产物原价 ${formatNumber(item.productSaleBase)}</span>
                  <span>当前净收益 ${formatNumber(economy.netCoins)} /轮</span>
                  <span>${formatNumber(item.exp)} 经验</span>
                </div>
              </div>
            </div>
            <div class="archive-item-actions">
              <button class="mini-btn neutral" type="button" data-animal-archive-edit="${escapeHtml(item.id)}">编辑</button>
              <button class="mini-btn" type="button" data-animal-archive-delete="${escapeHtml(item.id)}">删除</button>
            </div>
          </article>
        `;
      }).join("");
    }

    function renderAnimalValueArchiveOptions() {
      if (!els.valueAnimalArchiveSelect) return;

      if (!animalArchiveItems.length) {
        els.valueAnimalArchiveSelect.innerHTML = `<option value="">先录入动物档案</option>`;
        if (els.valueAnimalBaselineSelect) {
          els.valueAnimalBaselineSelect.innerHTML = `<option value="">暂无基准动物</option>`;
        }
        refreshCustomSelect(els.valueAnimalArchiveSelect);
        refreshCustomSelect(els.valueAnimalBaselineSelect);
        return;
      }

      const currentValue = els.valueAnimalArchiveSelect.value;
      els.valueAnimalArchiveSelect.innerHTML = animalArchiveItems.map(item => {
        const meta = [
          getAnimalDurationLabel(item),
          `Lv.${item.farmLevel}`,
          `${formatNumber(item.exp)}经验`,
          `净${formatNumber(getAnimalEconomy(item).netCoins)}百工币/轮`
        ].join(" · ");
        return `<option value="${escapeHtml(item.id)}" data-icon="🐮">${escapeHtml(item.name)} · ${escapeHtml(meta)}</option>`;
      }).join("");

      if (animalArchiveItems.some(item => item.id === currentValue)) {
        els.valueAnimalArchiveSelect.value = currentValue;
      } else {
        els.valueAnimalArchiveSelect.value = animalArchiveItems[0].id;
      }

      if (els.valueAnimalBaselineSelect) {
        const comparedAnimals = animalCalculatorItems
          .map(item => animalArchiveItems.find(archive => archive.id === item.archiveId))
          .filter(Boolean);

        els.valueAnimalBaselineSelect.innerHTML = comparedAnimals.length
          ? [
              `<option value="">不设基准</option>`,
              ...comparedAnimals.map(item => `<option value="${escapeHtml(item.id)}" data-icon="🐮">${escapeHtml(item.name)} · ${getAnimalDurationLabel(item)}</option>`)
            ].join("")
          : `<option value="">先加入动物对比</option>`;

        if (comparedAnimals.some(item => item.id === calculatorOptions.animalBaselineId)) {
          els.valueAnimalBaselineSelect.value = calculatorOptions.animalBaselineId;
        } else {
          els.valueAnimalBaselineSelect.value = comparedAnimals[0]?.id || "";
          calculatorOptions.animalBaselineId = els.valueAnimalBaselineSelect.value;
          saveCalculatorOptions();
        }
      }

      refreshCustomSelect(els.valueAnimalArchiveSelect);
      refreshCustomSelect(els.valueAnimalBaselineSelect);
    }

    function getAnimalArchiveById(animalId) {
      return animalArchiveItems.find(item => item.id === animalId) || null;
    }

    function getRanchGroupMeta(groupKey) {
      return RANCH_GROUPS.find(group => group.key === groupKey) || null;
    }

    function getPreferredRanchAnimal(durationHours) {
      const currentLevel = Math.max(1, Number(plannerState.currentLevel) || 1);
      const candidates = animalArchiveItems.filter(item => item.durationHours === durationHours);
      if (!candidates.length) {
        return { animal: null, levelLimited: false, currentLevel };
      }

      const eligible = candidates.filter(item => item.farmLevel <= currentLevel);
      const pool = eligible.length ? eligible : candidates;
      const animal = [...pool].sort((a, b) => compareRanchAnimalPreference(a, b, durationHours))[0] || null;
      return {
        animal,
        levelLimited: !eligible.length,
        currentLevel
      };
    }

    function compareRanchAnimalPreference(a, b, durationHours) {
      if (b.farmLevel !== a.farmLevel) return b.farmLevel - a.farmLevel;
      if (durationHours === 16) {
        return b.exp - a.exp
          || getAnimalEconomy(b).netCoins - getAnimalEconomy(a).netCoins
          || a.createdAt - b.createdAt;
      }
      return getAnimalEconomy(b).netCoins - getAnimalEconomy(a).netCoins
        || b.exp - a.exp
        || a.createdAt - b.createdAt;
    }

    function getAnimalDurationLabel(animal) {
      return animal.durationHours === 20 ? "20小时高金币" : "16小时高经验";
    }

    function getAnimalHarvestDuration(animal) {
      return animal.durationHours * HOUR * 0.75;
    }

    function getCropStallMultiplier(stallLevel = plannerState.cropStallLevel) {
      const level = Math.max(1, Number(stallLevel) || 1);
      return 1 + (level - 1) * 0.05;
    }

    function getAnimalStallMultiplier(stallLevel = ranchState.stallLevel) {
      const level = Math.max(1, Number(stallLevel) || 1);
      return 1 + (level - 1) * 0.05;
    }

    function getAnimalEconomy(animal, stallLevel = ranchState.stallLevel) {
      const stallMultiplier = getAnimalStallMultiplier(stallLevel);
      const productSale = animal.productSaleBase * stallMultiplier;
      const netCoins = productSale - animal.feedCost;
      const paybackCost = Math.max(0, animal.purchasePrice - animal.recyclePrice);
      const paybackCycles = netCoins > 0 ? paybackCost / netCoins : Infinity;
      const harvestDuration = getAnimalHarvestDuration(animal);

      return {
        stallMultiplier,
        productSale,
        netCoins,
        paybackCost,
        paybackCycles,
        paybackTime: Number.isFinite(paybackCycles) ? paybackCycles * harvestDuration : Infinity,
        harvestDuration,
        expPerHour: harvestDuration > 0 ? animal.exp / (harvestDuration / HOUR) : animal.exp,
        netCoinsPerHour: harvestDuration > 0 ? netCoins / (harvestDuration / HOUR) : netCoins
      };
    }

    function formatAnimalPayback(row) {
      if (!Number.isFinite(row.paybackCycles)) return "无法回本";
      if (row.paybackCycles <= 0) return "已覆盖";
      return `${formatNumber(row.paybackCycles)} 轮 · ${formatDuration(row.paybackTime, true)}`;
    }

    function getAnimalSwitchInfo(target, baseline) {
      if (!target || !baseline || target.archiveId === baseline.archiveId) {
        return null;
      }

      const investmentDelta = target.paybackCost - baseline.paybackCost;
      const hourlyDelta = target.netCoinsPerHour - baseline.netCoinsPerHour;
      const sameCycle = Math.abs(target.harvestDuration - baseline.harvestDuration) < MINUTE;
      const cycleDelta = target.netCoins - baseline.netCoins;
      const basisDelta = sameCycle ? cycleDelta : hourlyDelta;

      if (basisDelta <= 0) {
        return {
          target,
          baseline,
          sameCycle,
          investmentDelta,
          cycleDelta,
          hourlyDelta,
          canCatchUp: false,
          reason: "目标动物单位时间净收益不高，百工币累计收益不会跑赢基准。"
        };
      }

      if (investmentDelta <= 0) {
        return {
          target,
          baseline,
          sameCycle,
          investmentDelta,
          cycleDelta,
          hourlyDelta,
          canCatchUp: true,
          catchupCycles: 0,
          catchupTime: 0,
          completeCycles: 0,
          completeTime: 0,
          baselineSaveCycles: 0,
          baselineSaveTime: 0,
          immediate: true
        };
      }

      const catchupTime = sameCycle
        ? (investmentDelta / cycleDelta) * target.harvestDuration
        : investmentDelta / (hourlyDelta / HOUR);
      const catchupCycles = catchupTime / target.harvestDuration;
      const completeCycles = Math.ceil(catchupCycles);
      const completeTime = completeCycles * target.harvestDuration;
      const baselineSaveTime = baseline.netCoinsPerHour > 0
        ? investmentDelta / (baseline.netCoinsPerHour / HOUR)
        : Infinity;

      return {
        target,
        baseline,
        sameCycle,
        investmentDelta,
        cycleDelta,
        hourlyDelta,
        canCatchUp: true,
        catchupCycles,
        catchupTime,
        completeCycles,
        completeTime,
        baselineSaveCycles: baselineSaveTime / baseline.harvestDuration,
        baselineSaveTime,
        immediate: false
      };
    }

    function getBestAnimalSwitchInfo(rows, baseline) {
      if (!baseline) return null;
      return rows
        .filter(row => row.archiveId !== baseline.archiveId)
        .map(row => getAnimalSwitchInfo(row, baseline))
        .filter(Boolean)
        .sort((a, b) => {
          if (a.canCatchUp !== b.canCatchUp) return a.canCatchUp ? -1 : 1;
          if (a.immediate !== b.immediate) return a.immediate ? -1 : 1;
          return (a.catchupTime || Infinity) - (b.catchupTime || Infinity) || b.hourlyDelta - a.hourlyDelta;
        })[0] || null;
    }

    function formatAnimalSwitchTable(info) {
      if (!info) return `<div class="value-muted">选择基准后比较</div>`;
      if (!info.canCatchUp) {
        return `
          <div class="value-muted">不会跑赢</div>
          <div class="value-muted">${info.sameCycle ? `${formatNumber(info.cycleDelta)} 百工币/轮` : `${formatNumber(info.hourlyDelta)} 百工币/小时`}</div>
        `;
      }
      if (info.immediate) {
        return `
          <div>立即占优</div>
          <div class="value-muted">净投入少 ${formatNumber(Math.abs(info.investmentDelta))}</div>
        `;
      }
      return `
        <div>${formatNumber(info.catchupCycles)} 轮 · ${formatDuration(info.catchupTime)}</div>
        <div class="value-muted">完整 ${formatNumber(info.completeCycles)} 轮 · ${formatDuration(info.completeTime, true)}</div>
        <div class="value-muted">额外净投入 ${formatNumber(info.investmentDelta)}</div>
      `;
    }

    function renderAnimalSwitchNote(info) {
      if (!info) return "";
      if (!info.canCatchUp) {
        return `
          <div class="value-cycle-note animal-switch-note">
            <strong>换养模型：${escapeHtml(info.baseline.name)} → ${escapeHtml(info.target.name)}</strong>
            <span>${escapeHtml(info.reason)}</span>
          </div>
        `;
      }
      if (info.immediate) {
        return `
          <div class="value-cycle-note animal-switch-note">
            <strong>换养模型：${escapeHtml(info.baseline.name)} → ${escapeHtml(info.target.name)}</strong>
            <span>${escapeHtml(info.target.name)} 的净投入不高于 ${escapeHtml(info.baseline.name)}，且单位时间净收益更高；从百工币累计净收益看可以直接换。</span>
          </div>
        `;
      }

      const gainText = info.sameCycle
        ? `每轮多赚 ${formatNumber(info.cycleDelta)} 百工币`
        : `每小时多赚 ${formatNumber(info.hourlyDelta)} 百工币`;
      const saveText = Number.isFinite(info.baselineSaveTime)
        ? `如果先继续养 ${escapeHtml(info.baseline.name)} 来攒这笔额外净投入，大约需要 ${formatNumber(info.baselineSaveCycles)} 轮（${formatDuration(info.baselineSaveTime)}），实际按完整收获约 ${formatNumber(Math.ceil(info.baselineSaveCycles))} 轮。`
        : "";

      return `
        <div class="value-cycle-note animal-switch-note">
          <strong>换养模型：${escapeHtml(info.baseline.name)} → ${escapeHtml(info.target.name)}</strong>
          <span>${escapeHtml(info.target.name)} 需要多承担 ${formatNumber(info.investmentDelta)} 百工币净投入，${gainText}；理论交叉点是 ${formatNumber(info.catchupCycles)} 轮（${formatDuration(info.catchupTime)}），游戏里按完整收获约 ${formatNumber(info.completeCycles)} 轮（${formatDuration(info.completeTime, true)}）。${saveText}</span>
        </div>
      `;
    }

    function getElapsedForSelfWaterReduction(cropKey, reductionMs) {
      const rule = cropRule(cropKey);
      const tolerance = MINUTE;

      if (reductionMs < rule.minSelfReduce - tolerance || reductionMs > rule.maxSelfReduce + tolerance) {
        return null;
      }

      const normalizedReduction = clamp(reductionMs, rule.minSelfReduce, rule.maxSelfReduce);
      const progress = clamp(
        (normalizedReduction - rule.minSelfReduce) / (rule.maxSelfReduce - rule.minSelfReduce),
        0,
        1
      );

      return rule.firstNextInterval + progress * (rule.maxInterval - rule.firstNextInterval);
    }

    function getCalculatorRows() {
      const sunbin = calculatorOptions.sunbin === true;
      const baseRows = calculatorItems
        .map(item => {
          if (item.archiveId) {
            const archiveItem = cropArchiveItems.find(archive => archive.id === item.archiveId);
            if (!archiveItem || !isCropArchiveItemComputable(archiveItem) || archiveItem.farmLevel > plannerState.currentLevel) return null;
            return {
              id: item.id,
              archiveId: item.archiveId,
              name: archiveItem.name,
              cropKey: archiveItem.cropKey,
              exp: archiveItem.exp,
              coins: archiveItem.coins,
              farmLevel: archiveItem.farmLevel,
              createdAt: item.createdAt
            };
          }

          return item && CROP_TYPES[item.cropKey] ? item : null;
        })
        .filter(Boolean)
        .map(item => {
          const duration = getTheoreticalFastestDuration(item.cropKey, { sunbin });
          const normalDuration = getTheoreticalFastestDuration(item.cropKey);
          const originalDuration = CROP_TYPES[item.cropKey].minutes * MINUTE;
          const hours = duration / HOUR;
          const normalHours = normalDuration / HOUR;
          return {
            ...item,
            crop: CROP_TYPES[item.cropKey],
            duration,
            normalDuration,
            originalDuration,
            sunbinReduction: sunbin ? originalDuration * 0.5 : 0,
            expPerHour: hours > 0 ? item.exp / hours : item.exp,
            coinsPerHour: hours > 0 ? item.coins / hours : item.coins,
            normalExpPerHour: normalHours > 0 ? item.exp / normalHours : item.exp,
            normalCoinsPerHour: normalHours > 0 ? item.coins / normalHours : item.coins
          };
        });

      if (!sunbin || !baseRows.length) {
        return baseRows.map(row => ({
          ...row,
          cycleWindow: row.duration,
          cycleFallbackDuration: 0,
          cycleExp: row.exp,
          cycleCoins: row.coins,
          cycleExpPerHour: row.expPerHour,
          cycleCoinsPerHour: row.coinsPerHour,
          timeSaved: Math.max(0, row.normalDuration - row.duration)
        }));
      }

      const cycleWindow = Math.max(...baseRows.map(row => row.duration));
      const cycleHours = cycleWindow / HOUR;

      return baseRows.map(row => {
        const cycleFallbackDuration = Math.max(0, cycleWindow - row.duration);
        const fallbackHours = cycleFallbackDuration / HOUR;
        const cycleExp = row.exp + row.normalExpPerHour * fallbackHours;
        const cycleCoins = row.coins + row.normalCoinsPerHour * fallbackHours;

        return {
          ...row,
          cycleWindow,
          cycleFallbackDuration,
          cycleExp,
          cycleCoins,
          cycleExpPerHour: cycleHours > 0 ? cycleExp / cycleHours : cycleExp,
          cycleCoinsPerHour: cycleHours > 0 ? cycleCoins / cycleHours : cycleCoins,
          timeSaved: Math.max(0, row.normalDuration - row.duration)
        };
      });
    }

    function sortCalculatorRows(rows) {
      const sort = els.valueSort.value;
      return [...rows].sort((a, b) => {
        if (sort === "coins") return b.coinsPerHour - a.coinsPerHour || b.expPerHour - a.expPerHour || a.duration - b.duration;
        if (sort === "cycleExp") return b.cycleExp - a.cycleExp || b.cycleExpPerHour - a.cycleExpPerHour || a.duration - b.duration;
        if (sort === "cycleCoins") return b.cycleCoins - a.cycleCoins || b.cycleCoinsPerHour - a.cycleCoinsPerHour || a.duration - b.duration;
        if (sort === "time") return a.duration - b.duration || b.expPerHour - a.expPerHour || b.coinsPerHour - a.coinsPerHour;
        if (sort === "input") return b.createdAt - a.createdAt;
        return b.expPerHour - a.expPerHour || b.coinsPerHour - a.coinsPerHour || a.duration - b.duration;
      });
    }

    function getBestRow(rows, field, preferLow = false) {
      if (!rows.length) return null;
      return rows.reduce((best, row) => {
        if (!best) return row;
        return preferLow ? (row[field] < best[field] ? row : best) : (row[field] > best[field] ? row : best);
      }, null);
    }

    function renderValueCalculator() {
      if (!els.valueSummaryText || !els.valueSummary || !els.valueResults || !els.valueSort) return;
      const rows = getCalculatorRows();
      const sortedRows = sortCalculatorRows(rows);
      const sortLabels = {
        exp: "经验效率优先",
        coins: "百工币效率优先",
        cycleExp: "孙膑周期经验总收益",
        cycleCoins: "孙膑周期百工币总收益",
        time: "成熟时间最短",
        input: "录入顺序"
      };

      if (!rows.length) {
        els.valueSummaryText.textContent = "还没有选择作物。";
        els.valueSummary.innerHTML = "";
        els.valueResults.innerHTML = `
          <div class="value-empty">
            <strong>先从档案库加入作物</strong>
            <span>工具会读取档案里的成熟时间、经验、百工币和居所等级，再换算每小时收益。</span>
          </div>
        `;
        return;
      }

      const bestExp = getBestRow(rows, "expPerHour");
      const bestCoins = getBestRow(rows, "coinsPerHour");
      const fastest = getBestRow(rows, "duration", true);
      const bestCycleExp = getBestRow(rows, "cycleExp");
      const bestCycleCoins = getBestRow(rows, "cycleCoins");
      const bestSavedTime = getBestRow(rows, "timeSaved");
      const sunbinMode = calculatorOptions.sunbin === true;
      const cycleWindow = sunbinMode ? Math.max(...rows.map(row => row.cycleWindow)) : 0;
      const modeText = calculatorOptions.sunbin === true ? "孙膑催熟后" : "普通理论最短";

      els.valueSummaryText.textContent = sunbinMode
        ? `已加入 ${rows.length} 种作物，当前按“${sortLabels[els.valueSort.value] || "经验效率优先"}”排列。孙膑周期窗口：${formatDuration(cycleWindow)}。`
        : `已加入 ${rows.length} 种作物，当前按“${sortLabels[els.valueSort.value] || "经验效率优先"}”排列，计算模式：${modeText}。`;
      els.valueSummary.innerHTML = sunbinMode
        ? `
          ${renderValueRank("周期经验总收益最高", bestCycleExp, `${formatNumber(bestCycleExp.cycleExp)} 经验`)}
          ${renderValueRank("周期百工币总收益最高", bestCycleCoins, `${formatNumber(bestCycleCoins.cycleCoins)} 百工币`)}
          ${renderValueRank("孙膑省时最多", bestSavedTime, `节省 ${formatDuration(bestSavedTime.timeSaved, true)}`)}
        `
        : `
          ${renderValueRank("经验效率最高", bestExp, `${formatNumber(bestExp.expPerHour)} 经验/小时`)}
          ${renderValueRank("百工币效率最高", bestCoins, `${formatNumber(bestCoins.coinsPerHour)} 百工币/小时`)}
          ${renderValueRank(modeText, fastest, formatDuration(fastest.duration))}
        `;

      els.valueResults.innerHTML = `
        ${sunbinMode ? `
          <div class="value-cycle-note">
            <strong>孙膑周期总收益</strong>
            <span>以最长的孙膑后成熟时间 ${formatDuration(cycleWindow)} 作为共同窗口；短周期作物成熟后，剩余时间按同作物普通理论效率折算。</span>
          </div>
        ` : ""}
        <div class="value-table-wrap">
          <table class="value-table">
            <thead>
              <tr>
                <th>作物</th>
                <th>成熟时间</th>
                <th>理论最短</th>
                <th>经验效率</th>
                <th>百工币效率</th>
                ${sunbinMode ? `<th>孙膑周期收益</th>` : ""}
                <th>一块田基准收益</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${sortedRows.map((row, index) => `
                <tr>
                  <td>
                    <div class="value-name">${escapeHtml(row.name)}</div>
                    <div class="value-muted">#${index + 1} · ${row.crop.short} · Lv.${formatNumber(row.farmLevel || 1)}</div>
                  </td>
                  <td>${formatDuration(row.crop.minutes * MINUTE, true)}</td>
                  <td>
                    <strong>${formatDuration(row.duration)}</strong>
                    ${row.sunbinReduction > 0 ? `<div class="value-muted">孙膑固定减 ${formatDuration(row.sunbinReduction, true)}</div>` : ""}
                    ${sunbinMode ? `<div class="value-muted">普通最短 ${formatDuration(row.normalDuration, true)}</div>` : ""}
                  </td>
                  <td>${formatNumber(row.expPerHour)} /小时</td>
                  <td>${formatNumber(row.coinsPerHour)} /小时</td>
                  ${sunbinMode ? `
                    <td>
                      <div>${formatNumber(row.cycleExp)} 经验</div>
                      <div class="value-muted">${formatNumber(row.cycleCoins)} 百工币</div>
                      <div class="value-muted">${row.cycleFallbackDuration > 0 ? `余时普通 ${formatDuration(row.cycleFallbackDuration, true)}` : "全程孙膑作物"}</div>
                    </td>
                  ` : ""}
                  <td>
                    <div>${formatNumber(row.exp)} 经验</div>
                    <div class="value-muted">${formatNumber(row.coins)} 百工币</div>
                  </td>
                  <td><button class="mini-btn" type="button" data-value-delete="${row.id}">删除</button></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;
    }

    function getAnimalCalculatorRows() {
      const baselineId = calculatorOptions.animalBaselineId || "";
      const rows = animalCalculatorItems
        .map(item => {
          const archiveItem = animalArchiveItems.find(archive => archive.id === item.archiveId);
          if (!archiveItem) return null;
          const economy = getAnimalEconomy(archiveItem);
          return {
            ...archiveItem,
            compareId: item.id,
            archiveId: archiveItem.id,
            createdAt: item.createdAt,
            ...economy
          };
        })
        .filter(Boolean);
      const baseline = rows.find(row => row.archiveId === baselineId) || rows[0] || null;

      return rows.map(row => ({
        ...row,
        baselineExpDelta: baseline && baseline.durationHours === row.durationHours ? row.exp - baseline.exp : null,
        baselineName: baseline?.name || ""
      }));
    }

    function sortAnimalCalculatorRows(rows) {
      const sort = els.valueAnimalSort?.value || "exp";
      return [...rows].sort((a, b) => {
        if (sort === "netCoins") return b.netCoins - a.netCoins || b.netCoinsPerHour - a.netCoinsPerHour || a.harvestDuration - b.harvestDuration;
        if (sort === "payback") return a.paybackCycles - b.paybackCycles || b.netCoins - a.netCoins || b.expPerHour - a.expPerHour;
        if (sort === "duration") return a.harvestDuration - b.harvestDuration || b.expPerHour - a.expPerHour || b.netCoins - a.netCoins;
        if (sort === "input") return b.createdAt - a.createdAt;
        return b.expPerHour - a.expPerHour || b.exp - a.exp || b.netCoins - a.netCoins;
      });
    }

    function renderAnimalValueCalculator() {
      if (!els.valueAnimalSummaryText || !els.valueAnimalSummary || !els.valueAnimalResults) return;
      const rows = getAnimalCalculatorRows();
      const sortedRows = sortAnimalCalculatorRows(rows);
      const baseline = rows.find(row => row.archiveId === calculatorOptions.animalBaselineId) || rows[0] || null;
      const stallMultiplier = getAnimalStallMultiplier();
      const sortLabels = {
        exp: "经验效率优先",
        netCoins: "每轮净百工币优先",
        payback: "回本最快",
        duration: "催产收获最短",
        input: "录入顺序"
      };

      if (!rows.length) {
        els.valueAnimalSummaryText.textContent = "还没有选择动物。";
        els.valueAnimalSummary.innerHTML = "";
        els.valueAnimalResults.innerHTML = `
          <div class="value-empty">
            <strong>先从档案库加入动物</strong>
            <span>工具会读取动物购买价、回收价、饲料费、产物售价、经验和牧场动物摊等级。</span>
          </div>
        `;
        return;
      }

      const bestExp = getBestRow(rows, "expPerHour");
      const bestNet = getBestRow(rows, "netCoins");
      const bestPayback = rows.filter(row => Number.isFinite(row.paybackCycles)).sort((a, b) => a.paybackCycles - b.paybackCycles)[0] || null;
      const bestSwitch = getBestAnimalSwitchInfo(rows, baseline);

      els.valueAnimalSummaryText.textContent = `已加入 ${rows.length} 种动物，当前按“${sortLabels[els.valueAnimalSort?.value] || "经验效率优先"}”排列；动物摊 Lv.${formatNumber(ranchState.stallLevel)}，产物售价倍率 ${formatNumber(stallMultiplier)}。`;
      els.valueAnimalSummary.innerHTML = `
        ${renderValueRank("经验效率最高", bestExp, `${formatNumber(bestExp.expPerHour)} 经验/小时`)}
        ${renderValueRank("每轮净收益最高", bestNet, `${formatNumber(bestNet.netCoins)} 百工币/轮`)}
        ${renderValueRank("回本最快", bestPayback, bestPayback ? formatAnimalPayback(bestPayback) : "暂无可回本动物")}
        ${renderValueRank("换养追平", bestSwitch?.canCatchUp ? bestSwitch.target : null, bestSwitch?.canCatchUp ? (bestSwitch.immediate ? "立即占优" : `${formatNumber(bestSwitch.catchupCycles)} 轮 · ${formatDuration(bestSwitch.catchupTime, true)}`) : "暂无可追平方案")}
      `;

      els.valueAnimalResults.innerHTML = `
        ${renderAnimalSwitchNote(bestSwitch)}
        <div class="value-cycle-note animal-value-note">
          <strong>动物对比口径</strong>
          <span>催产收获时间为原始成熟时间的 3/4；换养追平按“目标动物净投入 - 基准动物净投入”作为额外成本，再用单位时间净收益差推算累计百工币跑赢时间。</span>
        </div>
        <div class="value-table-wrap">
          <table class="value-table animal-value-table">
            <thead>
              <tr>
                <th>动物</th>
                <th>催产周期</th>
                <th>摊位后售价</th>
                <th>每轮净收益</th>
                <th>经验效率</th>
                <th>回本周期</th>
                <th>换养追平</th>
                <th>基准经验差</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${sortedRows.map((row, index) => `
                ${(() => {
                  const switchInfo = baseline && row.archiveId !== baseline.archiveId ? getAnimalSwitchInfo(row, baseline) : null;
                  return `
                <tr>
                  <td>
                    <div class="value-name">${escapeHtml(row.name)}</div>
                    <div class="value-muted">#${index + 1} · ${getAnimalDurationLabel(row)} · Lv.${formatNumber(row.farmLevel)}</div>
                  </td>
                  <td>
                    <strong>${formatDuration(row.harvestDuration, true)}</strong>
                    <div class="value-muted">原始 ${formatDuration(row.durationHours * HOUR, true)}</div>
                  </td>
                  <td>
                    <div>${formatNumber(row.productSale)} 百工币</div>
                    <div class="value-muted">原价 ${formatNumber(row.productSaleBase)} × ${formatNumber(row.stallMultiplier)}</div>
                  </td>
                  <td>
                    <div>${formatNumber(row.netCoins)} 百工币</div>
                    <div class="value-muted">饲料 -${formatNumber(row.feedCost)}</div>
                  </td>
                  <td>
                    <div>${formatNumber(row.expPerHour)} /小时</div>
                    <div class="value-muted">${formatNumber(row.exp)} 经验/轮</div>
                  </td>
                  <td>
                    <div>${formatAnimalPayback(row)}</div>
                    <div class="value-muted">净投入 ${formatNumber(row.paybackCost)}</div>
                  </td>
                  <td>
                    ${baseline && row.archiveId === baseline.archiveId
                      ? `<div>基准动物</div>`
                      : formatAnimalSwitchTable(switchInfo)}
                  </td>
                  <td>
                    ${baseline && row.archiveId === baseline.archiveId
                      ? `<div>基准动物</div>`
                      : row.baselineExpDelta === null
                        ? `<div class="value-muted">与${escapeHtml(row.baselineName || "基准")}不同周期</div>`
                        : `<div>${row.baselineExpDelta >= 0 ? "+" : ""}${formatNumber(row.baselineExpDelta)} 经验/轮</div>`}
                  </td>
                  <td><button class="mini-btn" type="button" data-animal-value-delete="${row.compareId}">删除</button></td>
                </tr>
                  `;
                })()}
              `).join("")}
            </tbody>
          </table>
        </div>
      `;
    }

    function renderValueRank(label, row, value) {
      const hasValue = row && (value !== "0 经验/小时" && value !== "0 百工币/小时");
      return `
        <div class="value-rank">
          <span>${label}</span>
          <strong>${row ? escapeHtml(row.name) : "暂无数据"}</strong>
          <small>${hasValue ? value : "暂无有效收益"}</small>
        </div>
      `;
    }

    function renderPlanner() {
      if (!els.plannerArea) return;
      normalizePlannerProgress();

      if (!plannerState.active) {
        els.plannerArea.innerHTML = `
          <section class="panel planner-panel">
            <div class="panel-head">
              <div class="panel-icon" style="background:#eef2ff;color:#4338ca;">🧭</div>
              <div><h2>一键规划</h2><p>按居所设置、周末目标和睡眠时间生成 7 天种植排期。</p></div>
            </div>
            <div class="value-empty">
              <strong>规划尚未开启</strong>
              <span>开启后会按作物档案库、睡眠时间、周末双倍收获和当前打卡状态动态重算。</span>
            </div>
          </section>
        `;
        updatePlannerFormNote("规划关闭中。居所等级和农田数量请在居所设置页调整；本页设置目标和睡眠时间。");
        return;
      }

      const preview = buildPlannerPreview();
      updatePlannerFormNote(preview.formNote);

      if (!preview.availableCrops.length) {
        els.plannerArea.innerHTML = `
          <section class="panel planner-panel">
            <div class="panel-head">
              <div class="panel-icon" style="background:#fff7ed;color:#c2410c;">🧭</div>
              <div><h2>一键规划</h2><p>当前等级还没有可用于规划的标准作物。</p></div>
            </div>
            <div class="value-empty">
              <strong>等待解锁 Lv.6 及以上作物</strong>
              <span>一键规划只使用 Lv.6 及以上标准作物；当前居所 Lv.${formatNumber(plannerState.currentLevel)} 暂无可规划作物。</span>
            </div>
          </section>
        `;
        return;
      }

      const nextBlock = preview.records.find(record => !record.locked);
      const canPlantNext = nextBlock && nextBlock.archiveId && !state.farm && nextBlock.plantAt <= Date.now() + 2 * MINUTE;
      const progressPct = preview.target > 0 ? clamp((preview.actualProgress / preview.target) * 100, 0, 100) : 100;
      const plannedPct = preview.target > 0 ? clamp((preview.projectedProgress / preview.target) * 100, 0, 100) : 100;
      const nextAction = getPlannerNextAction(preview, nextBlock);

      if (isPlannerDetailPage) {
        renderPlannerDetail(preview, nextAction, progressPct, plannedPct);
        return;
      }

      els.plannerArea.innerHTML = `
        <section class="panel planner-panel">
          <div class="panel-head planner-head">
            <div class="panel-icon" style="background:#eef2ff;color:#4338ca;">🧭</div>
            <div>
              <h2>一键规划</h2>
              <p>从 ${formatPlannerDateTime(plannerState.startedAt)} 起规划 7 天，当前按 Lv.${formatNumber(plannerState.currentLevel)} 和 ${formatNumber(plannerState.landCount)} 块田计算。</p>
            </div>
          </div>

          ${renderPlannerOverview(preview)}

          <div class="planner-summary">
            <div class="value-rank">
              <span>下一步</span>
              <strong>${escapeHtml(nextAction.title)}</strong>
              <small>${escapeHtml(nextAction.sub)}</small>
            </div>
            <div class="value-rank planner-goal-card">
              <div class="planner-ring" style="--progress:${progressPct}%;">
                <span>${progressPct.toFixed(0)}%</span>
              </div>
              <div>
                <span>周末目标进度</span>
                <strong>${formatNumber(preview.actualProgress)} / ${formatNumber(preview.target)}</strong>
                <small>作物获取数量 · 本表预计 ${formatNumber(preview.projectedProgress)}${preview.blessingPlan?.feasible && preview.blessingPlan.requiredSuccesses > 0 ? " · 含祈福估算" : ""}</small>
              </div>
            </div>
            <div class="value-rank">
              <span>预计达标</span>
              <strong>${preview.targetMetAt ? formatPlannerDateTime(preview.targetMetAt) : "暂未达标"}</strong>
              <small>${preview.target > 0 ? `${preview.blessingPlan?.feasible ? "含可行祈福估算" : "按基础双倍收获计算"} · 计划 ${plannedPct.toFixed(0)}%` : "目标数量为 0，直接转经验优先"}</small>
            </div>
            <div class="value-rank">
              <span>可用作物</span>
              <strong>${formatNumber(preview.availableCrops.length)} 种</strong>
              <small>${escapeHtml(preview.bestLabels)}</small>
            </div>
          </div>

          ${renderPlannerBlessingHint(preview)}

          ${renderCurrentPlannerProgress(preview)}

          <div class="planner-next-card">
            <div>
              <strong>${escapeHtml(nextAction.title)}</strong>
              <span>${escapeHtml(nextAction.detail)}</span>
            </div>
            <div class="planner-next-actions">
              ${canPlantNext ? `<button class="btn primary" type="button" data-planner-plant="${escapeHtml(nextBlock.archiveId)}">按规划种下</button>` : ""}
              <button class="btn ghost" type="button" data-planner-refresh="true">刷新排期</button>
              <a class="btn ghost" href="planner-detail.html">查看完整一周规划</a>
            </div>
          </div>

          ${preview.delayNotice ? `<div class="notice warn">${escapeHtml(preview.delayNotice)}</div>` : ""}
        </section>
      `;
    }

    function renderPlannerDetail(preview, nextAction, progressPct, plannedPct) {
      els.plannerArea.innerHTML = `
        <section class="panel planner-panel">
          <div class="panel-head planner-head">
            <div class="panel-icon" style="background:#eef2ff;color:#4338ca;">🧭</div>
            <div>
              <h2>完整一周规划</h2>
              <p>从 ${formatPlannerDateTime(plannerState.startedAt)} 起规划 7 天，按箭头顺序查看每一轮种植和收获。</p>
            </div>
          </div>

          <div class="planner-summary">
            <div class="value-rank">
              <span>下一步</span>
              <strong>${escapeHtml(nextAction.title)}</strong>
              <small>${escapeHtml(nextAction.sub)}</small>
            </div>
            <div class="value-rank planner-goal-card">
              <div class="planner-ring" style="--progress:${progressPct}%;">
                <span>${progressPct.toFixed(0)}%</span>
              </div>
              <div>
                <span>周末目标进度</span>
                <strong>${formatNumber(preview.actualProgress)} / ${formatNumber(preview.target)}</strong>
                <small>本表预计 ${formatNumber(preview.projectedProgress)}${preview.blessingPlan?.feasible && preview.blessingPlan.requiredSuccesses > 0 ? " · 含祈福估算" : ""} · 计划 ${plannedPct.toFixed(0)}%</small>
              </div>
            </div>
            <div class="value-rank">
              <span>预计达标</span>
              <strong>${preview.targetMetAt ? formatPlannerDateTime(preview.targetMetAt) : "暂未达标"}</strong>
              <small>${preview.target > 0 ? (preview.blessingPlan?.feasible ? "含可行祈福估算" : "按基础双倍收获计算") : "目标数量为 0，直接转经验优先"}</small>
            </div>
            <div class="value-rank">
              <span>理论口径</span>
              <strong>最短成熟</strong>
              <small>包含 4 次好友浇水；具体发生时间不在图上标点</small>
            </div>
          </div>

          ${renderPlannerBlessingHint(preview)}

          <div class="planner-next-card">
            <div>
              <strong>${escapeHtml(nextAction.title)}</strong>
              <span>${escapeHtml(nextAction.detail)}</span>
            </div>
            <div class="planner-next-actions">
              <a class="btn ghost" href="planner.html">返回规划总览</a>
              <button class="btn ghost" type="button" data-planner-refresh="true">刷新排期</button>
            </div>
          </div>

          ${preview.delayNotice ? `<div class="notice warn">${escapeHtml(preview.delayNotice)}</div>` : ""}
          ${renderPlannerArrowPlan(preview.records)}
        </section>
      `;
    }

    function updatePlannerFormNote(text) {
      if (els.plannerFormNote) els.plannerFormNote.textContent = text;
    }

    function buildPlannerPreview(now = Date.now()) {
      const settings = getPlannerSettings();
      const availableCrops = getPlannerAvailableCrops(settings.currentLevel);
      const horizonEnd = plannerState.startedAt + PLANNER_HORIZON_MS;
      const actualProgress = Math.min(settings.weekendTarget, Math.max(0, plannerState.weekendProgress || 0));
      let cursor = Math.max(now, plannerState.startedAt);
      let simulationProgress = actualProgress;
      let records = [];
      let delayNotice = "";

      if (state.farm) {
        const lockedBlock = getCurrentFarmPlannerBlock(state.farm, cursor, settings, simulationProgress);
        records.push(lockedBlock);
        simulationProgress = Math.min(settings.weekendTarget, simulationProgress + lockedBlock.targetGain);
        cursor = Math.max(cursor, lockedBlock.harvestAt);
        if (lockedBlock.matureAt <= now) {
          const lateMs = Math.max(0, now - lockedBlock.matureAt);
          delayNotice = lateMs > MINUTE
            ? `当前作物已成熟 ${formatDuration(lateMs, true)}，请先收获；后续排期已从现在重新计算。`
            : "当前作物已经成熟，请先收获；后续排期已从现在重新计算。";
        }
      }

      if (availableCrops.length && cursor < horizonEnd) {
        const future = buildRollingPlannerSchedule(cursor, horizonEnd, availableCrops, settings, simulationProgress);
        records = records.concat(future.records);
        simulationProgress = future.progress;
      }

      const baseProjectedProgress = Math.min(settings.weekendTarget, simulationProgress);
      const baseTargetMetAt = findTargetMetAt(records, actualProgress, settings);
      let blessingPlan = settings.includeBlessing
        ? buildPlannerBlessingPlan(records, actualProgress, settings)
        : null;

      if (shouldUsePlannerBlessingShortcut(records, blessingPlan)) {
        records = rebuildPlannerAfterBlessingPlan(records, blessingPlan, horizonEnd, availableCrops, settings);
        simulationProgress = settings.weekendTarget;
        blessingPlan = buildPlannerBlessingPlan(records, actualProgress, settings);
        if (blessingPlan) blessingPlan.shortcutApplied = true;
      }

      const blessingProjectedProgress = blessingPlan
        ? Math.min(settings.weekendTarget, blessingPlan.projectedProgress)
        : 0;
      const projectedProgress = Math.max(baseProjectedProgress, blessingProjectedProgress);
      const targetMetAt = blessingPlan?.feasible ? blessingPlan.metAt : baseTargetMetAt;
      const bestExp = getTopPlannerCrop(availableCrops, "exp");
      const bestCoins = getTopPlannerCrop(availableCrops, "coins");

      return {
        availableCrops,
        records,
        actualProgress,
        projectedProgress,
        target: settings.weekendTarget,
        targetMetAt,
        blessingPlan,
        delayNotice,
        bestLabels: [
          bestExp ? `经验：${bestExp.name}` : "",
          bestCoins ? `百工币：${bestCoins.name}` : ""
        ].filter(Boolean).join(" · ") || "暂无有效收益作物",
        formNote: `规划开启中。${settings.includeBlessing ? "已计入好友祈福成功估算；" : "未计入好友祈福，按基础双倍收获计算；"}模型会枚举“种植/等待关键窗口”，比较目标数量、双倍百工币、经验和睡眠空等；睡眠 ${settings.sleepStart}-${settings.sleepEnd}，双倍窗口按周五 08:00 到周一 00:00。`
      };
    }

    function buildPlannerBlessingPlan(records, actualProgress, settings) {
      if (settings.weekendTarget <= 0) return null;
      const targetRecords = getPlannerTargetRecords(records);
      if (!targetRecords.length) return null;

      const target = settings.weekendTarget;
      const progressBefore = Math.max(0, actualProgress || 0);
      const prefix = [];
      let baseGain = 0;
      let fallback = null;
      let firstFeasible = null;

      targetRecords.forEach(record => {
        prefix.push(record);
        baseGain += Math.max(0, record.targetBaseGain || record.targetGain || 0);

        const extraPerSuccess = Math.max(1, record.targetBlessingExtraPerSuccess || getPlannerBlessingExtraPerSuccess());
        const baseProgress = progressBefore + baseGain;
        const remainingAfterBase = Math.max(0, target - baseProgress);
        const requiredSuccesses = Math.ceil(remainingAfterBase / extraPerSuccess);
        const dayCount = countPlannerBlessingDays(prefix);
        const usefulSlots = Math.max(0, settings.landCount) * prefix.length;
        const typicalMin = Math.min(usefulSlots, dayCount * PLANNER_BLESSING_MIN_PER_DAY);
        const typicalMax = Math.min(usefulSlots, dayCount * PLANNER_BLESSING_MAX_PER_DAY);
        const feasible = requiredSuccesses <= typicalMax;
        const comfortable = requiredSuccesses <= typicalMin;
        const projectedSuccesses = feasible ? requiredSuccesses : typicalMax;
        const projectedProgress = Math.min(target, baseProgress + projectedSuccesses * extraPerSuccess);
        const names = [...new Set(prefix.map(item => item.name).filter(Boolean))];

        fallback = {
          feasible,
          comfortable,
          target,
          records: [...prefix],
          rounds: prefix.length,
          cropName: names.length ? names.join("、") : "高价值作物",
          metAt: record.harvestAt,
          progressBefore,
          baseGain,
          baseProgress: Math.min(target, baseProgress),
          remainingAfterBase,
          requiredSuccesses,
          projectedSuccesses,
          projectedProgress,
          dayCount,
          typicalMin,
          typicalMax,
          extraPerSuccess,
          usefulSlots
        };

        if (feasible && !firstFeasible) firstFeasible = fallback;
      });

      return firstFeasible || fallback;
    }

    function getPlannerTargetRecords(records) {
      return records.filter(record =>
        record &&
        record.targetGain > 0 &&
        record.targetBaseGain > 0 &&
        record.harvestAt >= plannerState.startedAt
      );
    }

    function shouldUsePlannerBlessingShortcut(records, blessingPlan) {
      if (!blessingPlan || !blessingPlan.feasible) return false;
      return getPlannerTargetRecords(records).some(record => record.harvestAt > blessingPlan.metAt + MINUTE);
    }

    function rebuildPlannerAfterBlessingPlan(records, blessingPlan, horizonEnd, availableCrops, settings) {
      const keptRecords = records.filter(record => record.harvestAt <= blessingPlan.metAt + MINUTE);
      if (blessingPlan.metAt >= horizonEnd || !availableCrops.length) return keptRecords;
      const future = buildRollingPlannerSchedule(
        blessingPlan.metAt,
        horizonEnd,
        availableCrops,
        settings,
        settings.weekendTarget
      );
      return keptRecords.concat(future.records);
    }

    function countPlannerBlessingDays(records) {
      const days = new Set();
      records.forEach(record => {
        const start = getLocalDayStart(record.plantAt);
        const end = getLocalDayStart(record.harvestAt);
        for (let day = start; day <= end; day += DAY) {
          days.add(day);
        }
      });
      return Math.max(1, days.size);
    }

    function getPlannerBlessingExtraPerSuccess() {
      return PLANNER_UNIT_DOUBLE * (PLANNER_BLESSING_MULTIPLIER - 1);
    }

    function getPlannerSettings() {
      return {
        currentLevel: plannerState.currentLevel,
        landCount: plannerState.landCount,
        cropStallLevel: plannerState.cropStallLevel,
        weekendTarget: plannerState.weekendTarget,
        includeBlessing: plannerState.includeBlessing !== false,
        sleepStart: plannerState.sleepStart,
        sleepEnd: plannerState.sleepEnd,
        sleepStartMinutes: timeValueToMinutes(plannerState.sleepStart),
        sleepEndMinutes: timeValueToMinutes(plannerState.sleepEnd)
      };
    }

    function getPlannerAvailableCrops(level) {
      return VALUE_CROP_KEYS
        .map(cropKey => getPreferredArchiveItem(cropKey, level, getArchiveModeForCrop(cropKey)))
        .filter(Boolean)
        .map(item => {
          const crop = CROP_TYPES[item.cropKey];
          const theoryHours = getTheoreticalFastestDuration(item.cropKey) / HOUR;
          return {
            ...item,
            crop,
            expRate: theoryHours > 0 ? item.exp / theoryHours : item.exp,
            coinRate: theoryHours > 0 ? item.coins / theoryHours : item.coins
          };
        });
    }

    function buildRollingPlannerSchedule(startAt, horizonEnd, crops, settings, progressStart) {
      const candidates = getPlannerCandidateCrops(crops);
      let cursor = moveOutOfSleep(startAt, settings);
      let progress = progressStart;
      const records = [];

      while (cursor < horizonEnd && records.length < PLANNER_MAX_BLOCKS) {
        const solution = solvePlannerDp(
          cursor,
          horizonEnd,
          candidates,
          settings,
          progress,
          PLANNER_DP_DEPTH,
          new Map()
        );
        const nextRecord = solution.records[0];
        if (!nextRecord || nextRecord.harvestAt <= cursor + MINUTE) break;

        records.push(nextRecord);
        progress = Math.min(settings.weekendTarget, progress + (nextRecord.targetGain || 0));
        cursor = nextRecord.harvestAt;
      }

      return { records, progress };
    }

    function getPlannerCandidateCrops(crops) {
      if (crops.length <= PLANNER_DP_MAX_CANDIDATES) return crops;
      const byId = new Map();
      const add = item => byId.set(item.id, item);
      const topBy = (field, count, desc = true) => {
        [...crops]
          .sort((a, b) => desc ? b[field] - a[field] : a[field] - b[field])
          .slice(0, count)
          .forEach(add);
      };

      topBy("exp", 5);
      topBy("coins", 5);
      topBy("expRate", 5);
      topBy("coinRate", 5);
      [...crops]
        .sort((a, b) => CROP_TYPES[a.cropKey].minutes - CROP_TYPES[b.cropKey].minutes)
        .slice(0, 4)
        .forEach(add);

      return [...byId.values()].slice(0, PLANNER_DP_MAX_CANDIDATES);
    }

    function solvePlannerDp(startAt, horizonEnd, crops, settings, progress, depth, memo) {
      const cursor = moveOutOfSleep(startAt, settings);
      if (cursor >= horizonEnd) return { score: emptyPlannerScore(), records: [] };
      if (depth <= 0) return { score: getPlannerContinuationScore(cursor, horizonEnd, crops, settings, progress), records: [] };

      const key = [
        Math.round(cursor / MINUTE),
        Math.round(Math.min(settings.weekendTarget, progress)),
        depth
      ].join("|");
      if (memo.has(key)) return memo.get(key);

      let best = { score: emptyPlannerScore(), records: [] };

      let plantBlocks = crops.map(item => {
        const cycle = getPlannerCropCycle(item, cursor, settings);
        return cycle && cycle.harvestAt <= horizonEnd ? buildPlannerBlock(item, cycle, settings, progress) : null;
      }).filter(Boolean);

      if (progress < settings.weekendTarget && plantBlocks.some(block => block.targetGain > 0)) {
        plantBlocks = plantBlocks.filter(block => block.targetGain > 0);
      }

      const blocks = [
        ...getPlannerWaitBlocks(cursor, horizonEnd, settings),
        ...plantBlocks
      ];

      blocks.forEach(block => {
        if (block.harvestAt <= cursor + MINUTE) return;
        const nextProgress = Math.min(settings.weekendTarget, progress + (block.targetGain || 0));
        const next = solvePlannerDp(block.harvestAt, horizonEnd, crops, settings, nextProgress, depth - 1, memo);
        const score = addPlannerScores(getPlannerBlockScore(block), next.score);
        const candidate = {
          score,
          records: [block, ...next.records]
        };
        if (comparePlannerScores(candidate.score, best.score) > 0) best = candidate;
      });

      memo.set(key, best);
      return best;
    }

    function getPlannerWaitBlocks(startAt, horizonEnd, settings) {
      const boundaries = [
        getCurrentOrNextDoubleWindow(startAt).start,
        getCurrentOrNextDoubleWindow(startAt).end,
        getNextSleepEnd(startAt, settings)
      ];
      return boundaries
        .filter(at => at > startAt + MINUTE && at < horizonEnd)
        .sort((a, b) => a - b)
        .slice(0, 2)
        .map(at => buildPlannerWaitBlock(startAt, at));
    }

    function buildPlannerWaitBlock(startAt, waitUntil) {
      return {
        id: `planner-wait-${startAt}-${waitUntil}`,
        type: "wait",
        archiveId: "",
        name: "等待窗口",
        cropKey: "",
        crop: { short: "等待" },
        goal: "wait",
        locked: false,
        plantAt: startAt,
        matureAt: waitUntil,
        harvestAt: waitUntil,
        durationMs: waitUntil - startAt,
        sleepDelayMs: 0,
        waterEvents: [],
        doubleHarvest: false,
        targetGain: 0,
        targetBaseGain: 0,
        targetBlessingExtraPerSuccess: 0,
        expGain: 0,
        coinGain: 0,
        reason: "数学模型判断等待到关键窗口后，总收益更高"
      };
    }

    function getPlannerContinuationScore(startAt, horizonEnd, crops, settings, progress) {
      const remainingMs = Math.max(0, horizonEnd - startAt);
      if (remainingMs <= 0) return emptyPlannerScore();

      const bestExpRate = crops.reduce((best, item) => {
        if (item.exp <= 0) return best;
        const cycle = getPlannerCropCycle(item, startAt, settings);
        const rate = cycle.durationMs > 0 ? (item.exp * settings.landCount) / cycle.durationMs : 0;
        return Math.max(best, rate);
      }, 0);
      const bestCoinRate = crops.reduce((best, item) => {
        if (item.coins <= 0) return best;
        const cycle = getPlannerCropCycle(item, startAt, settings);
        const rate = cycle.durationMs > 0 ? (item.coins * settings.landCount) / cycle.durationMs : 0;
        return Math.max(best, rate);
      }, 0);

      return {
        target: 0,
        targetCoins: 0,
        targetSpeed: 0,
        exp: bestExpRate * remainingMs,
        coins: bestCoinRate * remainingMs,
        harvests: 0,
        duration: -remainingMs,
        sleepDelay: 0
      };
    }

    function getPlannerSelfWaterCandidate(cropKey, rawMatureAt, lastSelfWaterAt, waterAt, earliestAt) {
      if (!Number.isFinite(waterAt) || !Number.isFinite(lastSelfWaterAt)) return null;
      if (waterAt < earliestAt || waterAt <= lastSelfWaterAt || waterAt >= rawMatureAt) return null;

      const rule = cropRule(cropKey);
      const reduction = getSelfWaterReductionByElapsed(rule, waterAt - lastSelfWaterAt);
      if (reduction <= 0) return null;

      const nextRawMatureAt = Math.max(waterAt, rawMatureAt - reduction);
      const matureAt = roundMatureTimestamp(cropKey, nextRawMatureAt);
      const naturalMatureAt = roundMatureTimestamp(cropKey, rawMatureAt);
      if (matureAt >= naturalMatureAt) return null;

      return {
        waterAt,
        reduction,
        rawMatureAt: nextRawMatureAt,
        matureAt
      };
    }

    function getPlannerFinalSelfWaterCandidate(cropKey, rawMatureAt, lastSelfWaterAt, settings, earliestAt) {
      const finalOpportunity = getFinalSelfWaterOpportunity(cropKey, rawMatureAt, lastSelfWaterAt, earliestAt);
      if (!finalOpportunity.finalWaterAt) return null;

      const candidates = [];
      const finalWaterAt = moveOutOfSleep(finalOpportunity.finalWaterAt, settings);
      const finalCandidate = getPlannerSelfWaterCandidate(cropKey, rawMatureAt, lastSelfWaterAt, finalWaterAt, earliestAt);
      if (finalCandidate) {
        candidates.push({
          ...finalCandidate,
          delayedFrom: finalWaterAt !== finalOpportunity.finalWaterAt ? finalOpportunity.finalWaterAt : null,
          label: "收尾自浇"
        });
      }

      const latestAwakeAt = getLatestAwakeBeforeSleep(finalOpportunity.finalWaterAt, settings);
      const preSleepCandidate = getPlannerSelfWaterCandidate(cropKey, rawMatureAt, lastSelfWaterAt, latestAwakeAt, earliestAt);
      if (preSleepCandidate) {
        candidates.push({
          ...preSleepCandidate,
          delayedFrom: null,
          label: "睡前自浇"
        });
      }

      return candidates.sort((a, b) => a.matureAt - b.matureAt || b.waterAt - a.waterAt)[0] || null;
    }

    function getPlannerCropCycle(item, startAt, settings) {
      const cropKey = item.cropKey;
      const rule = cropRule(cropKey);
      const plantAt = moveOutOfSleep(startAt, settings);
      const friendReduction = rule.friendReduce * rule.friendMaxCount;
      const waterEvents = [
        { at: plantAt, label: "首次自浇", reduction: rule.firstWaterReduce, delayedFrom: null },
        { at: plantAt, label: `好友浇水×${rule.friendMaxCount}`, reduction: friendReduction, delayedFrom: null }
      ];
      let rawMatureAt = plantAt + rule.base - rule.firstWaterReduce - friendReduction;
      let lastSelfWaterAt = plantAt;

      for (let i = 0; i < 24; i += 1) {
        const targetFullWaterAt = lastSelfWaterAt + rule.maxInterval;
        const fullWaterAt = moveOutOfSleep(targetFullWaterAt, settings);
        const currentMatureAt = roundMatureTimestamp(cropKey, rawMatureAt);
        const currentHarvestAt = moveOutOfSleep(currentMatureAt, settings);

        if (fullWaterAt >= rawMatureAt || fullWaterAt >= currentHarvestAt) break;

        const reduction = getSelfWaterReductionByElapsed(rule, fullWaterAt - lastSelfWaterAt);
        rawMatureAt = Math.max(fullWaterAt, rawMatureAt - reduction);
        waterEvents.push({
          at: fullWaterAt,
          label: "自浇",
          reduction,
          delayedFrom: fullWaterAt !== targetFullWaterAt ? targetFullWaterAt : null
        });
        lastSelfWaterAt = fullWaterAt;
      }

      const finalCandidate = getPlannerFinalSelfWaterCandidate(cropKey, rawMatureAt, lastSelfWaterAt, settings, plantAt);
      if (finalCandidate) {
        rawMatureAt = finalCandidate.rawMatureAt;
        waterEvents.push({
          at: finalCandidate.waterAt,
          label: finalCandidate.label,
          reduction: finalCandidate.reduction,
          delayedFrom: finalCandidate.delayedFrom
        });
      }

      const finalOpportunity = getFinalSelfWaterOpportunity(cropKey, rawMatureAt, lastSelfWaterAt, plantAt);
      if (!finalCandidate && finalOpportunity.finalWaterAt) {
        const finalWaterAt = moveOutOfSleep(finalOpportunity.finalWaterAt, settings);
        if (finalWaterAt < rawMatureAt) {
          const reduction = getSelfWaterReductionByElapsed(rule, finalWaterAt - lastSelfWaterAt);
          const finalMatureAt = roundMatureTimestamp(cropKey, Math.max(finalWaterAt, rawMatureAt - reduction));
          const naturalMatureAt = roundMatureTimestamp(cropKey, rawMatureAt);
          if (finalMatureAt <= naturalMatureAt) {
            rawMatureAt = Math.max(finalWaterAt, rawMatureAt - reduction);
            waterEvents.push({
              at: finalWaterAt,
              label: "收尾自浇",
              reduction,
              delayedFrom: finalWaterAt !== finalOpportunity.finalWaterAt ? finalOpportunity.finalWaterAt : null
            });
          }
        }
      }

      const matureAt = roundMatureTimestamp(cropKey, rawMatureAt);
      const harvestAt = moveOutOfSleep(matureAt, settings);
      return {
        plantAt,
        matureAt,
        harvestAt,
        durationMs: harvestAt - plantAt,
        sleepDelayMs: Math.max(0, harvestAt - matureAt),
        waterEvents: waterEvents.filter(event => event.at <= harvestAt)
      };
    }

    function getCurrentFarmPlannerCycle(farm, now, settings) {
      const cropKey = farm.cropKey;
      const rule = cropRule(cropKey);
      const actualMatureAt = getMatureAt(farm);
      const actionStart = moveOutOfSleep(now, settings);

      if (actualMatureAt <= now) {
        const harvestAt = moveOutOfSleep(Math.max(now, actualMatureAt), settings);
        return {
          plantAt: now,
          matureAt: actualMatureAt,
          harvestAt,
          durationMs: Math.max(0, harvestAt - now),
          sleepDelayMs: Math.max(0, harvestAt - actualMatureAt),
          waterEvents: []
        };
      }

      let rawMatureAt = getRawMatureAt(farm);
      let lastSelfWaterAt = farm.lastSelfWaterAt;
      const waterEvents = [];
      const remainingFriendCount = Math.max(0, rule.friendMaxCount - farm.friendWaterCount);

      if (remainingFriendCount > 0) {
        const friendReduction = remainingFriendCount * rule.friendReduce;
        rawMatureAt -= friendReduction;
        waterEvents.push({
          at: actionStart,
          label: `好友浇水×${remainingFriendCount}`,
          reduction: friendReduction,
          delayedFrom: actionStart !== now ? now : null
        });
      }

      if (roundMatureTimestamp(cropKey, rawMatureAt) <= actionStart) {
        const matureAt = roundMatureTimestamp(cropKey, rawMatureAt);
        const harvestAt = moveOutOfSleep(Math.max(actionStart, matureAt), settings);
        return {
          plantAt: now,
          matureAt,
          harvestAt,
          durationMs: Math.max(0, harvestAt - now),
          sleepDelayMs: Math.max(0, harvestAt - matureAt),
          waterEvents: waterEvents.filter(event => event.at <= harvestAt)
        };
      }

      if (!lastSelfWaterAt) {
        rawMatureAt -= rule.firstWaterReduce;
        lastSelfWaterAt = actionStart;
        waterEvents.push({
          at: actionStart,
          label: "首次自浇",
          reduction: rule.firstWaterReduce,
          delayedFrom: actionStart !== now ? now : null
        });
      }

      for (let i = 0; i < 24; i += 1) {
        const targetFullWaterAt = lastSelfWaterAt + rule.maxInterval;
        const fullWaterAt = moveOutOfSleep(Math.max(targetFullWaterAt, actionStart), settings);
        const currentMatureAt = roundMatureTimestamp(cropKey, rawMatureAt);
        const currentHarvestAt = moveOutOfSleep(Math.max(actionStart, currentMatureAt), settings);

        if (fullWaterAt >= rawMatureAt || fullWaterAt >= currentHarvestAt) break;

        const reduction = getSelfWaterReductionByElapsed(rule, fullWaterAt - lastSelfWaterAt);
        rawMatureAt = Math.max(fullWaterAt, rawMatureAt - reduction);
        waterEvents.push({
          at: fullWaterAt,
          label: "自浇",
          reduction,
          delayedFrom: fullWaterAt !== targetFullWaterAt ? targetFullWaterAt : null
        });
        lastSelfWaterAt = fullWaterAt;
      }

      const finalCandidate = getPlannerFinalSelfWaterCandidate(cropKey, rawMatureAt, lastSelfWaterAt, settings, actionStart);
      if (finalCandidate) {
        rawMatureAt = finalCandidate.rawMatureAt;
        waterEvents.push({
          at: finalCandidate.waterAt,
          label: finalCandidate.label,
          reduction: finalCandidate.reduction,
          delayedFrom: finalCandidate.delayedFrom
        });
      }

      const finalOpportunity = getFinalSelfWaterOpportunity(cropKey, rawMatureAt, lastSelfWaterAt, actionStart);
      if (!finalCandidate && finalOpportunity.finalWaterAt) {
        const finalWaterAt = moveOutOfSleep(finalOpportunity.finalWaterAt, settings);
        if (finalWaterAt < rawMatureAt) {
          const reduction = getSelfWaterReductionByElapsed(rule, finalWaterAt - lastSelfWaterAt);
          const finalMatureAt = roundMatureTimestamp(cropKey, Math.max(finalWaterAt, rawMatureAt - reduction));
          const naturalMatureAt = roundMatureTimestamp(cropKey, rawMatureAt);
          if (finalMatureAt <= naturalMatureAt) {
            rawMatureAt = Math.max(finalWaterAt, rawMatureAt - reduction);
            waterEvents.push({
              at: finalWaterAt,
              label: "收尾自浇",
              reduction,
              delayedFrom: finalWaterAt !== finalOpportunity.finalWaterAt ? finalOpportunity.finalWaterAt : null
            });
          }
        }
      }

      const matureAt = roundMatureTimestamp(cropKey, rawMatureAt);
      const harvestAt = moveOutOfSleep(Math.max(actionStart, matureAt), settings);
      return {
        plantAt: now,
        matureAt,
        harvestAt,
        durationMs: Math.max(0, harvestAt - now),
        sleepDelayMs: Math.max(0, harvestAt - matureAt),
        waterEvents: waterEvents.filter(event => event.at <= harvestAt)
      };
    }

    function buildPlannerBlock(item, cycle, settings, progress) {
      const doubleHarvest = isDoubleHarvest(cycle.harvestAt);
      const targetBaseGain = getPlannerTargetBaseGain(item, cycle.harvestAt, settings);
      const targetGain = getPlannerTargetGain(item, cycle.harvestAt, progress, settings);
      const expGain = item.exp * settings.landCount;
      const coinGain = item.coins * settings.landCount * (doubleHarvest ? 2 : 1);
      const topExp = getTopPlannerCrop(getPlannerAvailableCrops(settings.currentLevel), "exp");
      const goal = targetGain > 0 ? "coins" : "exp";
      const reasonParts = [];

      if (goal === "exp" && topExp && topExp.id !== item.id && item.exp > 0) {
        reasonParts.push(`${topExp.name} 单作物效率更高，但本轮组合收益或睡眠避让后，${item.name} 更合适`);
      }

      if (cycle.sleepDelayMs > 0) {
        reasonParts.push(`成熟会落在睡眠时间，已顺延 ${formatDuration(cycle.sleepDelayMs, true)} 到醒后收获`);
      }

      if (doubleHarvest && goal === "coins") {
        reasonParts.push("本次收获落在双倍窗口，计入周末目标");
      }

      return {
        id: `planner-${item.id}-${cycle.plantAt}`,
        archiveId: item.id,
        name: item.name,
        cropKey: item.cropKey,
        crop: item.crop,
        goal,
        locked: false,
        plantAt: cycle.plantAt,
        matureAt: cycle.matureAt,
        harvestAt: cycle.harvestAt,
        durationMs: cycle.durationMs,
        sleepDelayMs: cycle.sleepDelayMs,
        waterEvents: cycle.waterEvents,
        doubleHarvest,
        targetGain,
        targetBaseGain,
        targetBlessingExtraPerSuccess: targetBaseGain > 0 ? getPlannerBlessingExtraPerSuccess() : 0,
        expGain,
        coinGain,
        reason: reasonParts.join("。")
      };
    }

    function getCurrentFarmPlannerBlock(farm, now, settings, progress) {
      const crop = CROP_TYPES[farm.cropKey];
      const archiveItem = getFarmArchiveItem(farm, settings.currentLevel);
      const cycle = getCurrentFarmPlannerCycle(farm, now, settings);
      const matureAt = cycle.matureAt;
      const harvestAt = cycle.harvestAt;
      const doubleHarvest = isDoubleHarvest(harvestAt);
      const targetBaseGain = archiveItem ? getPlannerTargetBaseGain(archiveItem, harvestAt, settings) : 0;
      const targetGain = archiveItem ? getPlannerTargetGain(archiveItem, harvestAt, progress, settings) : 0;

      return {
        id: `planner-current-${farm.id}`,
        archiveId: archiveItem?.id || "",
        name: archiveItem?.name || crop.label,
        cropKey: farm.cropKey,
        crop,
        goal: targetGain > 0 ? "coins" : (farm.planner?.goal || "current"),
        locked: true,
        plantAt: cycle.plantAt,
        matureAt,
        harvestAt,
        durationMs: cycle.durationMs,
        sleepDelayMs: cycle.sleepDelayMs,
        waterEvents: cycle.waterEvents,
        doubleHarvest,
        targetGain,
        targetBaseGain,
        targetBlessingExtraPerSuccess: targetBaseGain > 0 ? getPlannerBlessingExtraPerSuccess() : 0,
        expGain: archiveItem ? archiveItem.exp * settings.landCount : 0,
        coinGain: archiveItem ? archiveItem.coins * settings.landCount * (doubleHarvest ? 2 : 1) : 0,
        reason: archiveItem
          ? "当前正在管理的作物会先占用本轮排期，收获后继续执行后续规划"
          : "当前作物没有绑定档案收益，只用于占位避免排期重叠"
      };
    }

    function getPlannerTargetBaseGain(item, harvestAt, settings) {
      if (settings.weekendTarget <= 0) return 0;
      if (!isDoubleHarvest(harvestAt)) return 0;
      if (!isWeekendTargetArchive(item, settings)) return 0;
      return settings.landCount * PLANNER_UNIT_DOUBLE;
    }

    function getPlannerTargetGain(item, harvestAt, progress, settings) {
      const baseGain = getPlannerTargetBaseGain(item, harvestAt, settings);
      if (baseGain <= 0) return 0;
      const remaining = Math.max(0, settings.weekendTarget - progress);
      return Math.min(remaining, baseGain);
    }

    function recordPlannerHarvestProgress(farm) {
      if (!plannerState.active) return 0;
      const archiveItem = getFarmArchiveItem(farm);
      if (!isWeekendTargetArchive(archiveItem, getPlannerSettings())) return 0;

      const now = Date.now();
      if (!isDoubleHarvest(now)) return 0;

      normalizePlannerProgress(now);
      const remaining = Math.max(0, plannerState.weekendTarget - plannerState.weekendProgress);
      const gain = Math.min(remaining, plannerState.landCount * PLANNER_UNIT_DOUBLE);
      if (gain <= 0) return 0;

      plannerState.weekendProgress += gain;
      plannerState.updatedAt = now;
      savePlannerState();
      return gain;
    }

    function getPlannerBlockScore(block) {
      return {
        target: block.targetGain,
        targetCoins: block.targetGain > 0 ? block.coinGain : 0,
        targetSpeed: block.targetGain > 0 ? -block.harvestAt : 0,
        exp: block.expGain,
        coins: block.coinGain,
        harvests: 1,
        duration: -Math.max(0, block.durationMs),
        sleepDelay: -Math.max(0, block.sleepDelayMs)
      };
    }

    function emptyPlannerScore() {
      return { target: 0, targetCoins: 0, targetSpeed: 0, exp: 0, coins: 0, harvests: 0, duration: 0, sleepDelay: 0 };
    }

    function addPlannerScores(a, b) {
      return {
        target: a.target + b.target,
        targetCoins: a.targetCoins + b.targetCoins,
        targetSpeed: a.targetSpeed + b.targetSpeed,
        exp: a.exp + b.exp,
        coins: a.coins + b.coins,
        harvests: a.harvests + b.harvests,
        duration: a.duration + b.duration,
        sleepDelay: a.sleepDelay + b.sleepDelay
      };
    }

    function comparePlannerScores(a, b) {
      const fields = ["target", "targetSpeed", "targetCoins", "exp", "coins", "harvests", "sleepDelay", "duration"];
      for (const field of fields) {
        const diff = a[field] - b[field];
        if (Math.abs(diff) > 0.0001) return diff > 0 ? 1 : -1;
      }
      return 0;
    }

    function findTargetMetAt(records, actualProgress, settings) {
      if (settings.weekendTarget <= 0) return Date.now();
      let progress = actualProgress;
      for (const record of records) {
        progress += record.targetGain;
        if (progress >= settings.weekendTarget) return record.harvestAt;
      }
      return null;
    }

    function getTopPlannerCrop(crops, field) {
      const scoreField = field === "coins" ? "coinRate" : "expRate";
      return crops
        .filter(item => field === "coins" ? item.coins > 0 : item.exp > 0)
        .reduce((best, item) => {
          if (!best) return item;
          if (item[scoreField] > best[scoreField]) return item;
          if (item[scoreField] === best[scoreField] && item[field === "coins" ? "coins" : "exp"] > best[field === "coins" ? "coins" : "exp"]) return item;
          return best;
        }, null);
    }

    function getPlannerNextAction(preview, nextBlock) {
      const now = Date.now();
      const current = preview.records.find(record => record.locked);

      if (current && current.matureAt <= now) {
        return {
          title: "先收获当前作物",
          sub: current.sleepDelayMs > 0 ? "成熟落在睡眠段，已按醒后收获重排" : "收获后会继续按新时间排后续作物",
          detail: `${current.name} 已成熟，后续计划从 ${formatPlannerDateTime(current.harvestAt)} 之后继续。`
        };
      }

      if (current) {
        return {
          title: `等待 ${current.name} 收获`,
          sub: `预计 ${formatPlannerDateTime(current.harvestAt)}`,
          detail: current.reason || "当前作物会先占用排期。"
        };
      }

      if (!nextBlock) {
        return {
          title: "暂无可执行作物",
          sub: "当前窗口内没有能完成收获的作物",
          detail: "可以提高等级、补充档案，或调整睡眠时间后再试。"
        };
      }

      if (nextBlock.type === "wait") {
        return {
          title: `等待到 ${formatPlannerDateTime(nextBlock.harvestAt)}`,
          sub: "等待关键窗口",
          detail: nextBlock.reason || "模型判断暂不种植，总收益更高。"
        };
      }

      if (nextBlock.plantAt > now + 2 * MINUTE) {
        return {
          title: `等待到 ${formatPlannerDateTime(nextBlock.plantAt)} 再种`,
          sub: `${nextBlock.name} · ${nextBlock.goal === "coins" ? "周末目标" : "经验优先"}`,
          detail: nextBlock.reason || "此时种下可以减少睡眠空等或卡入双倍窗口。"
        };
      }

      return {
        title: `现在种 ${nextBlock.name}`,
        sub: `${nextBlock.goal === "coins" ? "高百工币目标" : "经验优先"} · 预计 ${formatPlannerDateTime(nextBlock.harvestAt)} 收获`,
        detail: nextBlock.reason || "按未来几轮组合收益计算，这是当前更合适的一批作物。"
      };
    }

    function renderPlannerBlessingHint(preview) {
      const plan = preview.blessingPlan;
      if (!plan || preview.target <= 0) return "";

      const status = plan.requiredSuccesses <= 0
        ? "基础收获已够"
        : plan.comfortable
          ? "祈福次数比较稳"
          : plan.feasible
            ? "祈福次数在常见范围内"
            : "祈福次数偏紧";
      const headline = plan.feasible
        ? plan.requiredSuccesses > 0
          ? `本周好友成功祈福 ${formatNumber(plan.requiredSuccesses)} 次，即可完成 ${formatNumber(plan.target)} 的目标；一共种植 ${formatNumber(plan.rounds)} 次 ${plan.cropName}。`
          : `不需要额外祈福，种植 ${formatNumber(plan.rounds)} 次 ${plan.cropName} 的基础双倍收获即可完成 ${formatNumber(plan.target)} 的目标。`
        : `按当前目标作物排期，还需要 ${formatNumber(plan.requiredSuccesses)} 次成功祈福才够 ${formatNumber(plan.target)}，常见次数暂时偏紧。`;
      const rangeText = plan.typicalMin === plan.typicalMax
        ? formatNumber(plan.typicalMax)
        : `${formatNumber(plan.typicalMin)}-${formatNumber(plan.typicalMax)}`;
      const actionText = plan.feasible
        ? plan.requiredSuccesses > 0
          ? (plan.shortcutApplied
            ? "因此后续高价值目标作物已不再额外追加，排期会转向经验优先。"
            : "如果实际成功次数达到这个数量，就不需要额外补下一轮高价值作物。")
          : "本轮基础双倍收获已经足够，后续会转向经验优先。"
        : "当前常见成功祈福上限还不够，规划会继续保留后续高价值作物。";

      return `
        <section class="planner-blessing-card ${plan.feasible ? "is-good" : "is-warn"}">
          <div class="planner-blessing-top">
            <div>
              <span>好友祈福辅助目标</span>
              <strong>${escapeHtml(headline)}</strong>
            </div>
            <b>${escapeHtml(status)}</b>
          </div>
          <p>这 ${formatNumber(plan.rounds)} 轮目标作物覆盖约 ${formatNumber(plan.dayCount)} 天，按每天 ${PLANNER_BLESSING_MIN_PER_DAY}-${PLANNER_BLESSING_MAX_PER_DAY} 次成功祈福估算，可获得约 ${rangeText} 次；每次成功祈福额外 +${formatNumber(plan.extraPerSuccess)} 目标数量。</p>
          <p>基础双倍累计 ${formatNumber(plan.baseProgress)} / ${formatNumber(plan.target)}，祈福补足后预计 ${formatNumber(plan.projectedProgress)} / ${formatNumber(plan.target)}。${escapeHtml(actionText)}</p>
        </section>
      `;
    }

    function renderPlannerOverview(preview) {
      const now = Date.now();
      const events = buildPlannerOverviewEvents(preview.records, now, 8);
      if (!events.length) {
        return `
          <section class="planner-focus-section">
            <div class="planner-section-title">
              <span>总体时间进度</span>
              <strong>暂无可展示排期</strong>
            </div>
            <div class="value-empty">
              <strong>本周规划已结束</strong>
              <span>7 天窗口内没有更多可安排的收获。</span>
            </div>
          </section>
        `;
      }

      const startAt = Math.min(now, events[0].at);
      const endAt = Math.max(events[events.length - 1].at, startAt + HOUR);
      const duration = Math.max(MINUTE, endAt - startAt);
      const nodes = events.map((event, index) => ({
        event,
        index,
        pct: clamp(((event.at - startAt) / duration) * 100, 8, 92),
        lane: index % 2 === 0 ? "top" : "bottom"
      }));

      return `
        <section class="planner-focus-section">
          <div class="planner-section-title">
            <span>总体时间进度</span>
            <strong>${formatPlannerWeekdayTime(startAt)} → ${formatPlannerWeekdayTime(endAt)}</strong>
          </div>
          <div class="planner-overview-map" aria-label="总体时间进度">
            <div class="planner-overview-track">
              <div class="planner-overview-fill"></div>
              ${nodes.map(node => `<span class="planner-overview-dot" style="left:${node.pct}%"><i>${node.index + 1}</i></span>`).join("")}
            </div>
            ${nodes.map(node => `
              <article class="planner-overview-card ${escapeHtml(node.lane)} ${escapeHtml(node.event.tone)}" style="left:${node.pct}%;">
                <span>${formatPlannerWeekdayTime(node.event.at)}</span>
                ${node.event.items.slice(0, 2).map(item => renderPlannerOverviewItem(item)).join("")}
                ${node.event.items.length > 2 ? `<small>另 ${node.event.items.length - 2} 项</small>` : ""}
              </article>
            `).join("")}
          </div>
          <div class="planner-rail-note">进度条不标好友浇水时间；成熟按理论最短口径计算，已包含 4 次好友浇水假设。</div>
        </section>
      `;
    }

    function buildPlannerOverviewEvents(records, now, maxItems) {
      const grouped = new Map();
      const add = (at, action, name, tone, record = null) => {
        if (!Number.isFinite(at) || at < now - 2 * MINUTE) return;
        const key = Math.round(at / MINUTE);
        if (!grouped.has(key)) {
          grouped.set(key, { at, tone, items: [] });
        }
        const group = grouped.get(key);
        group.at = Math.min(group.at, at);
        group.tone = group.tone === tone ? tone : "mixed";
        const overviewRecord = record || (String(action).includes("收") || String(action).includes("鏀")
          ? records.find(candidate => candidate.harvestAt === at && candidate.name === name)
          : null);
        group.items.push({ action, name, record: overviewRecord });
      };

      records.forEach(record => {
        if (record.type === "wait") {
          add(record.harvestAt, "等待到", "关键窗口", "wait");
          return;
        }

        if (!record.locked && record.plantAt >= now - 2 * MINUTE) {
          add(record.plantAt, record.plantAt <= now + 2 * MINUTE ? "现在种植" : "种植", record.name, record.goal === "coins" ? "coins" : "plant");
        }

        add(record.harvestAt, record.locked ? "当前作物收获" : "收获", record.name, record.goal === "coins" ? "coins" : "harvest");
      });

      return [...grouped.values()]
        .sort((a, b) => a.at - b.at)
        .slice(0, maxItems);
    }

    function formatPlannerOverviewItem(item) {
      if (!item) return "";
      if (item.action.includes("收获")) return `收${item.name}`;
      if (item.action.includes("种植")) return `种${item.name}`;
      if (item.action.includes("等待")) return `等${item.name}`;
      return `${item.action}${item.name}`;
    }

    function renderPlannerOverviewItem(item) {
      const gapText = formatPlannerSleepGap(item?.record, true);
      return `
        <strong>${escapeHtml(formatPlannerOverviewItem(item))}</strong>
        ${gapText ? `<small>${escapeHtml(gapText)}</small>` : ""}
      `;
    }

    function getPlannerSleepGap(record) {
      if (!record || !Number.isFinite(record.matureAt) || !Number.isFinite(record.harvestAt)) return null;
      const gapMs = Math.max(0, Number(record.sleepDelayMs) || 0, record.harvestAt - record.matureAt);
      return gapMs > 0 ? { matureAt: record.matureAt, gapMs } : null;
    }

    function formatPlannerSleepGap(record, compact = false) {
      const gap = getPlannerSleepGap(record);
      if (!gap) return "";
      const matureText = compact ? formatPlannerTime(gap.matureAt) : formatPlannerDateTime(gap.matureAt);
      return `实际 ${matureText} 成熟 · 空窗 ${formatDuration(gap.gapMs, true)}`;
    }

    function renderCurrentPlannerProgress(preview) {
      const current = preview.records.find(record => record.locked);
      if (!current) {
        return `
          <section class="planner-focus-section planner-current-section">
            <div class="planner-section-title">
              <span>当前作物进度</span>
              <strong>暂无正在管理的作物</strong>
            </div>
            <div class="value-empty">
              <strong>还没有当前作物</strong>
              <span>按上方建议种下后，这里会显示这一批作物的预计收获时间和自浇节奏。</span>
            </div>
          </section>
        `;
      }

      const selfWaterEvents = current.waterEvents.filter(event => !event.label.includes("好友"));
      const selfWaterText = selfWaterEvents.length
        ? selfWaterEvents.map(event => `${event.label} ${formatPlannerTime(event.at)}${event.delayedFrom ? "（睡眠后）" : ""}`).join(" · ")
        : "暂无后续自浇节点";
      const friendEvent = current.waterEvents.find(event => event.label.includes("好友"));

      return `
        <section class="planner-focus-section planner-current-section">
          <div class="planner-section-title">
            <span>当前作物进度</span>
            <strong>${escapeHtml(current.name)}</strong>
          </div>
          <article class="planner-current-card">
            <div class="planner-current-top">
              <div>
                <div class="badge-row">
                  <span class="badge blue">当前作物</span>
                  ${current.doubleHarvest ? `<span class="badge rose">双倍收获</span>` : ""}
                  ${current.sleepDelayMs > 0 ? `<span class="badge">睡眠避让</span>` : ""}
                </div>
                <h3>${escapeHtml(current.name)}</h3>
                ${formatPlannerSleepGap(current) ? `<p>${escapeHtml(formatPlannerSleepGap(current))}</p>` : ""}
                <p>${escapeHtml(current.crop.short)} · 预计 ${formatPlannerDateTime(current.harvestAt)} 收获</p>
              </div>
              <div class="planner-yield">
                <strong>${formatNumber(current.expGain)} 经验</strong>
                <span>${formatNumber(current.coinGain)} 百工币${current.targetGain > 0 ? ` · 目标 +${formatNumber(current.targetGain)}` : ""}</span>
              </div>
            </div>
            ${renderPlannerProgressRail(current)}
            <div class="planner-rail-note">
              ${escapeHtml(selfWaterText)}。${friendEvent ? ` ${escapeHtml(friendEvent.label)}已计入理论最短成熟，但不标具体时间。` : " 好友浇水发生后可回主页打卡，规划会重算。"}
            </div>
          </article>
        </section>
      `;
    }

    function renderPlannerArrowPlan(records) {
      const futureRecords = records.filter(record => record.harvestAt >= plannerState.startedAt);
      if (!futureRecords.length) {
        return `
          <div class="value-empty">
            <strong>本周规划已结束</strong>
            <span>7 天窗口内没有更多可安排的收获。</span>
          </div>
        `;
      }

      const grouped = futureRecords.reduce((groups, record) => {
        const key = formatPlannerDate(record.plantAt);
        if (!groups[key]) groups[key] = [];
        groups[key].push(record);
        return groups;
      }, {});

      return `
        <div class="planner-detail-note">完整规划按箭头顺序展示作物轮换。好友浇水只作为理论最短成熟假设，不在每张卡片里安排具体时间。</div>
        <div class="planner-arrow-plan">
          ${Object.entries(grouped).map(([date, items]) => `
            <section class="planner-arrow-day">
              <h3>${escapeHtml(date)}</h3>
              <div class="planner-arrow-chain">
                ${items.map((record, index) => `
                  ${index > 0 ? `<span class="planner-flow-arrow" aria-hidden="true">→</span>` : ""}
                  ${renderPlannerArrowCard(record)}
                `).join("")}
              </div>
            </section>
          `).join("")}
        </div>
      `;
    }

    function renderPlannerArrowCard(record) {
      if (record.type === "wait") {
        return `
          <article class="planner-arrow-card planner-arrow-wait">
            <div class="badge-row"><span class="badge">空档等待</span></div>
            <h4>等待关键窗口</h4>
            <p>${formatPlannerWeekdayTime(record.plantAt)} → ${formatPlannerWeekdayTime(record.harvestAt)}</p>
            <strong>不种植</strong>
            <small>${escapeHtml(record.reason || "等待后续窗口")}</small>
          </article>
        `;
      }

      const badges = [
        record.locked ? `<span class="badge blue">当前作物</span>` : "",
        record.goal === "coins" ? `<span class="badge amber">周末目标</span>` : `<span class="badge green">经验优先</span>`,
        record.doubleHarvest ? `<span class="badge rose">双倍收获</span>` : "",
        record.sleepDelayMs > 0 ? `<span class="badge">睡眠避让</span>` : ""
      ].join("");

      const selfWaterEvents = record.waterEvents
        .filter(event => !event.label.includes("好友") && (record.locked || event.label !== "首次自浇"))
        .map(event => `${event.label} ${formatPlannerTime(event.at)}${event.delayedFrom ? "（睡眠后）" : ""}`);

      return `
        <article class="planner-arrow-card ${record.goal === "coins" ? "planner-arrow-coins" : ""}">
          <div class="badge-row">${badges}</div>
          <h4>${escapeHtml(record.name)}</h4>
          <p>${formatPlannerWeekdayTime(record.plantAt)} 种下 → ${formatPlannerWeekdayTime(record.harvestAt)} 收获</p>
          <strong>${record.goal === "coins" ? "推进周末目标" : "经验优先"}</strong>
          <small>${formatNumber(record.expGain)} 经验 · ${formatNumber(record.coinGain)} 百工币${record.targetGain > 0 ? ` · 目标 +${formatNumber(record.targetGain)}` : ""}</small>
          ${selfWaterEvents.length ? `<div class="planner-arrow-water">${escapeHtml(selfWaterEvents.join(" · "))}</div>` : ""}
          ${record.reason ? `<div class="planner-reason">${escapeHtml(record.reason)}</div>` : ""}
        </article>
      `;
    }

    function renderPlannerTimeline(records) {
      const futureRecords = records.filter(record => record.harvestAt >= plannerState.startedAt);
      if (!futureRecords.length) {
        return `
          <div class="value-empty">
            <strong>本周规划已结束</strong>
            <span>7 天窗口内没有更多可安排的收获。</span>
          </div>
        `;
      }

      const grouped = futureRecords.reduce((groups, record) => {
        const key = formatPlannerDate(record.plantAt);
        if (!groups[key]) groups[key] = [];
        groups[key].push(record);
        return groups;
      }, {});

      return `
        <div class="planner-timeline">
          ${Object.entries(grouped).map(([date, items]) => `
            <section class="planner-day">
              <h3>${escapeHtml(date)}</h3>
              <div class="planner-block-list">
                ${items.map(renderPlannerRecord).join("")}
              </div>
            </section>
          `).join("")}
        </div>
      `;
    }

    function renderPlannerRecord(record) {
      if (record.type === "wait") {
        return `
          <article class="planner-block planner-block-wait">
            <div class="planner-block-top">
              <div>
                <div class="badge-row"><span class="badge">空档等待</span></div>
                <h4>等待关键窗口</h4>
                <p>${formatPlannerDateTime(record.plantAt)} → ${formatPlannerDateTime(record.harvestAt)} · ${formatDuration(record.durationMs, true)}</p>
              </div>
              <div class="planner-yield">
                <strong>不种植</strong>
                <span>等待后续窗口</span>
              </div>
            </div>
            ${renderPlannerProgressRail(record)}
            ${record.reason ? `<div class="planner-reason">${escapeHtml(record.reason)}</div>` : ""}
          </article>
        `;
      }

      const waterChips = record.waterEvents
        .filter(event => record.locked || event.label !== "首次自浇")
        .map(event => `<span>${escapeHtml(event.label)} ${formatPlannerTime(event.at)}${event.delayedFrom ? "（睡眠后）" : ""}</span>`)
        .join("");
      const badges = [
        record.locked ? `<span class="badge blue">当前作物</span>` : "",
        record.goal === "coins" ? `<span class="badge amber">周末目标</span>` : `<span class="badge green">经验优先</span>`,
        record.doubleHarvest ? `<span class="badge rose">双倍收获</span>` : "",
        record.sleepDelayMs > 0 ? `<span class="badge">睡眠避让</span>` : ""
      ].join("");

      return `
        <article class="planner-block">
          <div class="planner-block-top">
            <div>
              <div class="badge-row">${badges}</div>
              <h4>${escapeHtml(record.name)}</h4>
              <p>${escapeHtml(record.crop.short)} · ${formatDuration(record.durationMs, true)} · 预计 ${formatPlannerDateTime(record.harvestAt)} 收获</p>
            </div>
            <div class="planner-yield">
              <strong>${formatNumber(record.expGain)} 经验</strong>
              <span>${formatNumber(record.coinGain)} 百工币${record.targetGain > 0 ? ` · 目标 +${formatNumber(record.targetGain)}` : ""}</span>
            </div>
          </div>
          ${renderPlannerProgressRail(record)}
          <div class="planner-event-row">${waterChips}${record.sleepDelayMs > 0 ? `<span>睡眠避让 ${formatDuration(record.sleepDelayMs, true)}</span>` : ""}</div>
          ${record.reason ? `<div class="planner-reason">${escapeHtml(record.reason)}</div>` : ""}
        </article>
      `;
    }

    function renderPlannerProgressRail(record) {
      const duration = Math.max(MINUTE, record.harvestAt - record.plantAt);
      const rawMarkers = [
        { at: record.plantAt, label: record.type === "wait" ? "开始等" : record.locked ? "当前" : "种下", align: "start" },
        ...record.waterEvents
          .filter(event => !event.label.includes("好友") && (record.locked || event.label !== "首次自浇"))
          .map(event => ({
            at: event.at,
            label: `→ ${formatPlannerTime(event.at)} 浇水`,
            align: "middle"
          })),
        ...(record.sleepDelayMs > 0 ? [{ at: record.matureAt, label: "→ 睡眠中成熟", align: "middle" }] : []),
        { at: record.harvestAt, label: record.type === "wait" ? "结束等" : "收获", align: "end" }
      ];
      const markers = rawMarkers.map(marker => ({
        ...marker,
        pct: clamp(((marker.at - record.plantAt) / duration) * 100, 0, 100),
        showLabel: true
      }));

      markers.forEach((marker, index) => {
        if (marker.align !== "middle") return;
        const tooCloseToEnd = Math.abs(marker.pct - 100) < 7;
        const tooCloseToPrevious = markers[index - 1] && Math.abs(marker.pct - markers[index - 1].pct) < 4;
        const tooCloseToNext = markers[index + 1] && Math.abs(marker.pct - markers[index + 1].pct) < 4;
        if (tooCloseToEnd || tooCloseToPrevious || tooCloseToNext) marker.showLabel = false;
        if (tooCloseToEnd) marker.hideDot = true;
      });

      return `
        <div class="planner-rail">
          <div class="planner-rail-track">
            <div class="planner-rail-fill"></div>
            ${markers.map(marker => {
              return `
                <span class="planner-rail-marker ${marker.align}" style="left:${marker.pct}%">
                  ${marker.hideDot ? "" : "<i></i>"}${marker.showLabel ? `<small>${escapeHtml(marker.label)}<br>${formatPlannerTime(marker.at)}</small>` : ""}
                </span>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }

    function plantPlannerRecommendation(archiveId) {
      if (state.farm) {
        showToast("当前已有作物", "请先收获或删除当前作物，再按规划种下一批。", "warn");
        return;
      }

      const preview = buildPlannerPreview();
      const nextBlock = preview.records.find(record => !record.locked && record.archiveId === archiveId);
      const archiveItem = cropArchiveItems.find(item => item.id === archiveId);

      if (!nextBlock || !archiveItem) {
        showToast("推荐已变化", "规划刚刚重新计算，请按最新推荐操作。", "warn");
        renderPlanner();
        return;
      }

      if (nextBlock.plantAt > Date.now() + 2 * MINUTE) {
        showToast("还没到推荐时间", `建议 ${formatPlannerDateTime(nextBlock.plantAt)} 再种。`, "warn");
        return;
      }

      const now = Date.now();
      const rule = cropRule(archiveItem.cropKey);
      state.farm = {
        id: `farm-${now}`,
        cropKey: archiveItem.cropKey,
        plantedAt: now,
        lastSelfWaterAt: now,
        selfWaterCount: 1,
        friendWaterCount: 0,
        sunbinUsed: false,
        sunbinReductionMs: 0,
        totalReductionMs: rule.firstWaterReduce,
        archiveId: archiveItem.id,
        archiveName: archiveItem.name,
        archiveFarmLevel: archiveItem.farmLevel,
        planner: {
          archiveId: archiveItem.id,
          cropName: archiveItem.name,
          goal: nextBlock.goal,
          targetArchiveId: nextBlock.goal === "coins" ? archiveItem.id : "",
          plannedHarvestAt: nextBlock.harvestAt,
          plannedAt: now
        },
        history: [
          historyItem(`按一键规划种下：${archiveItem.name}`, now),
          historyItem(`首次浇水：减少 ${formatDuration(rule.firstWaterReduce, true)}`, now)
        ]
      };

      localStorage.removeItem(NOTIFY_KEY);
      saveState();
      render();
      renderPlanner();
      showToast("已按规划种下", `${archiveItem.name} 已进入当前作物管理。`, "good");
    }

    function getRanchGroupInfo(meta, now = Date.now()) {
      const group = getRanchGroup(meta.key);
      const selection = getPreferredRanchAnimal(meta.durationHours);
      const animal = selection.animal;
      const harvestDuration = animal ? getAnimalHarvestDuration(animal) : meta.durationHours * HOUR * 0.75;
      const active = group.count > 0;
      const timed = active && Boolean(group.startedAt);
      const harvestAt = timed ? group.startedAt + harvestDuration : 0;
      const remaining = timed ? harvestAt - now : harvestDuration;
      const progress = timed ? clamp(((now - group.startedAt) / harvestDuration) * 100, 0, 100) : 0;

      return {
        meta,
        group,
        animal,
        levelLimited: selection.levelLimited,
        currentLevel: selection.currentLevel,
        active,
        timed,
        harvestDuration,
        harvestAt,
        remaining,
        progress: timed && now < harvestAt && progress >= 100 ? 99.9 : progress,
        ready: timed && remaining <= 0,
        missing: active && !animal
      };
    }

    function getRanchInfos(now = Date.now()) {
      return RANCH_GROUPS.map(meta => getRanchGroupInfo(meta, now));
    }

    function getRanchReadyAnimalCount(infos) {
      return infos.filter(info => info.ready).reduce((total, info) => total + info.group.count, 0);
    }

    function renderRanchHome() {
      if (!els.ranchHomeArea) return;
      const now = Date.now();
      const infos = getRanchInfos(now);
      const activeInfos = infos.filter(info => info.active);
      const timedInfos = infos.filter(info => info.active && info.animal && info.timed);
      const readyInfos = timedInfos.filter(info => info.ready);
      const nextInfo = timedInfos.slice().sort((a, b) => a.harvestAt - b.harvestAt)[0] || null;
      const stallMultiplier = getAnimalStallMultiplier();
      const activeCount = getRanchActiveCount();
      const readyAnimalCount = getRanchReadyAnimalCount(infos);
      const harvestActionInfos = activeInfos.filter(info => info.animal);
      const ranchHomeActions = [
        ...harvestActionInfos.map(info => `
          <button class="btn ${info.ready ? "green" : "ghost"} ranch-home-harvest-btn" type="button" data-ranch-home-harvest-group="${escapeHtml(info.meta.key)}" aria-label="收获${escapeHtml(info.meta.shortLabel)}批次">
            <span class="btn-icon" aria-hidden="true">${info.ready ? "✅" : "🐮"}</span><span>收获</span>
          </button>
        `),
        `<a class="btn ghost ranch-home-settings-link" href="ranch.html"><span class="btn-icon" aria-hidden="true">⚙️</span><span>设置牧场</span></a>`
      ].join("");

      els.ranchHomeArea.innerHTML = `
        <section class="panel ranch-home-panel">
          <div class="panel-head planner-head">
            <div class="panel-icon" style="background:#eef2ff;color:#4338ca;">🐮</div>
            <div>
              <h2>牧场提醒</h2>
              <p>${activeCount ? `当前 ${formatNumber(activeCount)} / ${formatNumber(ranchState.slotCount)} 只动物在养殖，动物摊 Lv.${formatNumber(ranchState.stallLevel)}，售价倍率 ${formatNumber(stallMultiplier)}。` : "填写 16 小时和 20 小时动物数量后，主页会显示最近需要收获的动物。"}</p>
            </div>
            <div class="ranch-home-top-actions">
              ${ranchHomeActions}
            </div>
          </div>

          ${activeCount ? `
            <div class="ranch-home-summary">
              <div class="value-rank">
                <span>最近收获</span>
                <strong>${nextInfo ? (nextInfo.ready ? "现在" : formatDuration(nextInfo.remaining)) : "待设置"}</strong>
                <small>${nextInfo ? `${escapeHtml(nextInfo.animal.name)} × ${formatNumber(nextInfo.group.count)} · ${formatClock(nextInfo.harvestAt)}` : "去牧场页保存剩余时间"}</small>
              </div>
              <div class="value-rank">
                <span>可收动物</span>
                <strong>${formatNumber(readyAnimalCount)} 只</strong>
                <small>${readyInfos.length ? readyInfos.map(info => `${info.meta.shortLabel} × ${formatNumber(info.group.count)}`).join("、") : "暂无到点动物"}</small>
              </div>
              <div class="value-rank">
                <span>养殖数量</span>
                <strong>${formatNumber(activeCount)} / ${formatNumber(ranchState.slotCount)}</strong>
                <small>16h ${formatNumber(getRanchGroup("h16").count)} 只 · 20h ${formatNumber(getRanchGroup("h20").count)} 只</small>
              </div>
            </div>
            <div class="ranch-home-list">
              ${activeInfos.slice().sort((a, b) => (a.harvestAt || Infinity) - (b.harvestAt || Infinity)).map(info => `
                <article class="ranch-home-item ${info.ready ? "is-ready" : ""}">
                  <span>${info.animal ? `${escapeHtml(info.animal.name)} · ${info.meta.label} × ${formatNumber(info.group.count)}` : `${info.meta.label} × ${formatNumber(info.group.count)} · 缺少动物档案`}</span>
                  <strong>${info.animal && info.timed ? (info.ready ? "可以收了" : formatDuration(info.remaining, true)) : "待设置"}</strong>
                </article>
              `).join("")}
            </div>
          ` : `
            <div class="value-empty">
              <strong>牧场还没有养殖数量</strong>
              <span>到牧场管理页填写 16 小时和 20 小时动物数量；动物会自动采用当前等级可用的最高等级档案。</span>
            </div>
          `}

          ${activeCount ? "" : `
            <div class="planner-next-actions ranch-home-actions">
              <a class="btn ghost" href="crop-archive.html">维护动物档案</a>
            </div>
          `}
        </section>
      `;

      els.ranchHomeArea.querySelectorAll("[data-ranch-home-harvest-group]").forEach(button => {
        button.addEventListener("click", () => harvestRanchGroup(button.dataset.ranchHomeHarvestGroup));
      });
    }

    function renderRanchPage() {
      if (!els.ranchBatchList) return;
      if (els.ranchBatchList.contains(document.activeElement) && document.activeElement?.matches("input")) return;

      const infos = getRanchInfos();
      const activeCount = getRanchActiveCount();
      const readyCount = getRanchReadyAnimalCount(infos);
      const timedCount = infos.filter(info => info.active && info.timed).reduce((total, info) => total + info.group.count, 0);
      const stallMultiplier = getAnimalStallMultiplier();

      if (els.ranchSummary) {
        els.ranchSummary.innerHTML = `
          <div class="value-rank">
            <span>动物摊倍率</span>
            <strong>${formatNumber(stallMultiplier)}</strong>
            <small>Lv.${formatNumber(ranchState.stallLevel)} · 每级 +5%</small>
          </div>
          <div class="value-rank">
            <span>栏位占用</span>
            <strong>${formatNumber(activeCount)} / ${formatNumber(ranchState.slotCount)}</strong>
            <small>16h ${formatNumber(getRanchGroup("h16").count)} 只 · 20h ${formatNumber(getRanchGroup("h20").count)} 只</small>
          </div>
          <div class="value-rank">
            <span>当前可收</span>
            <strong>${formatNumber(readyCount)} 只</strong>
            <small>${timedCount ? `${formatNumber(timedCount)} 只已保存计时` : "填写剩余时间后开始提醒"}</small>
          </div>
        `;
      }

      els.ranchBatchList.innerHTML = infos.map(renderRanchGroupCard).join("");
    }

    function renderRanchGroupCard(info) {
      const meta = info.meta;
      const group = info.group;
      const remainingParts = getRanchRemainingInputParts(info);
      const economy = info.animal ? getAnimalEconomy(info.animal) : null;
      const disabled = !info.active || !info.animal ? "disabled" : "";
      const countLabel = `${formatNumber(group.count)} 只`;
      const levelNote = info.levelLimited && info.animal
        ? `档案里没有 Lv.${formatNumber(info.currentLevel)} 可用的 ${meta.label}，暂按最高档案 Lv.${formatNumber(info.animal.farmLevel)} 显示。`
        : `自动采用当前居所等级 Lv.${formatNumber(info.currentLevel)} 可用的最高等级 ${meta.label}。`;

      if (!info.animal) {
        return `
          <article class="ranch-slot-card is-missing">
            <div class="ranch-slot-top">
              <div>
                <div class="badge-row"><span class="badge dark">${escapeHtml(meta.label)}</span><span class="badge amber">缺少档案</span></div>
                <h3>${escapeHtml(meta.label)}</h3>
                <p>档案库还没有 ${meta.label} 数据。录入后，这一组会自动使用最高等级动物。</p>
              </div>
              <a class="btn primary" href="crop-archive.html">去录入动物</a>
            </div>
          </article>
        `;
      }

      return `
        <article class="ranch-slot-card ${info.ready ? "is-ready" : ""} ${info.active ? "" : "is-empty"}">
          <div class="ranch-slot-top">
            <div>
              <div class="badge-row">
                <span class="badge dark">${escapeHtml(meta.label)}</span>
                <span class="badge">🐮 ${escapeHtml(meta.role)}</span>
                ${info.ready ? `<span class="badge green">可以收获</span>` : info.active ? `<span class="badge amber">养殖中</span>` : `<span class="badge">未养殖</span>`}
                ${info.levelLimited ? `<span class="badge rose">等级未覆盖</span>` : ""}
              </div>
              <h3>${escapeHtml(info.animal.name)} × ${countLabel}</h3>
              <p>${levelNote}</p>
            </div>
            <div class="ranch-slot-actions">
              ${info.active ? `<button class="btn green" type="button" data-ranch-harvest-group="${escapeHtml(meta.key)}">我收获了</button>` : ""}
              ${info.active ? `<button class="btn rose" type="button" data-ranch-clear-group="${escapeHtml(meta.key)}">清空这组</button>` : ""}
            </div>
          </div>

          <div class="metric-grid ranch-metric-grid">
            <div class="metric">
              <div class="metric-label">养殖数量</div>
              <div class="metric-value">${countLabel}</div>
              <div class="metric-sub">总栏位 ${formatNumber(ranchState.slotCount)}，数量在上方填写</div>
            </div>
            <div class="metric">
              <div class="metric-label">剩余收获</div>
              <div class="metric-value">${info.active && info.timed ? (info.ready ? "现在可收" : formatDuration(info.remaining)) : "待保存"}</div>
              <div class="metric-sub">催产周期 ${formatDuration(info.harvestDuration, true)}</div>
            </div>
            <div class="metric">
              <div class="metric-label">每轮净收益 / 只</div>
              <div class="metric-value">${formatNumber(economy.netCoins)}</div>
              <div class="metric-sub">售价 ${formatNumber(economy.productSale)} - 饲料 ${formatNumber(info.animal.feedCost)}</div>
            </div>
          </div>

          <div class="form-grid ranch-batch-time-grid">
            <label class="time-field" for="${escapeHtml(meta.remainHoursId)}">
              <span>剩余小时</span>
              <input id="${escapeHtml(meta.remainHoursId)}" class="input" type="number" min="0" step="1" inputmode="numeric" value="${remainingParts.hours}" ${disabled} />
            </label>
            <label class="time-field" for="${escapeHtml(meta.remainMinutesId)}">
              <span>剩余分钟</span>
              <input id="${escapeHtml(meta.remainMinutesId)}" class="input" type="number" min="0" max="59" step="1" inputmode="numeric" value="${remainingParts.minutes}" ${disabled} />
            </label>
            <button class="btn primary ranch-slot-start" type="button" data-ranch-save-group="${escapeHtml(meta.key)}" ${disabled}>保存${escapeHtml(meta.shortLabel)}剩余时间</button>
          </div>

          ${info.active ? `
            <div class="progress-wrap">
              <div class="progress-top"><span>催产收获进度</span><span>${info.progress.toFixed(1)}%</span></div>
              <div class="progress"><div class="progress-bar" style="width:${info.progress}%;"></div></div>
              <div class="progress-note">${info.timed ? `预计 ${formatClock(info.harvestAt)} 可收。` : "填写游戏显示的剩余收获时间后，主页和提醒会开始倒计时。"}</div>
            </div>
          ` : ""}

          ${group.history.length ? `
            <details class="history">
              <summary>本组记录</summary>
              <div class="history-list">
                ${group.history.slice(0, 8).map(item => `<div class="history-item"><span>${escapeHtml(item.text)}</span><span class="history-time">${formatClock(item.at)}</span></div>`).join("")}
              </div>
            </details>
          ` : ""}
        </article>
      `;
    }

    function getRanchRemainingInputParts(info) {
      const remaining = info.active && info.timed ? Math.max(0, info.harvestAt - Date.now()) : info.harvestDuration;
      const totalMinutes = Math.ceil(remaining / MINUTE);
      return {
        hours: Math.floor(totalMinutes / 60),
        minutes: totalMinutes % 60
      };
    }

    function saveRanchGroupTime(groupKey) {
      const meta = getRanchGroupMeta(groupKey);
      if (!meta) return;
      if (!readRanchSettingsIntoState(groupKey)) {
        showToast("牧场数量格式不对", "栏位数、16小时数量和20小时数量都需要填写为整数。", "warn");
        return;
      }
      syncRanchFormInputs();

      const info = getRanchGroupInfo(meta);
      if (!info.active) {
        showToast("还没有填写数量", `先在上方填写 ${meta.label} 的数量。`, "warn");
        return;
      }
      if (!info.animal) {
        showToast("缺少动物档案", `先在档案库录入 ${meta.label} 动物。`, "warn");
        return;
      }

      const hourInput = document.getElementById(meta.remainHoursId);
      const minuteInput = document.getElementById(meta.remainMinutesId);
      const remainingMs = hourInput && minuteInput ? readDurationInputs(hourInput, minuteInput) : null;
      if (remainingMs === null) {
        showToast("剩余时间格式不对", "小时和分钟请填写为 0 或正整数。", "warn");
        return;
      }
      if (remainingMs > info.harvestDuration + MINUTE) {
        showToast("剩余时间超出范围", `${info.animal.name} 催产周期最多 ${formatDuration(info.harvestDuration, true)}。`, "warn");
        return;
      }

      const now = Date.now();
      const group = getRanchGroup(meta.key);
      group.startedAt = now + remainingMs - info.harvestDuration;
      group.history = [
        historyItem(`保存${meta.label}：${info.animal.name} × ${formatNumber(group.count)}，剩余 ${formatDuration(remainingMs, true)}`, now),
        ...(group.history || [])
      ].slice(0, 12);
      ranchState.updatedAt = now;
      saveRanchState();
      renderRanchHome();
      renderRanchPage();
      showToast("已保存牧场计时", `${info.animal.name} × ${formatNumber(group.count)} 将在 ${formatClock(group.startedAt + info.harvestDuration)} 提醒收获。`, "good");
    }

    function harvestRanchGroup(groupKey) {
      const meta = getRanchGroupMeta(groupKey);
      if (!meta) return;
      const info = getRanchGroupInfo(meta);
      if (!info.active || !info.animal) {
        showToast("这一组还没有动物", "先填写数量并保存剩余时间。", "warn");
        return;
      }

      if (info.timed && !info.ready && !confirm(`${info.animal.name} × ${formatNumber(info.group.count)} 还没有到催产收获时间，确认已经在游戏内收获了吗？`)) return;

      const now = Date.now();
      const group = getRanchGroup(meta.key);
      group.startedAt = now;
      group.history = [
        historyItem(`收获 ${info.animal.name} × ${formatNumber(group.count)}，开始新一轮计时`, now),
        ...(group.history || [])
      ].slice(0, 12);
      ranchState.updatedAt = now;
      saveRanchState();
      localStorage.removeItem(NOTIFY_KEY);
      renderRanchHome();
      renderRanchPage();
      showToast("动物收获已记录", `${info.animal.name} × ${formatNumber(group.count)} 已开始新一轮 ${formatDuration(info.harvestDuration, true)} 计时。`, "good");
    }

    function clearRanchGroup(groupKey) {
      const meta = getRanchGroupMeta(groupKey);
      if (!meta) return;
      const info = getRanchGroupInfo(meta);
      if (info.active && !confirm(`确认清空 ${meta.label} 的 ${formatNumber(info.group.count)} 只动物吗？`)) return;

      const group = getRanchGroup(meta.key);
      group.count = 0;
      group.startedAt = 0;
      group.history = [];
      ranchState.updatedAt = Date.now();
      fitRanchGroupCounts(ranchState, "");
      syncRanchFormInputs();
      saveRanchState();
      localStorage.removeItem(NOTIFY_KEY);
      renderRanchHome();
      renderRanchPage();
      renderAnimalArchive();
      showToast("已清空这一组", `${meta.label} 数量已归零。`);
    }

    function timeValueToMinutes(value) {
      if (!isValidTimeValue(value)) return 0;
      const [hours, minutes] = value.split(":").map(Number);
      return hours * 60 + minutes;
    }

    function getDayMinutes(timestamp) {
      const date = new Date(timestamp);
      return date.getHours() * 60 + date.getMinutes();
    }

    function isInSleep(timestamp, settings) {
      const start = settings.sleepStartMinutes;
      const end = settings.sleepEndMinutes;
      if (start === end) return false;
      const minutes = getDayMinutes(timestamp);
      return start < end
        ? minutes >= start && minutes < end
        : minutes >= start || minutes < end;
    }

    function moveOutOfSleep(timestamp, settings) {
      if (!isInSleep(timestamp, settings)) return timestamp;
      const date = new Date(timestamp);
      const end = settings.sleepEndMinutes;
      const endHours = Math.floor(end / 60);
      const endMinutes = end % 60;
      const minutes = getDayMinutes(timestamp);
      const sleepOvernight = settings.sleepStartMinutes > settings.sleepEndMinutes;

      if (sleepOvernight && minutes >= settings.sleepStartMinutes) {
        date.setDate(date.getDate() + 1);
      }

      date.setHours(endHours, endMinutes, 0, 0);
      return date.getTime();
    }

    function getNextSleepEnd(timestamp, settings) {
      const date = new Date(timestamp);
      const end = settings.sleepEndMinutes;
      const endHours = Math.floor(end / 60);
      const endMinutes = end % 60;
      date.setHours(endHours, endMinutes, 0, 0);
      if (date.getTime() <= timestamp + MINUTE) {
        date.setDate(date.getDate() + 1);
      }
      return date.getTime();
    }

    function getLatestAwakeBeforeSleep(timestamp, settings) {
      if (!isInSleep(timestamp, settings)) return null;

      const date = new Date(timestamp);
      const start = settings.sleepStartMinutes;
      const startHours = Math.floor(start / 60);
      const startMinutes = start % 60;
      const minutes = getDayMinutes(timestamp);
      const sleepOvernight = settings.sleepStartMinutes > settings.sleepEndMinutes;

      if (sleepOvernight && minutes < settings.sleepEndMinutes) {
        date.setDate(date.getDate() - 1);
      }

      date.setHours(startHours, startMinutes, 0, 0);
      return date.getTime() - MINUTE;
    }

    function getLocalDayStart(timestamp) {
      const date = new Date(timestamp);
      date.setHours(0, 0, 0, 0);
      return date.getTime();
    }

    function getMondayStart(timestamp) {
      const date = new Date(getLocalDayStart(timestamp));
      const day = date.getDay();
      const offset = (day + 6) % 7;
      date.setDate(date.getDate() - offset);
      return date.getTime();
    }

    function getDoubleWindowByStart(start) {
      return { start, end: start + (2 * DAY + 16 * HOUR) };
    }

    function getDoubleWindowFor(timestamp) {
      const monday = getMondayStart(timestamp);
      return getDoubleWindowByStart(monday + 4 * DAY + 8 * HOUR);
    }

    function getCurrentOrNextDoubleWindow(timestamp) {
      const window = getDoubleWindowFor(timestamp);
      if (timestamp < window.start) return window;
      if (timestamp < window.end) return window;
      return getDoubleWindowByStart(window.start + 7 * DAY);
    }

    function isBeforeUpcomingDoubleEnd(timestamp) {
      const window = getCurrentOrNextDoubleWindow(timestamp);
      return timestamp < window.end;
    }

    function isDoubleHarvest(timestamp) {
      const window = getDoubleWindowFor(timestamp);
      return timestamp >= window.start && timestamp < window.end;
    }

    function formatPlannerDate(timestamp) {
      return new Intl.DateTimeFormat("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        weekday: "short"
      }).format(new Date(timestamp));
    }

    function formatPlannerTime(timestamp) {
      return new Intl.DateTimeFormat("zh-CN", {
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date(timestamp));
    }

    function formatPlannerDateTime(timestamp) {
      return new Intl.DateTimeFormat("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date(timestamp));
    }

    function formatPlannerWeekdayTime(timestamp) {
      return new Intl.DateTimeFormat("zh-CN", {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit"
      }).format(new Date(timestamp));
    }

    function historyItem(text, at = Date.now()) {
      return { id: `${at}-${Math.random().toString(36).slice(2)}`, text, at };
    }

    async function enableNotifications() {
      ensureAudio();

      if (!("Notification" in window)) {
        updateNotifyUI("unsupported");
        showToast("浏览器不支持系统通知", "仍会使用页面内提示和铃声。页面关闭后无法提醒。");
        return;
      }

      try {
        let permission = Notification.permission;
        if (permission === "default") {
          permission = await Notification.requestPermission();
        }

        updateNotifyUI(permission);

        if (permission === "granted") {
          showReminder("提醒已开启", "这是一次测试通知。后续到浇水或收菜时间会提醒你。", { forceSystem: true });
        } else if (permission === "denied") {
          showToast("通知权限被拒绝", "需要在浏览器地址栏或网站设置里重新允许通知。页面内提示仍可用。", "bad");
        } else {
          showToast("尚未授权通知", "浏览器没有返回允许结果。页面内提示仍可用。", "warn");
        }
      } catch (err) {
        updateNotifyUI("error");
        showToast("通知开启失败", "当前环境可能不是 HTTPS/localhost，或浏览器限制了本地文件通知。页面内提示仍可用。", "bad");
      }
    }

    function updateNotifyUI(permissionOverride) {
      if (!els.notifyBtn && !els.notifyStatus) return;
      const permission = permissionOverride || (("Notification" in window) ? Notification.permission : "unsupported");
      const secureText = window.isSecureContext ? "当前页面是安全上下文。" : "当前页面不是安全上下文，部分浏览器会禁止系统通知。建议用 localhost 或 HTTPS 打开。";

      if (permission === "granted") {
        if (els.notifyBtn) {
          els.notifyBtn.textContent = "🔔 提醒已开启";
          els.notifyBtn.disabled = true;
        }
        if (els.notifyStatus) {
          els.notifyStatus.className = "notice good";
          els.notifyStatus.textContent = `系统通知已允许。${secureText} 注意：网页关闭后，单文件 HTML 无法继续后台提醒。`;
        }
      } else if (permission === "denied") {
        if (els.notifyBtn) {
          els.notifyBtn.textContent = "🔕 通知被浏览器拒绝";
          els.notifyBtn.disabled = false;
        }
        if (els.notifyStatus) {
          els.notifyStatus.className = "notice bad";
          els.notifyStatus.textContent = "系统通知权限已被拒绝。请在浏览器的网站设置中重新允许通知；页面内弹窗和铃声仍可使用。";
        }
      } else if (permission === "unsupported") {
        if (els.notifyBtn) {
          els.notifyBtn.textContent = "🔕 不支持系统通知";
          els.notifyBtn.disabled = true;
        }
        if (els.notifyStatus) {
          els.notifyStatus.className = "notice warn";
          els.notifyStatus.textContent = "当前浏览器不支持 Notification API。只能在网页打开时使用页面内提醒。";
        }
      } else if (permission === "error") {
        if (els.notifyBtn) {
          els.notifyBtn.textContent = "🔔 重新尝试开启提醒";
          els.notifyBtn.disabled = false;
        }
        if (els.notifyStatus) {
          els.notifyStatus.className = "notice bad";
          els.notifyStatus.textContent = "刚才开启通知失败。常见原因：本地 file:// 环境、浏览器拦截通知、没有用户手势授权。建议用 VS Code Live Server 或部署到 HTTPS。";
        }
      } else {
        if (els.notifyBtn) {
          els.notifyBtn.textContent = "🔔 开启浏览器提醒";
          els.notifyBtn.disabled = false;
        }
        if (els.notifyStatus) {
          els.notifyStatus.className = window.isSecureContext ? "notice" : "notice warn";
          els.notifyStatus.textContent = `尚未开启系统通知。${secureText} 页面内提醒不需要权限，但网页关闭后不能提醒。`;
        }
      }
    }

    function checkDueReminders() {
      const farm = state.farm;
      const now = Date.now();
      const notified = loadNotifyState();
      const nextNotified = { ...notified };

      if (farm) {
        const matureAt = getMatureAt(farm);
        const crop = CROP_TYPES[farm.cropKey];
        const waterTarget = getWaterReminderTarget(farm, now);

        const waterKey = `${farm.id}-water-${waterTarget.type}-${farm.lastSelfWaterAt || "first"}-${farm.friendWaterCount}-${farm.sunbinUsed ? "sunbin" : "normal"}`;
        const harvestKey = `${farm.id}-harvest-${matureAt}`;

        if (waterTarget.at && now >= waterTarget.at && now < matureAt && !notified[waterKey]) {
          showReminder(waterTarget.label, `${crop.short} ${waterTarget.sub}。回游戏浇水后在工具里打卡。`);
          nextNotified[waterKey] = true;
        }

        if (now >= matureAt && !notified[harvestKey]) {
          showReminder("可以收菜了", `${crop.short} 已成熟，建议回游戏收获。`);
          nextNotified[harvestKey] = true;
        }
      }

      getRanchInfos(now).forEach(info => {
        if (!info.animal || !info.timed || !info.active) return;
        const ranchKey = `ranch-${info.meta.key}-${info.group.count}-${info.group.startedAt}-${info.harvestAt}`;
        if (now >= info.harvestAt && !notified[ranchKey]) {
          showReminder("可以收动物产物了", `${info.animal.name} × ${formatNumber(info.group.count)} 已到催产收获时间。`);
          nextNotified[ranchKey] = true;
        }
      });

      saveNotifyState(nextNotified);
    }

    function showReminder(title, body, options = {}) {
      showToast(title, body, "good");
      beep();

      if (!("Notification" in window)) return;
      if (Notification.permission !== "granted") return;

      try {
        new Notification(title, {
          body,
          silent: false,
          tag: `wzry-farm-${title}`,
          renotify: true
        });
      } catch (err) {
        if (options.forceSystem) showToast("系统通知未能弹出", "浏览器可能限制当前打开方式。页面内提醒和铃声仍可用。", "warn");
      }
    }

    function ensureAudio() {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        if (!audioCtx) audioCtx = new AudioContext();
        if (audioCtx.state === "suspended") audioCtx.resume();
      } catch (err) {}
    }

    function beep() {
      try {
        if (!audioCtx) return;
        const now = audioCtx.currentTime;

        // 柔和两段式提示音：低音量、短包络、轻微延迟，避免尖锐“哔”声。
        playTone(659.25, now, 0.32, 0.045, "sine");
        playTone(783.99, now + 0.18, 0.42, 0.038, "sine");
      } catch (err) {}
    }

    function playTone(freq, start, duration, volume, type = "sine") {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(volume, start + 0.035);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(start);
      osc.stop(start + duration + 0.03);
    }

    function render() {
      if (!els.farmArea) return;
      const farm = state.farm;
      if (!farm) {
        renderEmpty();
        renderStatsEmpty();
        return;
      }

      const crop = CROP_TYPES[farm.cropKey];
      const archiveItem = getFarmArchiveItem(farm);
      const displayName = farm.planner?.cropName || farm.archiveName || archiveItem?.name || crop.label;
      const archiveDesc = archiveItem
        ? `档案 Lv.${formatNumber(archiveItem.farmLevel)} · ${formatNumber(archiveItem.exp)} 经验 · ${formatNumber(archiveItem.coins)} 基准百工币`
        : crop.purpose;
      const now = Date.now();
      const matureAt = getMatureAt(farm);
      const remaining = matureAt - now;
      const matured = remaining <= 0;
      const progress = getProgress(farm, now);
      const progressNote = getProgressNote(farm, now);
      const waterHint = getWaterHint(farm, now);
      const rule = cropRule(farm.cropKey);
      const friendRemain = rule.friendMaxCount - farm.friendWaterCount;
      const sunbinReduction = farm.sunbinUsed ? (farm.sunbinReductionMs || getSunbinReduction(farm.cropKey)) : getSunbinReduction(farm.cropKey);
      const theoreticalPlan = getCurrentTheoreticalPlan(farm, now);
      const waterTarget = getWaterReminderTarget(farm, now, theoreticalPlan);
      const bestFinalWater = formatBestFinalWater(theoreticalPlan, matured);
      const theoreticalParts = [
        `从当前状态约 ${formatDuration(theoreticalPlan.durationMs, true)}`,
        theoreticalPlan.friendWaterCount > 0 ? `含剩余好友 ${theoreticalPlan.friendWaterCount} 次` : "不含额外好友浇水",
        theoreticalPlan.intermediateSelfWaterCount > 0
          ? `中途自浇 ${theoreticalPlan.intermediateSelfWaterCount} 次`
          : theoreticalPlan.finalWaterAt ? "收尾自浇优化" : theoreticalPlan.label
      ];

      renderStats(farm, crop, matureAt, waterTarget, theoreticalPlan, matured, remaining);

      els.farmArea.innerHTML = `
        <article class="farm-card">
          <div class="farm-gradient ${crop.gradient}"></div>
          <div class="farm-body">
            <div class="farm-title-row">
              <div class="farm-title-main">
                <div class="badge-row">
                  <span class="badge dark">整块菜地</span>
                  <span class="badge">${crop.icon} ${crop.short}</span>
                  ${archiveItem ? `<span class="badge green">📚 档案作物</span>` : ""}
                  ${farm.syncedFromGame ? `<span class="badge blue">⏱️ 游戏同步</span>` : ""}
                  ${farm.planner ? `<span class="badge blue">🧭 规划作物</span>` : ""}
                  ${farm.sunbinUsed ? `<span class="badge rose">⏩ 孙膑已催熟</span>` : ""}
                  ${matured ? `<span class="badge green">✅ 可收获</span>` : `<span class="badge amber">⏳ 生长中</span>`}
                </div>
                <div class="farm-name-line">
                  <div class="farm-copy">
                    <h2 class="farm-name">${escapeHtml(displayName)}</h2>
                    <p class="farm-desc">${farm.planner ? `${escapeHtml(crop.label)} · ${farm.planner.goal === "coins" ? "20小时周末目标" : "经验优先排期"} · ${escapeHtml(archiveDesc)}` : `${escapeHtml(crop.label)} · ${escapeHtml(archiveDesc)}`}</p>
                  </div>
                  <div class="farm-title-tools">
                    <div class="farm-actions farm-actions-top">
                      <button class="btn primary" data-action="selfWater" ${matured || !waterHint.ready ? "disabled" : ""}><span class="btn-icon" aria-hidden="true">💧</span><span>我浇水了</span></button>
                      <button class="btn green" data-action="friendWater" ${matured || farm.friendWaterCount >= 4 ? "disabled" : ""}><span class="btn-icon" aria-hidden="true">🤝</span><span>好友浇水 +1</span></button>
                      <button class="btn blue" data-action="sunbin" ${matured || farm.sunbinUsed ? "disabled" : ""}><span class="btn-icon" aria-hidden="true">⏩</span><span>孙膑催熟</span></button>
                      <button class="btn amber" data-action="harvest"><span class="btn-icon" aria-hidden="true">✅</span><span>收获完成</span></button>
                    </div>
                    <button class="btn rose farm-delete-action" data-action="delete"><span class="btn-icon" aria-hidden="true">🗑</span><span>删除记录</span></button>
                  </div>
                </div>
              </div>
            </div>

            <div class="metric-grid">
              <div class="metric">
                <div class="metric-label">⏰ 剩余成熟</div>
                <div class="metric-value">${matured ? "可以收菜了" : formatDuration(remaining)}</div>
                <div class="metric-sub">预计 ${formatClock(matureAt)}<br>理论最短 ${matured ? "已成熟" : formatClock(theoreticalPlan.fastestAt)}</div>
              </div>
              <div class="metric">
                <div class="metric-label">💧 距离最大间隔</div>
                <div class="metric-value">${matured ? "无需浇水" : waterTarget.value}</div>
                <div class="metric-sub">${matured ? "作物已成熟" : `${waterTarget.sub}<br>${waterTarget.type === "final" ? "最佳收尾早于最大间隔，按收尾时间提醒" : waterTarget.type === "first" ? "首次自浇直接满额，提醒后打卡即可" : "按最大间隔提醒，提前浇水仍可手动打卡"}`}</div>
              </div>
              <div class="metric">
                <div class="metric-label">🤝 好友浇水</div>
                <div class="metric-value">${farm.friendWaterCount}/4 次</div>
                <div class="metric-sub">剩余 ${friendRemain} 次可计入减时</div>
              </div>
              <div class="metric">
                <div class="metric-label">⏩ 孙膑催熟</div>
                <div class="metric-value">${farm.sunbinUsed ? "已计入" : "未使用"}</div>
                <div class="metric-sub">${farm.sunbinUsed ? `固定减少 ${formatDuration(sunbinReduction, true)}` : `可固定减少 ${formatDuration(sunbinReduction, true)}`}</div>
              </div>
              <div class="metric">
                <div class="metric-label">🚀 理论最短成熟</div>
                <div class="metric-value">${matured ? "已成熟" : formatClock(theoreticalPlan.fastestAt)}</div>
                <div class="metric-sub">${theoreticalParts.join(" · ")}</div>
              </div>
              <div class="metric">
                <div class="metric-label">🎯 最佳收尾浇水</div>
                <div class="metric-value">${bestFinalWater.value}</div>
                <div class="metric-sub">${bestFinalWater.sub}</div>
              </div>
            </div>

            <div class="progress-wrap">
              <div class="progress-top"><span>有效成长进度</span><span>${progress.toFixed(1)}%</span></div>
              <div class="progress"><div class="progress-bar" style="width:${progress}%;"></div></div>
              <div class="progress-note">${progressNote}。</div>
            </div>

            <div class="notice ${matured ? "good" : ""}">
              ${matured ? "作物已经成熟，可以回游戏收菜。" : farm.syncedFromGame ? `本记录已按游戏剩余成熟时间同步；历史浇水次数不反推，后续打卡会继续精确重算。当前作物${crop.roundMatureToMinute === false ? "不做成熟时间分钟取整。" : "成熟时间按分钟向上取整。"}` : `详细浇水、孙膑催熟、成熟和进度条规则已移到二级页面。当前作物${crop.roundMatureToMinute === false ? "不做成熟时间分钟取整。" : "成熟时间按分钟向上取整。"}`} <a href="rules.html">查看种菜规则</a>
            </div>

            <details class="history" open>
              <summary>打卡记录</summary>
              <div class="history-list">
                ${farm.history.length ? farm.history.slice(0, 20).map(item => `
                  <div class="history-item"><span>${escapeHtml(item.text)}</span><span class="history-time">${formatClock(item.at)}</span></div>
                `).join("") : `<div class="history-item">暂无记录</div>`}
              </div>
            </details>
          </div>
        </article>
      `;

      els.farmArea.querySelector('[data-action="selfWater"]')?.addEventListener("click", selfWater);
      els.farmArea.querySelector('[data-action="friendWater"]')?.addEventListener("click", friendWater);
      els.farmArea.querySelector('[data-action="sunbin"]')?.addEventListener("click", useSunbin);
      els.farmArea.querySelector('[data-action="harvest"]')?.addEventListener("click", harvestDone);
      els.farmArea.querySelector('[data-action="delete"]')?.addEventListener("click", () => {
        if (!confirm("确认删除当前作物记录吗？")) return;
        state.farm = null;
        localStorage.removeItem(NOTIFY_KEY);
        saveState();
        render();
        renderPlanner();
      });
    }

    function renderEmpty() {
      els.farmArea.innerHTML = `
        <div class="empty">
          <div>
            <div class="empty-icon">🌱</div>
            <h3>当前没有管理中的作物</h3>
            <p>在游戏里整块菜地批量种下同一种作物后，到左侧选择作物类型并打卡。首版不再按多块菜地拆分管理，更符合世界玩家的实际种菜方式。</p>
          </div>
        </div>
      `;
    }

    function renderStatsEmpty() {
      els.statStatus.textContent = "未种植";
      els.statStatusSub.textContent = "在左侧选择作物后开始管理";
      els.statHarvest.textContent = "—";
      els.statHarvestSub.textContent = "暂无成熟时间";
      els.statWater.textContent = "—";
      els.statWaterSub.textContent = "暂无待浇水作物";
      els.statFriend.textContent = "0/4";
    }

    function renderStats(farm, crop, matureAt, waterTarget, theoreticalPlan, matured, remaining) {
      els.statStatus.textContent = matured ? "可收获" : "生长中";
      els.statStatusSub.textContent = crop.short;
      els.statHarvest.textContent = matured ? "现在" : formatDuration(remaining, true);
      els.statHarvestSub.textContent = `预计 ${formatClock(matureAt)} · 理论最短 ${matured ? "已成熟" : formatClock(theoreticalPlan.fastestAt)}`;
      els.statWater.textContent = matured ? "—" : waterTarget.value;
      els.statWaterSub.textContent = matured ? "作物已成熟" : waterTarget.sub;
      els.statFriend.textContent = `${farm.friendWaterCount}/4`;
    }

    function showToast(title, body, type = "") {
      if (!els.toastZone) return;
      const toast = document.createElement("div");
      toast.className = "toast";
      if (type === "good") toast.style.borderColor = "#a7f3d0";
      if (type === "warn") toast.style.borderColor = "#fde68a";
      if (type === "bad") toast.style.borderColor = "#fecdd3";
      toast.innerHTML = `<div class="toast-title">${escapeHtml(title)}</div><div class="toast-body">${escapeHtml(body)}</div>`;
      els.toastZone.appendChild(toast);
      setTimeout(() => toast.remove(), 7200);
    }

    function formatNumber(value) {
      return new Intl.NumberFormat("zh-CN", {
        maximumFractionDigits: 2
      }).format(value);
    }

    function formatDuration(ms, compact = false) {
      if (ms <= 0) return "已到时间";
      const totalSeconds = Math.ceil(ms / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      if (days > 0) return compact ? `${days}天 ${hours}时` : `${days}天 ${hours}小时 ${minutes}分钟`;
      if (hours > 0) return compact ? `${hours}时 ${minutes}分` : `${hours}小时 ${minutes}分钟`;
      if (minutes > 0) return compact ? `${minutes}分 ${seconds}秒` : `${minutes}分钟 ${seconds}秒`;
      return `${seconds}秒`;
    }

    function formatClock(timestamp) {
      return new Intl.DateTimeFormat("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }).format(new Date(timestamp));
    }

    function escapeHtml(value) {
      return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }
