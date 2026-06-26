const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const appJs = fs.readFileSync(path.join(root, "app.js"), "utf8");
const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");

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
  appJs.includes("data-ranch-home-harvest-group") && appJs.includes("harvestRanchGroup"),
  "Home ranch harvest buttons should be bound to the existing ranch harvest flow"
);

const ranchShortcutPattern = /<section class="panel shortcut-panel">[\s\S]*?href="ranch\.html"[\s\S]*?<\/section>/;
assert(
  !ranchShortcutPattern.test(indexHtml),
  "Duplicate ranch management shortcut card should be removed from the sidebar"
);

console.log("Home interaction layout checks passed.");
