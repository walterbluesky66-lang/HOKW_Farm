(function () {
  const META_KEY = "wzry-world-farm-cloud-sync-meta-v1";
  const RECOVERY_KEY = "wzry-world-farm-cloud-recovery-v1";
  const SLOT_KEY = "primary";
  const AUTO_UPLOAD_DELAY = 2200;
  const CONFIG = window.HOKW_CLOUD_CONFIG || {};
  const storage = window.HOKW_STORAGE;
  const portableKeySet = new Set((storage?.portableKeys || []).map(item => item.key));
  const state = {
    client: null,
    session: null,
    initialized: false,
    applyingRemote: false,
    uploadTimer: null,
    pendingUploadReason: "",
    status: "云存档未连接",
    detail: "",
    lastError: "",
    lastSyncedAt: "",
    revision: null,
    email: "",
    otpEmail: ""
  };

  const originalSetItem = Storage.prototype.setItem;
  const originalRemoveItem = Storage.prototype.removeItem;

  Storage.prototype.setItem = function (key, value) {
    const result = originalSetItem.apply(this, arguments);
    if (this === window.localStorage) handleLocalMutation(key);
    return result;
  };

  Storage.prototype.removeItem = function (key) {
    const result = originalRemoveItem.apply(this, arguments);
    if (this === window.localStorage) handleLocalMutation(key);
    return result;
  };

  function handleLocalMutation(key) {
    if (!portableKeySet.has(key) || state.applyingRemote) return;
    scheduleUpload("本地数据已更新");
  }

  function scheduleUpload(reason) {
    if (!state.initialized || !state.session) return;
    state.pendingUploadReason = reason || "本地数据已更新";
    setStatus("本地已保存，等待云端同步", state.pendingUploadReason);
    clearTimeout(state.uploadTimer);
    state.uploadTimer = setTimeout(() => {
      uploadSnapshot("auto").catch(error => {
        setStatus("云端同步失败", getErrorMessage(error), true);
      });
    }, AUTO_UPLOAD_DELAY);
  }

  document.addEventListener("DOMContentLoaded", initCloudSync);

  async function initCloudSync() {
    renderShell();

    if (!storage) {
      setStatus("云存档不可用", "缺少本地数据清单。");
      return;
    }

    if (!isConfigured()) {
      setStatus("云存档未配置", "本地模式可继续使用；上线前需要配置 Supabase。");
      return;
    }

    if (!window.supabase?.createClient) {
      setStatus("云存档脚本未加载", "请检查网络或 Supabase JS 是否可访问。", true);
      return;
    }

    try {
      state.client = window.supabase.createClient(CONFIG.supabaseUrl, CONFIG.supabasePublishableKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      });

      bindCloudControls();
      const { data, error } = await state.client.auth.getSession();
      if (error) throw error;
      await handleSession(data.session, { source: "load" });

      state.client.auth.onAuthStateChange((_event, session) => {
        handleSession(session, { source: "auth" }).catch(error => {
          setStatus("云存档状态更新失败", getErrorMessage(error), true);
        });
      });
    } catch (error) {
      setStatus("云存档初始化失败", getErrorMessage(error), true);
    }
  }

  function isConfigured() {
    return Boolean(CONFIG.syncEnabled && CONFIG.supabaseUrl && CONFIG.supabasePublishableKey);
  }

  function renderShell() {
    const mount = document.getElementById("cloudSyncMount");
    if (mount) {
      mount.innerHTML = `
        <div class="cloud-sync-card" data-cloud-card>
          <div class="cloud-sync-status-row">
            <div>
              <div class="cloud-sync-title">云存档</div>
              <div class="cloud-sync-status" data-cloud-status>正在检查云存档...</div>
            </div>
            <span class="cloud-sync-badge" data-cloud-badge>本地</span>
          </div>

          <form class="cloud-sync-login" data-cloud-login>
            <label class="field cloud-sync-field">
              <span>邮箱</span>
              <input class="input" data-cloud-email type="email" autocomplete="email" placeholder="输入邮箱获取验证码" />
            </label>
            <button class="btn blue" data-cloud-send type="submit">发送验证码</button>
            <label class="field cloud-sync-field">
              <span>验证码</span>
              <input class="input" data-cloud-token type="text" inputmode="numeric" autocomplete="one-time-code" placeholder="输入邮件里的 6 位验证码" />
            </label>
            <button class="btn primary" data-cloud-verify type="button">登录并同步</button>
          </form>

          <div class="cloud-sync-account" data-cloud-account hidden>
            <div class="cloud-sync-account-line" data-cloud-email-line></div>
            <div class="cloud-sync-actions">
              <button class="btn blue" data-cloud-upload type="button">立即同步</button>
              <button class="btn ghost" data-cloud-signout type="button">退出登录</button>
            </div>
          </div>

          <div class="small cloud-sync-detail" data-cloud-detail>未登录时仍会保存在当前浏览器。</div>
        </div>
      `;
    }

    if (!mount) {
      const floating = document.createElement("div");
      floating.className = "cloud-sync-float";
      floating.innerHTML = `
        <span data-cloud-float-badge>本地模式</span>
        <button class="cloud-sync-float-btn" data-cloud-float-retry type="button" hidden>重试</button>
      `;
      document.body.append(floating);
    }
    bindCloudControls();
    renderStatus();
  }

  function bindCloudControls() {
    document.querySelectorAll("[data-cloud-login]").forEach(form => {
      if (form.dataset.bound) return;
      form.dataset.bound = "1";
      form.addEventListener("submit", event => {
        event.preventDefault();
        sendOtp();
      });
    });

    document.querySelectorAll("[data-cloud-verify]").forEach(button => {
      if (button.dataset.bound) return;
      button.dataset.bound = "1";
      button.addEventListener("click", verifyOtp);
    });

    document.querySelectorAll("[data-cloud-upload]").forEach(button => {
      if (button.dataset.bound) return;
      button.dataset.bound = "1";
      button.addEventListener("click", () => {
        uploadSnapshot("manual").catch(error => {
          setStatus("云端同步失败", getErrorMessage(error), true);
        });
      });
    });

    document.querySelectorAll("[data-cloud-signout]").forEach(button => {
      if (button.dataset.bound) return;
      button.dataset.bound = "1";
      button.addEventListener("click", signOut);
    });

    document.querySelectorAll("[data-cloud-float-retry]").forEach(button => {
      if (button.dataset.bound) return;
      button.dataset.bound = "1";
      button.addEventListener("click", () => {
        uploadSnapshot("retry").catch(error => {
          setStatus("云端同步失败", getErrorMessage(error), true);
        });
      });
    });
  }

  async function sendOtp() {
    if (!state.client) return;
    const email = getEmailInput();
    if (!email) {
      setStatus("请输入邮箱", "邮箱用于接收一次性验证码。", true);
      return;
    }

    try {
      setBusy(true);
      setStatus("正在发送验证码", "请稍等...");
      const { error } = await state.client.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: true }
      });
      if (error) throw error;
      state.otpEmail = email;
      setStatus("验证码已发送", "请查看邮箱，把验证码填到下面。");
    } catch (error) {
      setStatus("验证码发送失败", getErrorMessage(error), true);
    } finally {
      setBusy(false);
    }
  }

  async function verifyOtp() {
    if (!state.client) return;
    const email = getEmailInput() || state.otpEmail;
    const token = getTokenInput();
    if (!email || !token) {
      setStatus("需要邮箱和验证码", "请先发送验证码，再输入邮件里的数字验证码。", true);
      return;
    }

    try {
      setBusy(true);
      setStatus("正在登录云存档", "登录后会先读取云端快照。");
      const { data, error } = await state.client.auth.verifyOtp({
        email,
        token,
        type: "email"
      });
      if (error) throw error;
      await handleSession(data.session, { source: "verify" });
    } catch (error) {
      setStatus("登录失败", getErrorMessage(error), true);
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    if (!state.client) return;
    try {
      setBusy(true);
      await state.client.auth.signOut();
      state.session = null;
      state.initialized = false;
      originalRemoveItem.call(localStorage, META_KEY);
      setStatus("已退出云存档", "本地数据仍保留在当前浏览器。");
      renderStatus();
    } catch (error) {
      setStatus("退出失败", getErrorMessage(error), true);
    } finally {
      setBusy(false);
    }
  }

  async function handleSession(session) {
    state.session = session || null;
    state.email = session?.user?.email || "";
    if (!session) {
      state.initialized = false;
      setStatus("云存档未登录", "登录后可自动同步到云端。");
      renderStatus();
      return;
    }

    if (state.initialized) {
      setStatus("云存档已连接", "后续修改会自动上传。");
      renderStatus();
      return;
    }

    await pullOrInitializeSnapshot();
  }

  async function pullOrInitializeSnapshot() {
    const user = state.session?.user;
    if (!user) return;

    setStatus("正在读取云端存档", "如果云端已有存档，将以云端为准。");

    const { data, error } = await state.client
      .from("user_snapshots")
      .select("payload,payload_version,server_updated_at,revision")
      .eq("user_id", user.id)
      .eq("slot_key", SLOT_KEY)
      .maybeSingle();

    if (error) throw error;

    if (data?.payload) {
      const validation = storage.validatePortableData(data.payload);
      if (!validation.ok) {
        throw new Error(`云端存档格式不对：${validation.message}`);
      }

      state.revision = data.revision || null;
      state.lastSyncedAt = data.server_updated_at || "";
      saveMeta({
        email: state.email,
        revision: state.revision,
        lastPulledAt: new Date().toISOString(),
        serverUpdatedAt: state.lastSyncedAt
      });

      if (storage.samePortableData(data.payload)) {
        state.initialized = true;
        setStatus("云存档已同步", "云端和本地数据一致。");
        return;
      }

      saveRecoveryBackup();
      try {
        state.applyingRemote = true;
        storage.applyPortableData(data.payload);
      } finally {
        state.applyingRemote = false;
      }
      setStatus("已恢复云端存档", "页面即将刷新。");
      setTimeout(() => window.location.reload(), 700);
      return;
    }

    state.initialized = true;
    if (storage.hasPortableData()) {
      await uploadSnapshot("initial");
      return;
    }

    setStatus("云存档已连接", "当前还没有本地数据；第一次保存后会自动上传。");
  }

  async function uploadSnapshot(reason) {
    clearTimeout(state.uploadTimer);
    if (!state.client || !state.session) {
      setStatus("云存档未登录", "请先登录后再同步。", true);
      return;
    }

    const payload = storage.buildPortableData(window.location.href);
    if (!payload.summary.length) {
      setStatus("云存档已连接", "当前还没有需要上传的数据。");
      return;
    }

    const user = state.session.user;
    setStatus("正在同步到云端", "本地数据已保存，正在上传快照。");
    const row = {
      user_id: user.id,
      slot_key: SLOT_KEY,
      payload_version: payload.version,
      payload,
      client_updated_at: payload.exportedAt
    };

    const { data, error } = await state.client
      .from("user_snapshots")
      .upsert(row, { onConflict: "user_id,slot_key" })
      .select("server_updated_at,revision")
      .single();

    if (error) throw error;

    state.initialized = true;
    state.revision = data?.revision || state.revision;
    state.lastSyncedAt = data?.server_updated_at || new Date().toISOString();
    saveMeta({
      email: state.email,
      revision: state.revision,
      lastPushedAt: new Date().toISOString(),
      serverUpdatedAt: state.lastSyncedAt
    });
    setStatus("云存档已同步", formatSyncDetail(reason));
  }

  function saveRecoveryBackup() {
    const backup = {
      app: "HOKW_Farm",
      savedAt: new Date().toISOString(),
      reason: "before-cloud-restore",
      payload: storage.buildPortableData(window.location.href)
    };
    originalSetItem.call(localStorage, RECOVERY_KEY, JSON.stringify(backup));
  }

  function getEmailInput() {
    const input = document.querySelector("[data-cloud-email]");
    return input?.value.trim() || state.email || "";
  }

  function getTokenInput() {
    const input = document.querySelector("[data-cloud-token]");
    return input?.value.trim() || "";
  }

  function setBusy(isBusy) {
    document.querySelectorAll("[data-cloud-send], [data-cloud-verify], [data-cloud-upload], [data-cloud-signout]").forEach(button => {
      button.disabled = isBusy;
    });
  }

  function setStatus(status, detail, isError) {
    state.status = status;
    state.detail = detail || "";
    state.lastError = isError ? detail || status : "";
    renderStatus();
  }

  function renderStatus() {
    document.querySelectorAll("[data-cloud-status]").forEach(node => {
      node.textContent = state.status;
    });
    document.querySelectorAll("[data-cloud-detail]").forEach(node => {
      node.textContent = state.detail || "未登录时仍会保存在当前浏览器。";
    });
    document.querySelectorAll("[data-cloud-badge]").forEach(node => {
      node.textContent = state.session ? "已登录" : "本地";
      node.classList.toggle("is-online", Boolean(state.session));
      node.classList.toggle("is-error", Boolean(state.lastError));
    });
    document.querySelectorAll("[data-cloud-float-badge]").forEach(node => {
      node.textContent = state.session ? state.status : "本地模式";
      node.classList.toggle("is-error", Boolean(state.lastError));
    });
    document.querySelectorAll("[data-cloud-float-retry]").forEach(node => {
      node.hidden = !state.lastError || !state.session;
    });
    document.querySelectorAll("[data-cloud-login]").forEach(node => {
      node.hidden = Boolean(state.session) || !isConfigured() || !state.client;
    });
    document.querySelectorAll("[data-cloud-account]").forEach(node => {
      node.hidden = !state.session;
    });
    document.querySelectorAll("[data-cloud-email-line]").forEach(node => {
      node.textContent = state.email ? `当前账号：${state.email}` : "";
    });
  }

  function saveMeta(partial) {
    const previous = readMeta();
    originalSetItem.call(localStorage, META_KEY, JSON.stringify({
      ...previous,
      ...partial,
      updatedAt: new Date().toISOString()
    }));
  }

  function readMeta() {
    try {
      return JSON.parse(localStorage.getItem(META_KEY) || "{}");
    } catch (err) {
      return {};
    }
  }

  function formatSyncDetail(reason) {
    const time = new Intl.DateTimeFormat("zh-CN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(new Date());
    if (reason === "initial") return `已把当前浏览器数据创建为第一份云存档 · ${time}`;
    if (reason === "manual" || reason === "retry") return `已手动同步 · ${time}`;
    return `后续修改会继续自动保存 · ${time}`;
  }

  function getErrorMessage(error) {
    return error?.message || String(error || "未知错误");
  }

  window.HOKW_CLOUD_SYNC = Object.freeze({
    uploadNow: () => uploadSnapshot("manual"),
    getState: () => ({ ...state, client: undefined, session: Boolean(state.session) })
  });
})();
