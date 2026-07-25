import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/rooms/lobby",
  "/rooms/business",
  "/rooms/music",
  "/rooms/marketing",
  "/rooms/ar-sales",
  "/rooms/publishing-distribution",
  "/dirtyelephantstudios",
  "/tentenentertainment",
  "/steepeddreamsstudio",
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
    await page.waitForLoadState("load");

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
    "/dirtyelephantstudios",
    "/tentenentertainment",
    "/steepeddreamsstudio",
  ];

  for (const route of flow) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(new RegExp(`${route.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`));
  }
});

const legacyRoomRoutes = [
  ["/rooms/dirty-elephant-studio", "/dirtyelephantstudios"],
  ["/rooms/ten-ten-entertainment", "/tentenentertainment"],
  ["/rooms/steeped-dreams-studio", "/steepeddreamsstudio"],
] as const;

for (const [legacyRoute, publicRoute] of legacyRoomRoutes) {
  test(`${legacyRoute} redirects to ${publicRoute}`, async ({ page }) => {
    await page.goto(legacyRoute, { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(new RegExp(`${publicRoute}$`));
  });
}

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

test("how you start consultation opens a new tab without closing the modal", async ({ page }) => {
  await page.goto("/rooms/lobby?modal=how-you-start", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle");

  await expect(page.getByRole("heading", { name: "How You Start" })).toBeVisible();

  const popupPromise = page.waitForEvent("popup");
  await page.getByRole("button", { name: /Apply For A Consultation/ }).click();
  const popup = await popupPromise;

  await expect.poll(() => popup.url()).toContain("api.leadconnectorhq.com/widget/form/");
  await expect(page).toHaveURL(/\/rooms\/lobby\?modal=how-you-start$/);
  await expect(page.getByRole("heading", { name: "How You Start" })).toBeVisible();
});

test("custom production apply opens a new tab without closing the modal", async ({ page }) => {
  await page.goto("/dirtyelephantstudios", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle");

  await page
    .locator("button")
    .filter({ hasText: "Custom Production" })
    .first()
    .evaluate((element: HTMLButtonElement) => element.click());
  await expect(page.getByRole("heading", { name: "Apply For Custom Production" })).toBeVisible();

  const popupPromise = page.waitForEvent("popup");
  await page.getByRole("button", { name: /^Apply →$/ }).click();
  const popup = await popupPromise;

  await expect.poll(() => popup.url() !== "about:blank").toBeTruthy();
  await expect(page).toHaveURL(/\/dirtyelephantstudios$/);
  await expect(page.getByRole("heading", { name: "Apply For Custom Production" })).toBeVisible();
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

test("mobile Steeped Dreams feeling gate can pan across its background", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes("mobile"), "mobile-only interaction");

  await page.addInitScript(() => {
    window.sessionStorage.removeItem("steeped-dreams:feeling");
  });
  await page.goto("/steepeddreamsstudio", { waitUntil: "domcontentloaded" });

  const gate = page.locator('[data-steeped-dreams-feeling-gate="true"]');
  const background = page.locator('[data-steeped-dreams-feeling-background="true"]');
  await expect(gate).toBeVisible();
  await expect(page.getByRole("heading", { name: "How are you feeling today?" })).toBeVisible();

  const initialPosition = await background.evaluate((element) => (element as HTMLVideoElement).style.objectPosition);
  await gate.evaluate((element) => {
    const start = new Touch({ identifier: 1, target: element, clientX: 300, clientY: 500 });
    const moved = new Touch({ identifier: 1, target: element, clientX: 140, clientY: 500 });
    element.dispatchEvent(new TouchEvent("touchstart", { bubbles: true, cancelable: true, touches: [start] }));
    element.dispatchEvent(new TouchEvent("touchmove", { bubbles: true, cancelable: true, touches: [moved] }));
    element.dispatchEvent(new TouchEvent("touchend", { bubbles: true, cancelable: true, touches: [] }));
  });

  await expect.poll(() => background.evaluate((element) => (element as HTMLVideoElement).style.objectPosition)).not.toBe(initialPosition);
  await expect(page.getByRole("button", { name: "Chill", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Stimulated", exact: true })).toBeVisible();
});
