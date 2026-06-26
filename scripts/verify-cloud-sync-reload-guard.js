const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const PLANNER_KEY = "wzry-world-farm-planner-v1";
const RESTORE_MARKER_KEY = "wzry-world-farm-cloud-restore-marker-v1";
const SLOT_KEY = "primary";

class MemoryStorage {
  constructor() {
    this.items = new Map();
  }

  getItem(key) {
    return this.items.has(key) ? this.items.get(key) : null;
  }

  setItem(key, value) {
    this.items.set(String(key), String(value));
  }

  removeItem(key) {
    this.items.delete(String(key));
  }
}

function snapshotFingerprint(payload, portableKeys) {
  const remoteStorage = payload?.storage && typeof payload.storage === "object" ? payload.storage : {};
  const source = portableKeys.map(item => {
    if (!Object.prototype.hasOwnProperty.call(remoteStorage, item.key)) return `${item.key}:missing`;
    const value = typeof remoteStorage[item.key] === "string"
      ? remoteStorage[item.key]
      : JSON.stringify(remoteStorage[item.key]);
    return `${item.key}:${value.length}:${value}`;
  }).join("\n");

  let hash = 5381;
  for (let index = 0; index < source.length; index += 1) {
    hash = ((hash << 5) + hash + source.charCodeAt(index)) >>> 0;
  }
  return `${source.length}:${hash.toString(36)}`;
}

async function run() {
  const localStorage = new MemoryStorage();
  const callbacks = [];
  let reloadCount = 0;
  let upsertedRow = null;

  const remotePlanner = {
    active: true,
    startedAt: 1,
    currentLevel: 7,
    landCount: 30,
    weekendTarget: 6000,
    sleepStart: "00:00",
    sleepEnd: "08:00",
    progressWindowStart: 1,
    weekendProgress: 0,
    updatedAt: 1
  };
  const normalizedPlanner = {
    ...remotePlanner,
    cropStallLevel: 1,
    includeBlessing: true
  };
  const remotePayload = {
    app: "HOKW_Farm",
    version: 1,
    exportedAt: "2026-06-26T00:00:00.000Z",
    source: "https://hokw-helper.pages.dev/planner.html",
    storage: {
      [PLANNER_KEY]: JSON.stringify(remotePlanner)
    },
    summary: [
      { key: PLANNER_KEY, label: "planner", bytes: JSON.stringify(remotePlanner).length }
    ]
  };

  localStorage.setItem(PLANNER_KEY, JSON.stringify(normalizedPlanner));

  const context = {
    console,
    Storage: MemoryStorage,
    localStorage,
    setTimeout: callback => {
      callback();
      return 1;
    },
    clearTimeout: () => {},
    document: {
      addEventListener(name, callback) {
        if (name === "DOMContentLoaded") callbacks.push(callback);
      },
      getElementById() {
        return null;
      },
      querySelectorAll() {
        return [];
      },
      body: {
        append() {}
      },
      createElement() {
        return {};
      }
    },
    window: {
      localStorage,
      location: {
        href: "https://hokw-helper.pages.dev/planner.html",
        reload() {
          reloadCount += 1;
        }
      },
      HOKW_CLOUD_CONFIG: {
        syncEnabled: true,
        supabaseUrl: "https://example.supabase.co",
        supabasePublishableKey: "public-anon-key"
      },
      supabase: {
        createClient() {
          const builder = {
            select() {
              return builder;
            },
            eq() {
              return builder;
            },
            async maybeSingle() {
              return {
                data: {
                  payload: remotePayload,
                  payload_version: 1,
                  server_updated_at: "2026-06-26T00:00:00.000Z",
                  revision: "rev-1"
                },
                error: null
              };
            },
            upsert(row) {
              upsertedRow = row;
              return {
                select() {
                  return {
                    async single() {
                      return {
                        data: {
                          server_updated_at: "2026-06-26T00:00:01.000Z",
                          revision: "rev-2"
                        },
                        error: null
                      };
                    }
                  };
                }
              };
            }
          };

          return {
            auth: {
              async getSession() {
                return {
                  data: {
                    session: {
                      user: {
                        id: "user-1",
                        email: "user@example.com"
                      }
                    }
                  },
                  error: null
                };
              },
              onAuthStateChange() {}
            },
            from() {
              return builder;
            }
          };
        }
      }
    }
  };
  context.window.window = context.window;
  context.window.Storage = MemoryStorage;
  context.window.document = context.document;
  context.window.setTimeout = context.setTimeout;
  context.window.clearTimeout = context.clearTimeout;

  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, "storage-keys.js"), "utf8"), context);

  const marker = {
    userId: "user-1",
    slotKey: SLOT_KEY,
    revision: "rev-1",
    serverUpdatedAt: "2026-06-26T00:00:00.000Z",
    fingerprint: snapshotFingerprint(remotePayload, context.window.HOKW_STORAGE.portableKeys),
    createdAt: Date.now()
  };
  localStorage.setItem(RESTORE_MARKER_KEY, JSON.stringify(marker));

  vm.runInContext(fs.readFileSync(path.join(root, "cloud-sync.js"), "utf8"), context);

  for (const callback of callbacks) {
    await callback();
  }

  if (reloadCount !== 0) {
    throw new Error("Cloud sync should upload the normalized local snapshot instead of reloading the same remote snapshot again.");
  }
  if (!upsertedRow) {
    throw new Error("Cloud sync should upload the normalized local snapshot after a guarded restore.");
  }
  if (upsertedRow.payload.storage[PLANNER_KEY] !== JSON.stringify(normalizedPlanner)) {
    throw new Error("Cloud sync uploaded the wrong planner payload after the reload guard.");
  }

  console.log("Cloud sync reload guard check passed.");
}

run().catch(error => {
  console.error(error);
  process.exit(1);
});
