import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { spawn } from "node:child_process";
import { chromium } from "playwright";
import ffmpegPath from "ffmpeg-static";

const targetUrl = process.argv[2] ?? process.env.BROWSERTIME_URL ?? "http://127.0.0.1:3000/rooms/lobby";
const iterations = process.env.BROWSERTIME_ITERATIONS ?? "1";
const enableVisualMetrics =
  process.env.BROWSERTIME_VISUAL_METRICS === "1" ||
  process.env.BROWSERTIME_VISUAL_METRICS === "true";
const outputRoot = path.join(process.cwd(), "docs", "audits");
const stamp = new Date().toISOString().replaceAll(":", "-");
const resultDir = path.join(outputRoot, `browsertime-${stamp}`);
const chromeBinaryPath = chromium.executablePath();
const browsertimeBin = path.join(process.cwd(), "node_modules", "browsertime", "bin", "browsertime.js");
const ffmpegBinDir = ffmpegPath ? path.dirname(ffmpegPath) : null;

await fs.mkdir(resultDir, { recursive: true });

const args = [
  browsertimeBin,
  targetUrl,
  "--browser",
  "chrome",
  "--chrome.binaryPath",
  chromeBinaryPath,
  "--chrome.args=--no-sandbox",
  "--chrome.args=--disable-dev-shm-usage",
  "--chrome.args=--autoplay-policy=no-user-gesture-required",
  "--headless",
  "true",
  "--iterations",
  iterations,
  "--viewPort",
  "412x915",
  "--connectivity.profile",
  "native",
  "--resultDir",
  resultDir,
  "--useSameDir",
  "--prettyPrint",
  "--pageCompleteCheckNetworkIdle",
  "--timeouts.pageCompleteCheck",
  "45000",
  "--chrome.timeline",
  "--chrome.enableTraceScreenshots",
  "--chrome.collectConsoleLog",
  "--chrome.collectNetLog",
  "--screenshot",
  "--screenshotLCP",
];

if (enableVisualMetrics) {
  args.push(
    "--video",
    "true",
    "--visualMetrics",
    "true",
    "--visualMetricsContentful",
    "true",
    "--visualMetricsPerceptual",
    "true",
    "--videoParams.addTimer",
    "false",
    "--videoParams.createFilmstrip",
    "true",
  );
}

const child = spawn(process.execPath, args, {
  cwd: process.cwd(),
  stdio: "inherit",
  env: {
    ...process.env,
    PATH: ffmpegBinDir ? `${ffmpegBinDir}:${process.env.PATH ?? ""}` : process.env.PATH,
  },
});

const exitCode = await new Promise((resolve, reject) => {
  child.on("error", reject);
  child.on("exit", (code) => resolve(code ?? 1));
});

if (exitCode !== 0) {
  process.exit(exitCode);
}

console.log(`Browsertime complete for ${targetUrl}`);
console.log(`Result directory: ${resultDir}`);
