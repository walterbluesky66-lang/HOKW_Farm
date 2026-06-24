(() => {
  const STORAGE_KEY = "wzry-world-interest-circle-v1";
  const DAILY_TARGET = 206;
  const TOTAL_TARGET = 8200;
  const MS_PER_DAY = 24 * 60 * 60 * 1000;

  const DEFAULT_CATEGORIES = [
    {
      id: "douzhan",
      title: "斗战之志",
      tags: ["#斗战之志", "#孙尚香", "#出片需要趁热打铁"]
    },
    {
      id: "zhujia",
      title: "筑家之趣",
      tags: ["#筑家之趣", "#王昭君"]
    },
    {
      id: "zhinan",
      title: "指南之光",
      tags: ["#指南之光", "#西施"]
    },
    {
      id: "gushi",
      title: "故事之情",
      tags: ["#故事之情", "#花木兰"]
    },
    {
      id: "mumei",
      title: "慕美之心",
      tags: ["#慕美之心", "#冷春"]
    },
    {
      id: "zhiji",
      title: "知己之缘",
      tags: ["#知己之缘", "#伽罗"]
    },
    {
      id: "guangying",
      title: "光影之韵",
      tags: ["#光影之韵", "#伽罗"]
    },
    {
      id: "xianyou",
      title: "闲游之乐",
      tags: ["#闲游之乐", "#龙牙"]
    }
  ];

  const DEFAULT_ENTRIES = {
    "2026-06-20": {
      douzhan: 411,
      zhujia: 321,
      zhinan: 535,
      gushi: 320,
      mumei: 410,
      zhiji: 389,
      guangying: 831,
      xianyou: 230
    },
    "2026-06-21": {
      douzhan: 617,
      zhujia: 527,
      zhinan: 741,
      gushi: 526,
      mumei: 616,
      zhiji: 595,
      guangying: 1037,
      xianyou: 436
    }
  };

  const els = {
    date: document.getElementById("interestDate"),
    prevDay: document.getElementById("interestPrevDayBtn"),
    nextDay: document.getElementById("interestNextDayBtn"),
    today: document.getElementById("interestResetDateBtn"),
    summary: document.getElementById("interestSummary"),
    entryList: document.getElementById("interestEntryList"),
    categoryAddForm: document.getElementById("interestCategoryAddForm"),
    newCategoryTitle: document.getElementById("interestNewCategoryTitle"),
    newCategoryTags: document.getElementById("interestNewCategoryTags"),
    categoryList: document.getElementById("interestCategoryList"),
    toastZone: document.getElementById("interestToastZone")
  };

  let state = loadState();
  let selectedDate = getTodayKey();
  let editingCategoryId = "";

  init();

  function init() {
    if (!els.date || !els.entryList || !els.categoryList) return;

    els.date.value = selectedDate;
    els.date.addEventListener("change", () => {
      if (!isDateKey(els.date.value)) return;
      selectedDate = els.date.value;
      render();
    });
    els.prevDay.addEventListener("click", () => shiftSelectedDate(-1));
    els.nextDay.addEventListener("click", () => shiftSelectedDate(1));
    els.today.addEventListener("click", () => {
      selectedDate = getTodayKey();
      els.date.value = selectedDate;
      render();
    });
    els.entryList.addEventListener("change", handleEntryInput);
    els.entryList.addEventListener("click", handleEntryClick);
    els.categoryAddForm.addEventListener("submit", saveNewCategory);
    els.categoryList.addEventListener("click", handleCategoryClick);
    els.categoryList.addEventListener("submit", handleCategorySubmit);
    render();
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return normalizeState(raw ? JSON.parse(raw) : null);
    } catch (err) {
      return normalizeState(null);
    }
  }

  function normalizeState(raw) {
    const now = Date.now();
    const base = raw && typeof raw === "object" ? raw : {};
    const rawCategories = Array.isArray(base.categories) ? base.categories : DEFAULT_CATEGORIES;
    const categories = rawCategories
      .map((category, index) => normalizeCategory(category, index, now))
      .filter(Boolean);
    const entries = normalizeEntries(base.entries || DEFAULT_ENTRIES, categories);

    return {
      version: 1,
      categories: categories.length ? categories : DEFAULT_CATEGORIES.map((item, index) => normalizeCategory(item, index, now)),
      entries
    };
  }

  function normalizeCategory(category, index, now) {
    if (!category || typeof category !== "object") return null;
    const title = String(category.title || "").trim();
    const tags = normalizeTags(Array.isArray(category.tags) ? category.tags.join(" ") : category.tags);
    if (!title) return null;

    return {
      id: String(category.id || `interest-${index}-${now}`),
      title: title.slice(0, 24),
      tags,
      createdAt: Number.isFinite(Number(category.createdAt)) ? Number(category.createdAt) : now + index,
      updatedAt: Number.isFinite(Number(category.updatedAt)) ? Number(category.updatedAt) : now + index
    };
  }

  function normalizeEntries(rawEntries, categories) {
    const validIds = new Set(categories.map(category => category.id));
    const entries = {};
    if (!rawEntries || typeof rawEntries !== "object") return entries;

    Object.entries(rawEntries).forEach(([dateKey, dayValues]) => {
      if (!isDateKey(dateKey) || !dayValues || typeof dayValues !== "object") return;
      const nextDay = {};
      Object.entries(dayValues).forEach(([categoryId, value]) => {
        if (!validIds.has(categoryId)) return;
        const number = Number(value);
        if (Number.isFinite(number) && number >= 0) {
          nextDay[categoryId] = Math.floor(number);
        }
      });
      if (Object.keys(nextDay).length) entries[dateKey] = nextDay;
    });
    return entries;
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function render() {
    if (els.date.value !== selectedDate) els.date.value = selectedDate;
    renderSummary();
    renderEntries();
    renderCategories();
  }

  function renderSummary() {
    const dayEntries = state.entries[selectedDate] || {};
    const filledCount = state.categories.filter(category => Number.isFinite(dayEntries[category.id])).length;
    const fullCount = state.categories.filter(category => {
      const value = dayEntries[category.id];
      if (!Number.isFinite(value)) return false;
      const baseline = findPreviousEntry(category.id, selectedDate);
      return baseline && value - baseline.value >= DAILY_TARGET;
    }).length;

    els.summary.innerHTML = `
      <article class="interest-summary-card">
        <span>当前日期</span>
        <strong>${escapeHtml(selectedDate)}</strong>
      </article>
      <article class="interest-summary-card">
        <span>已录分类</span>
        <strong>${filledCount} / ${state.categories.length}</strong>
      </article>
      <article class="interest-summary-card">
        <span>今日满额</span>
        <strong>${fullCount} / ${state.categories.length}</strong>
      </article>
    `;
  }

  function renderEntries() {
    if (!state.categories.length) {
      els.entryList.innerHTML = `
        <div class="value-empty">
          <strong>还没有 TAG 分类</strong>
          <span>先在下方新增分类，再录入每日累计经验。</span>
        </div>
      `;
      return;
    }

    const dayEntries = state.entries[selectedDate] || {};
    els.entryList.innerHTML = state.categories.map((category, index) => {
      const current = dayEntries[category.id];
      const previous = findPreviousEntry(category.id, selectedDate);
      const latestForProjection = Number.isFinite(current)
        ? { date: selectedDate, value: current }
        : findLatestEntryOnOrBefore(category.id, selectedDate);
      const delta = Number.isFinite(current) && previous ? current - previous.value : null;
      const gap = Number.isFinite(delta) ? delta - DAILY_TARGET : null;
      const target = getTargetProjection(latestForProjection);
      const statusClass = getGapClass(delta, gap);
      const toneClass = getInterestToneClass(index);

      return `
        <article class="interest-entry-card ${toneClass} ${statusClass}">
          <div class="interest-entry-main">
            <div>
              <div class="interest-entry-title">
                <h3>${escapeHtml(category.title)}</h3>
                <button class="mini-btn neutral" type="button" data-copy-tags="${escapeHtml(category.id)}">复制 TAG</button>
              </div>
              <div class="interest-tag-row">${renderTagChips(category.tags)}</div>
            </div>
            <label class="interest-exp-input">
              <span>累计经验</span>
              <input class="input" type="number" min="0" step="1" inputmode="numeric" value="${Number.isFinite(current) ? current : ""}" data-entry-category="${escapeHtml(category.id)}" placeholder="今天的累计经验" />
            </label>
          </div>

          <div class="interest-entry-metrics">
            <div>
              <span>比较基准</span>
              <strong>${previous ? `${escapeHtml(formatBaselineLabel(previous.date, selectedDate))} · ${formatNumber(previous.value)}` : "缺少基准"}</strong>
            </div>
            <div>
              <span>今日新增</span>
              <strong>${Number.isFinite(delta) ? formatNumber(delta) : "待录入"}</strong>
            </div>
            <div>
              <span>离 206 差值</span>
              <strong>${Number.isFinite(gap) ? formatSigned(gap) : previous ? "待录入" : "缺少基准"}</strong>
            </div>
            <div>
              <span>8200 达标</span>
              <strong>${escapeHtml(target)}</strong>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  function renderCategories() {
    if (!state.categories.length) {
      els.categoryList.innerHTML = `
        <div class="value-empty">
          <strong>还没有分类</strong>
          <span>新增后会出现在每日录入列表里。</span>
        </div>
      `;
      return;
    }

    els.categoryList.innerHTML = state.categories.map((category, index) => {
      const toneClass = getInterestToneClass(index);
      if (category.id === editingCategoryId) {
        return `
          <article class="interest-category-card ${toneClass} is-editing">
            <form class="interest-inline-edit" data-category-edit-form="${escapeHtml(category.id)}">
              <div class="interest-edit-head">
                <span>正在编辑</span>
                <strong>${escapeHtml(category.title)}</strong>
              </div>
              <div class="form-grid interest-category-grid">
                <div class="field">
                  <label for="interest-title-${escapeHtml(category.id)}">分类名称</label>
                  <input id="interest-title-${escapeHtml(category.id)}" class="input" type="text" maxlength="24" value="${escapeHtml(category.title)}" data-edit-title />
                </div>
                <div class="field interest-tags-field">
                  <label for="interest-tags-${escapeHtml(category.id)}">分类下的 TAG</label>
                  <textarea id="interest-tags-${escapeHtml(category.id)}" class="input" rows="3" data-edit-tags>${escapeHtml(category.tags.join(" "))}</textarea>
                </div>
              </div>
              <div class="interest-category-actions">
                <button class="mini-btn primary" type="submit">保存</button>
                <button class="mini-btn neutral" type="button" data-cancel-edit-category="${escapeHtml(category.id)}">取消</button>
              </div>
            </form>
          </article>
        `;
      }

      return `
        <article class="interest-category-card ${toneClass}">
          <div>
            <h3>${escapeHtml(category.title)}</h3>
            <div class="interest-tag-row">${renderTagChips(category.tags, category.id)}</div>
          </div>
          <div class="interest-category-actions">
            <button class="mini-btn neutral" type="button" data-copy-tags="${escapeHtml(category.id)}">复制 TAG</button>
            <button class="mini-btn neutral" type="button" data-edit-category="${escapeHtml(category.id)}">编辑</button>
          </div>
        </article>
      `;
    }).join("");
  }

  function renderTagChips(tags, categoryId = "") {
    if (!tags.length) return `<span class="interest-tag-empty">暂无 TAG</span>`;
    return tags.map((tag, index) => {
      const deleteButton = categoryId
        ? `<button class="interest-tag-delete" type="button" data-delete-tag="${escapeHtml(categoryId)}" data-tag-index="${index}">删除</button>`
        : "";
      return `<span>${escapeHtml(tag)}${deleteButton}</span>`;
    }).join("");
  }

  function getInterestToneClass(index) {
    return `interest-tone-${index % 8}`;
  }

  function handleEntryInput(event) {
    const input = event.target.closest("[data-entry-category]");
    if (!input) return;

    const categoryId = input.dataset.entryCategory;
    const raw = input.value;
    if (!state.entries[selectedDate]) state.entries[selectedDate] = {};

    if (raw === "") {
      delete state.entries[selectedDate][categoryId];
      if (!Object.keys(state.entries[selectedDate]).length) delete state.entries[selectedDate];
      saveState();
      render();
      return;
    }

    const value = Number(raw);
    if (!Number.isFinite(value) || value < 0) return;
    state.entries[selectedDate][categoryId] = Math.floor(value);
    saveState();
    render();
  }

  function handleEntryClick(event) {
    const copyButton = event.target.closest("[data-copy-tags]");
    if (copyButton) copyTags(copyButton.dataset.copyTags);
  }

  function saveNewCategory(event) {
    event.preventDefault();
    const title = els.newCategoryTitle.value.trim();
    const tags = normalizeTags(els.newCategoryTags.value);

    if (!title) {
      showToast("请填写分类名称", "例如：斗战之志。", "warn");
      return;
    }
    const now = Date.now();
    state.categories.push({
      id: `interest-${now}-${Math.random().toString(36).slice(2)}`,
      title: title.slice(0, 24),
      tags,
      createdAt: now,
      updatedAt: now
    });

    state.categories.sort((a, b) => a.createdAt - b.createdAt);
    saveState();
    resetNewCategoryForm();
    render();
    showToast("分类已新增", `${title} 可以开始录入经验。`, "good");
  }

  function handleCategorySubmit(event) {
    const form = event.target.closest("[data-category-edit-form]");
    if (!form) return;
    event.preventDefault();
    saveEditedCategory(form);
  }

  function saveEditedCategory(form) {
    const categoryId = form.dataset.categoryEditForm;
    const category = state.categories.find(item => item.id === categoryId);
    if (!category) {
      editingCategoryId = "";
      renderCategories();
      showToast("分类不存在", "当前分类可能已经被删除。", "warn");
      return;
    }

    const title = form.querySelector("[data-edit-title]")?.value.trim() || "";
    const tags = normalizeTags(form.querySelector("[data-edit-tags]")?.value || "");
    if (!title) {
      showToast("请填写分类名称", "分类名称不能为空。", "warn");
      return;
    }

    category.title = title.slice(0, 24);
    category.tags = tags;
    category.updatedAt = Date.now();
    saveState();
    editingCategoryId = "";
    render();
    showToast("分类已更新", `${category.title} 已保存。`, "good");
  }

  function handleCategoryClick(event) {
    const copyButton = event.target.closest("[data-copy-tags]");
    const editButton = event.target.closest("[data-edit-category]");
    const cancelEditButton = event.target.closest("[data-cancel-edit-category]");
    const deleteTagButton = event.target.closest("[data-delete-tag]");

    if (copyButton) {
      copyTags(copyButton.dataset.copyTags);
      return;
    }
    if (deleteTagButton) {
      deleteTag(deleteTagButton.dataset.deleteTag, Number(deleteTagButton.dataset.tagIndex));
      return;
    }
    if (editButton) {
      editCategory(editButton.dataset.editCategory);
      return;
    }
    if (cancelEditButton) {
      editingCategoryId = "";
      renderCategories();
    }
  }

  function editCategory(categoryId) {
    const category = state.categories.find(item => item.id === categoryId);
    if (!category) return;

    editingCategoryId = category.id;
    renderCategories();
    const form = els.categoryList.querySelector("[data-category-edit-form]");
    const titleInput = form?.querySelector("[data-edit-title]");
    if (titleInput) titleInput.focus();
  }

  function deleteTag(categoryId, tagIndex) {
    const category = state.categories.find(item => item.id === categoryId);
    if (!category) return;
    if (!Number.isInteger(tagIndex) || tagIndex < 0 || tagIndex >= category.tags.length) return;
    const tag = category.tags[tagIndex];
    if (!confirm(`确认删除 TAG “${tag}” 吗？分类和历史经验记录会保留。`)) return;

    category.tags.splice(tagIndex, 1);
    category.updatedAt = Date.now();
    saveState();
    render();
    showToast("TAG 已删除", `${tag} 已从 ${category.title} 移除。`);
  }

  function resetNewCategoryForm() {
    els.newCategoryTitle.value = "";
    els.newCategoryTags.value = "";
  }

  function copyTags(categoryId) {
    const category = state.categories.find(item => item.id === categoryId);
    if (!category) return;
    const text = category.tags.join(" ");
    if (!text) {
      showToast("暂无 TAG", "这个分类还没有可复制的 TAG。", "warn");
      return;
    }
    copyText(text).then(() => {
      showToast("TAG 已复制", text, "good");
    }).catch(() => {
      showToast("复制失败", "可以手动选中 TAG 文本复制。", "warn");
    });
  }

  function copyText(text) {
    if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);

    return new Promise((resolve, reject) => {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand("copy");
      textarea.remove();
      ok ? resolve() : reject(new Error("copy failed"));
    });
  }

  function shiftSelectedDate(days) {
    selectedDate = formatDateKey(addDays(parseDateKey(selectedDate), days));
    els.date.value = selectedDate;
    render();
  }

  function findPreviousEntry(categoryId, dateKey) {
    const candidates = Object.keys(state.entries)
      .filter(key => key < dateKey && Number.isFinite(state.entries[key]?.[categoryId]))
      .sort();
    if (!candidates.length) return null;
    const date = candidates[candidates.length - 1];
    return { date, value: state.entries[date][categoryId] };
  }

  function findLatestEntryOnOrBefore(categoryId, dateKey) {
    const candidates = Object.keys(state.entries)
      .filter(key => key <= dateKey && Number.isFinite(state.entries[key]?.[categoryId]))
      .sort();
    if (!candidates.length) return null;
    const date = candidates[candidates.length - 1];
    return { date, value: state.entries[date][categoryId] };
  }

  function getTargetProjection(record) {
    if (!record) return "缺少记录";
    if (record.value >= TOTAL_TARGET) return "已达成";
    const remain = TOTAL_TARGET - record.value;
    const days = Math.ceil(remain / DAILY_TARGET);
    return `还需 ${days} 天`;
  }

  function formatBaselineLabel(recordDate, currentDate) {
    if (!isDateKey(recordDate) || !isDateKey(currentDate)) return "上次";
    const diffDays = Math.round((parseDateKey(currentDate).getTime() - parseDateKey(recordDate).getTime()) / MS_PER_DAY);
    if (diffDays === 1) return "昨日";
    if (diffDays === 2) return "前日";
    if (diffDays > 2) return `${diffDays} 天前`;
    return "上次";
  }

  function getGapClass(delta, gap) {
    if (!Number.isFinite(delta) || !Number.isFinite(gap)) return "";
    if (delta < 0) return "is-warn";
    if (gap === 0) return "is-full";
    if (gap > 0) return "is-over";
    return "is-short";
  }

  function normalizeTags(value) {
    return Array.from(new Set(String(value || "")
      .split(/\s+/)
      .map(tag => tag.trim())
      .filter(Boolean)
      .map(tag => tag.startsWith("#") ? tag : `#${tag}`)));
  }

  function showToast(title, message = "", tone = "") {
    if (!els.toastZone) return;
    const toast = document.createElement("div");
    toast.className = `toast ${tone ? `toast-${tone}` : ""}`;
    toast.innerHTML = `<strong>${escapeHtml(title)}</strong>${message ? `<span>${escapeHtml(message)}</span>` : ""}`;
    els.toastZone.appendChild(toast);
    setTimeout(() => toast.remove(), 3600);
  }

  function getTodayKey() {
    return formatDateKey(new Date());
  }

  function isDateKey(value) {
    return /^\d{4}-\d{2}-\d{2}$/.test(String(value || ""));
  }

  function parseDateKey(dateKey) {
    const [year, month, day] = dateKey.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  function addDays(date, days) {
    return new Date(date.getTime() + days * MS_PER_DAY);
  }

  function formatDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function formatNumber(value) {
    return new Intl.NumberFormat("zh-CN").format(value);
  }

  function formatSigned(value) {
    const abs = formatNumber(Math.abs(value));
    if (value > 0) return `+${abs}`;
    if (value < 0) return `-${abs}`;
    return "0";
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
})();
