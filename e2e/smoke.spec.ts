import { test, expect } from "@playwright/test"

test("home loads and search navigates to sorting", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("heading", { name: /welcome to/i })).toBeVisible()
  await page.getByRole("link", { name: /start exploring/i }).click()
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/sorting/i)
})
