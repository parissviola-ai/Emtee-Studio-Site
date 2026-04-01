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

test("lobby modal opened from query can still navigate to another modal", async ({ page }) => {
  await page.goto("/rooms/lobby?modal=About", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle");

  await expect(page.getByRole("heading", { name: "Who We Are" })).toBeVisible();

  await page.getByRole("button", { name: "What We Offer →" }).click();

  await expect(page.getByRole("heading", { name: "What We Offer" })).toBeVisible();
});

test("lobby modal sequence buttons stay stable in both directions", async ({ page }) => {
  await page.goto("/rooms/lobby?modal=About", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle");

  await expect(page.getByRole("heading", { name: "Who We Are" })).toBeVisible();
  await expect(page.getByRole("button", { name: /^What We Offer →$/ })).toBeVisible();

  await page.getByRole("button", { name: /^What We Offer →$/ }).click();

  await expect(page.getByRole("heading", { name: "What We Offer" })).toBeVisible();
  await expect(page.getByRole("button", { name: /^Back$/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /^What We.ve Done →$/ })).toBeVisible();

  await page.getByRole("button", { name: /^What We.ve Done →$/ }).click();

  await expect(page.getByRole("heading", { name: /What We.ve Done/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /^Back$/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /^How You Start →$/ })).toBeVisible();

  await page.getByRole("button", { name: /^How You Start →$/ }).click();

  await expect(page.getByRole("heading", { name: "How You Start" })).toBeVisible();
  await expect(page.getByRole("button", { name: /^Back$/ })).toBeVisible();

  await page.getByRole("button", { name: /^Back$/ }).click({ force: true });

  await expect(page.getByRole("heading", { name: /What We.ve Done/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /^Back$/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /^How You Start →$/ })).toBeVisible();

  await page.getByRole("button", { name: /^Back$/ }).click({ force: true });

  await expect(page.getByRole("heading", { name: "What We Offer" })).toBeVisible();
  await expect(page.getByRole("button", { name: /^Back$/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /^What We.ve Done →$/ })).toBeVisible();

  await page.getByRole("button", { name: /^Back$/ }).click({ force: true });

  await expect(page.getByRole("heading", { name: "Who We Are" })).toBeVisible();
  await expect(page.getByRole("button", { name: /^What We Offer →$/ })).toBeVisible();
});

test("view full case study opens a new tab without closing the lobby modal", async ({ page }) => {
  await page.goto("/rooms/lobby?modal=case-study-tour", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle");

  await expect(page.getByRole("heading", { name: /What We.ve Done/ })).toBeVisible();

  const popupPromise = page.waitForEvent("popup");
  await page.getByRole("button", { name: /View Full Case Study/ }).click();
  const popup = await popupPromise;

  await popup.waitForLoadState("domcontentloaded");
  await expect(popup).toHaveURL(/\/case-studies\//);

  await expect(page).toHaveURL(/\/rooms\/lobby\?modal=case-study-tour$/);
  await expect(page.getByRole("heading", { name: /What We.ve Done/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /^How You Start →$/ })).toBeVisible();
});

test("mobile start here flow can open what we offer without closing the modal", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes("mobile"), "mobile-only repro");

  await page.goto("/rooms/lobby", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle");

  await page.getByRole("button", { name: "Start Here", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Who We Are" })).toBeVisible();

  await page.getByRole("button", { name: /^What We Offer →$/ }).click();
  await expect(page.getByRole("heading", { name: "What We Offer" })).toBeVisible();
});
