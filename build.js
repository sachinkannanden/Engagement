// Copies the site into dist/ and fills in the live address for link previews.
const fs = require("fs"), path = require("path");
const origin = process.env.VERCEL_PROJECT_PRODUCTION_URL ? "https://" + process.env.VERCEL_PROJECT_PRODUCTION_URL
  : process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : "";
fs.rmSync("dist", { recursive: true, force: true });
fs.mkdirSync("dist/fonts", { recursive: true });
fs.writeFileSync("dist/index.html", fs.readFileSync("index.html", "utf8").split("%%SITE%%").join(origin));
fs.copyFileSync("og-preview.jpg", "dist/og-preview.jpg");
for (const f of fs.readdirSync("fonts")) fs.copyFileSync(path.join("fonts", f), path.join("dist/fonts", f));
console.log("Built for", origin || "(relative paths)");
