const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const siteFiles = [
  "index.html",
  "residence-settings.html",
  "user-storage.html",
  "rules.html",
  "crop-archive.html",
  "value-calculator.html",
  "ranch.html",
  "planner.html",
  "planner-detail.html",
  "experience-planner.html",
  "interest-circle.html",
  "style.css",
  "storage-keys.js",
  "cloud-sync.js",
  "app.js",
  "interest-circle.js",
  "favicon.svg"
];

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

for (const file of siteFiles) {
  const source = path.join(rootDir, file);
  const target = path.join(distDir, file);
  if (!fs.existsSync(source)) {
    throw new Error(`Missing site file: ${file}`);
  }
  fs.copyFileSync(source, target);
}

const cloudConfig = {
  supabaseUrl: process.env.HOKW_SUPABASE_URL || "",
  supabasePublishableKey: process.env.HOKW_SUPABASE_PUBLISHABLE_KEY || "",
  syncEnabled: Boolean(process.env.HOKW_SUPABASE_URL && process.env.HOKW_SUPABASE_PUBLISHABLE_KEY)
};

fs.writeFileSync(
  path.join(distDir, "cloud-config.js"),
  `window.HOKW_CLOUD_CONFIG = Object.freeze(${JSON.stringify(cloudConfig, null, 2)});\n`,
  "utf8"
);

console.log(`Copied ${siteFiles.length} files to ${path.relative(rootDir, distDir)}`);
console.log(`Cloud sync config: ${cloudConfig.syncEnabled ? "enabled" : "disabled"}`);
