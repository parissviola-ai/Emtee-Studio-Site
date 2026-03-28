import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/rooms/lobby",
  "/rooms/business",
  "/rooms/music",
  "/rooms/marketing",
  "/rooms/ar-sales",
  "/rooms/publishing-distribution",
  "/rooms/dirty-elephant-studio",
  "/rooms/ten-ten-entertainment",
  "/rooms/steeped-dreams-studio",
  "/resources",
  "/artist-affiliations",
  "/artist-affiliations/case-studies-2",
  "/case-studies",
] as const;

for (const route of routes) {
  test(`loads ${route}`, async ({ page }) => {
    const errors: string[] = [];

    page.on("pageerror", (error) => {
      errors.push(error.message);
    });

    await page.goto(route, { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");

    await expect(page.locator("body")).toBeVisible();
    expect(errors, `runtime errors on ${route}`).toEqual([]);
  });
}

test("room navigation flow stays reachable", async ({ page }) => {
  await page.goto("/rooms/lobby", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle");

  const flow = [
    "/rooms/business",
    "/rooms/music",
    "/rooms/marketing",
    "/rooms/ar-sales",
    "/rooms/publishing-distribution",
    "/rooms/dirty-elephant-studio",
    "/rooms/ten-ten-entertainment",
    "/rooms/steeped-dreams-studio",
  ];

  for (const route of flow) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(new RegExp(`${route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`));
  }
});
