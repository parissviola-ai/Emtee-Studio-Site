import { expect, test, type Page } from "@playwright/test";

const forwardFlow = [
  "/rooms/lobby",
  "/rooms/business",
  "/rooms/music",
  "/rooms/marketing",
  "/rooms/ar-sales",
  "/rooms/publishing-distribution",
  "/rooms/dirty-elephant-studio",
  "/rooms/ten-ten-entertainment",
  "/rooms/steeped-dreams-studio",
  "/rooms/lobby",
] as const;

const backwardFlow = [
  "/rooms/steeped-dreams-studio",
  "/rooms/ten-ten-entertainment",
  "/rooms/dirty-elephant-studio",
  "/rooms/publishing-distribution",
  "/rooms/ar-sales",
  "/rooms/marketing",
  "/rooms/music",
  "/rooms/business",
  "/rooms/lobby",
] as const;

function nextControl(page: Page, isMobile: boolean) {
  return isMobile
    ? page.getByRole("button", { name: /^Next room:/ })
    : page.getByRole("button", { name: "Go to next page" });
}

function previousControl(page: Page, isMobile: boolean) {
  return isMobile
    ? page.getByRole("button", { name: /^Previous room:/ })
    : page.getByRole("button", { name: "Go to previous room" });
}

async function expectRoomStable(page: Page, route: string) {
  await expect(page).toHaveURL(new RegExp(`${route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`));
  await expect(page.locator("body")).toBeVisible();
  await expect(
    page.locator('button[aria-label="Open Explore menu"], button:has-text("Explore"):not([aria-label="Close Explore"])').first()
  ).toBeVisible();
}

test.describe("room transitions", () => {
  test("forward room loop works through the actual next controls", async ({ page }, testInfo) => {
    const runtimeErrors: string[] = [];
    const isMobile = testInfo.project.name.includes("mobile");

    page.on("pageerror", (error) => {
      runtimeErrors.push(error.message);
    });

    await page.goto(forwardFlow[0], { waitUntil: "domcontentloaded" });
    await expectRoomStable(page, forwardFlow[0]);

    for (const route of forwardFlow.slice(1)) {
      await nextControl(page, isMobile).click();
      await expectRoomStable(page, route);
    }

    expect(runtimeErrors).toEqual([]);
  });

  test("backward room loop works through the actual previous controls", async ({ page }, testInfo) => {
    const runtimeErrors: string[] = [];
    const isMobile = testInfo.project.name.includes("mobile");

    page.on("pageerror", (error) => {
      runtimeErrors.push(error.message);
    });

    await page.goto(backwardFlow[0], { waitUntil: "domcontentloaded" });
    await expectRoomStable(page, backwardFlow[0]);

    for (const route of backwardFlow.slice(1)) {
      await previousControl(page, isMobile).click();
      await expectRoomStable(page, route);
    }

    expect(runtimeErrors).toEqual([]);
  });
});
