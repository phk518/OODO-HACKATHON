const { test, expect } = require('@playwright/test');
const path = require('path');

test('Full auth flow: landing -> login -> dashboard', async ({ page }) => {
  // Navigate to landing page
  const indexUrl = `file://${path.join(__dirname, '..', 'index.html')}`;
  await page.goto(indexUrl);

  // Click Log In
  await page.locator('#btn-log-in').click();

  // Should navigate to login.html
  await page.waitForURL('**/login.html');

  // Fill in demo credentials
  await page.locator('#email').fill('demo@traveloop.com');
  await page.locator('#password').fill('demo123');

  // Submit the form
  await page.locator('#btn-sign-in').click();

  // Wait for redirect to dashboard
  await page.waitForURL('**/dashboard.html');

  // Verify dashboard loaded by checking for the hero greeting
  const greeting = page.locator('#hero-greeting');
  await expect(greeting).toBeVisible();
});
