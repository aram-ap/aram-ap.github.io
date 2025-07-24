import fs from "fs";
import path from "path";

const distDir = path.resolve("dist");
const indexFile = path.join(distDir, "index.html");
const notFoundFile = path.join(distDir, "404.html");

try {
  fs.copyFileSync(indexFile, notFoundFile);
  console.log("✔ 404.html generated");
} catch (err) {
  console.error("Error creating 404.html", err);
  process.exit(1);
} 