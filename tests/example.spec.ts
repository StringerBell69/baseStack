import { test, expect } from "@playwright/test"

test.describe("Home Page", () => {
  test("should load and display the title", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(/BaseStack/)
  })

  test("should navigate to login page", async ({ page }) => {
    await page.goto("/")
    await page.click('a[href="/auth/login"]')
    await expect(page).toHaveURL(/\/auth\/login/)
  })

  test("should navigate to signup page", async ({ page }) => {
    await page.goto("/")
    await page.click('a[href="/auth/signup"]')
    await expect(page).toHaveURL(/\/auth\/signup/)
  })
})

test.describe("Authentication", () => {
  test("login page should have form elements", async ({ page }) => {
    await page.goto("/auth/login")
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/password/i)).toBeVisible()
    await expect(page.getByRole("button", { name: /login/i })).toBeVisible()
  })

  test("signup page should have form elements", async ({ page }) => {
    await page.goto("/auth/signup")
    await expect(page.getByLabel(/first name/i)).toBeVisible()
    await expect(page.getByLabel(/last name/i)).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/password/i)).toBeVisible()
  })
})

test.describe("Mobile Responsiveness", () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test("should be mobile responsive", async ({ page }) => {
    await page.goto("/")
    const heading = page.getByRole("heading", { name: /BaseStack/i })
    await expect(heading).toBeVisible()
  })
})
