import { expect, test } from "@playwright/test";

test("displays the shared layout and navigation", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();

  const navigation = page.getByRole("navigation", {
    name: "Primary navigation",
  });

  await expect(navigation.getByRole("link", { name: "Books" })).toBeVisible();

  await navigation.getByRole("link", { name: "Books" }).click();

  await expect(page).toHaveURL(/\/books$/);
  await expect(
    page.getByRole("heading", { name: "Book catalogue" }),
  ).toBeVisible();
});
