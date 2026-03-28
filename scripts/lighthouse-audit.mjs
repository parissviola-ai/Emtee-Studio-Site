import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import lighthouse from "lighthouse";
import chromeLauncher from "chrome-launcher";

const targetUrl = process.argv[2] ?? process.env.LIGHTHOUSE_URL ?? "http://127.0.0.1:3000/rooms/lobby";
const outputDir = path.join(process.cwd(), "docs", "audits");
const stamp = new Date().toISOString().replaceAll(":", "-");
const htmlPath = path.join(outputDir, `lighthouse-${stamp}.html`);
const jsonPath = path.join(outputDir, `lighthouse-${stamp}.json`);

const chrome = await chromeLauncher.launch({
  chromeFlags: ["--headless=new", "--no-sandbox", "--disable-dev-shm-usage"],
});

try {
  const result = await lighthouse(
    targetUrl,
    {
      port: chrome.port,
      output: ["html", "json"],
      logLevel: "info",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    },
  );

  if (!result) {
    throw new Error("Lighthouse returned no result.");
  }

  await fs.mkdir(outputDir, { recursive: true });
  const [htmlReport, jsonReport] = result.report;
  await fs.writeFile(htmlPath, htmlReport);
  await fs.writeFile(jsonPath, jsonReport);

  const categories = result.lhr.categories;
  const scores = Object.fromEntries(
    Object.entries(categories).map(([key, category]) => [key, Math.round((category.score ?? 0) * 100)]),
  );

  console.log(`Lighthouse complete for ${targetUrl}`);
  console.log(`HTML report: ${htmlPath}`);
  console.log(`JSON report: ${jsonPath}`);
  console.log("Scores:", scores);
} finally {
  await chrome.kill();
}
