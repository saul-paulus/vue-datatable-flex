import { test, expect } from "@playwright/test";

// See here how to get started:
// https://playwright.dev/docs/intro
test("renders the datatable correctly", async ({ page }) => {
  await page.goto("/");
  // Verify the DataTable wrapper is present
  await expect(page.locator(".dt-wrapper")).toBeVisible();

  // Verify the search box (localized)
  await expect(page.locator(".dt-search input")).toHaveAttribute("placeholder", "Cari data...");

  // Verify table headers (from ExampleDataTable)
  await expect(page.locator("table.dataTable thead th").nth(1)).toContainText("Nm Uker");
});
