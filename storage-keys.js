(function () {
  const PORTABLE_DATA_VERSION = 1;
  const APP_ID = "HOKW_Farm";
  const PORTABLE_KEYS = [
    { key: "wzry-world-farm-helper-html-single-v3", label: "种植打卡" },
    { key: "wzry-world-farm-value-calculator-v1", label: "作物对比" },
    { key: "wzry-world-farm-value-calculator-options-v1", label: "计算器选项" },
    { key: "wzry-world-farm-crop-archive-v1", label: "作物档案" },
    { key: "wzry-world-farm-animal-archive-v1", label: "动物档案" },
    { key: "wzry-world-farm-ranch-v1", label: "牧场管理" },
    { key: "wzry-world-farm-animal-value-calculator-v1", label: "动物对比" },
    { key: "wzry-world-farm-planner-v1", label: "一键规划" },
    { key: "wzry-world-interest-circle-v1", label: "兴趣圈" }
  ];

  function getPortableKeys() {
    return PORTABLE_KEYS.map(item => ({ ...item }));
  }

  function buildPortableData(source) {
    const storage = {};
    const summary = [];

    PORTABLE_KEYS.forEach(item => {
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
      app: APP_ID,
      version: PORTABLE_DATA_VERSION,
      exportedAt: new Date().toISOString(),
      source: source || window.location.href,
      storage,
      summary
    };
  }

  function validatePortableData(payload) {
    const storage = payload?.storage && typeof payload.storage === "object" ? payload.storage : null;
    if (!storage) {
      return { ok: false, message: "没有找到可导入的本地数据。", items: [] };
    }

    const items = [];
    for (const item of PORTABLE_KEYS) {
      if (!Object.prototype.hasOwnProperty.call(storage, item.key)) continue;
      const rawValue = storage[item.key];
      const value = typeof rawValue === "string" ? rawValue : JSON.stringify(rawValue);
      try {
        JSON.parse(value);
      } catch (err) {
        return { ok: false, message: `${item.label} 数据无法解析。`, items: [] };
      }
      items.push({ ...item, value });
    }

    if (!items.length) {
      return { ok: false, message: "备份里没有当前版本认识的数据项。", items: [] };
    }

    return { ok: true, message: "", items };
  }

  function applyPortableData(payload) {
    const validation = validatePortableData(payload);
    if (!validation.ok) return validation;

    validation.items.forEach(item => {
      localStorage.setItem(item.key, item.value);
    });

    return validation;
  }

  function getPortableSnapshot() {
    const snapshot = {};
    PORTABLE_KEYS.forEach(item => {
      const value = localStorage.getItem(item.key);
      if (value !== null) snapshot[item.key] = value;
    });
    return snapshot;
  }

  function hasPortableData() {
    return PORTABLE_KEYS.some(item => localStorage.getItem(item.key) !== null);
  }

  function samePortableData(payload) {
    const storage = payload?.storage && typeof payload.storage === "object" ? payload.storage : null;
    if (!storage) return false;
    for (const item of PORTABLE_KEYS) {
      const localValue = localStorage.getItem(item.key);
      const hasRemote = Object.prototype.hasOwnProperty.call(storage, item.key);
      if (localValue === null && !hasRemote) continue;
      if (localValue === null || !hasRemote) return false;
      const remoteValue = typeof storage[item.key] === "string" ? storage[item.key] : JSON.stringify(storage[item.key]);
      if (localValue !== remoteValue) return false;
    }
    return true;
  }

  window.HOKW_STORAGE = Object.freeze({
    appId: APP_ID,
    portableDataVersion: PORTABLE_DATA_VERSION,
    portableKeys: Object.freeze(getPortableKeys()),
    getPortableKeys,
    buildPortableData,
    validatePortableData,
    applyPortableData,
    getPortableSnapshot,
    hasPortableData,
    samePortableData
  });
})();
