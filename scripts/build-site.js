const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const siteFiles = [
  "index.html",
  "rules.html",
  "crop-archive.html",
  "value-calculator.html",
  "ranch.html",
  "planner.html",
  "planner-detail.html",
  "interest-circle.html",
  "style.css",
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

console.log(`Copied ${siteFiles.length} files to ${path.relative(rootDir, distDir)}`);
