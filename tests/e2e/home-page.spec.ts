import { expect, test } from "@playwright/test";

test("application home page loads", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("body")).toBeVisible();
});