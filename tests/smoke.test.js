import { test, expect } from '@playwright/test';

test.describe('Traveloop UI Audit', () => {
  test.setTimeout(120000);

  test('Verify all core routes render', async ({ page }) => {
    const routes = [
      '/',
      '/dashboard',
      '/discovery',
      '/community',
      '/profile',
      '/trips',
      '/create-trip',
      '/admin',
      '/login',
      '/register'
    ];

    for (const route of routes) {
      console.log(`Testing route: ${route}`);
      await page.goto(`http://localhost:5173${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
      
      // Give React a second to mount
      await page.waitForTimeout(1000);
      
      if (route === '/') {
        await expect(page.getByText('Your Next Adventure Awaits')).toBeVisible({ timeout: 15000 });
      } else {
        const title = page.locator('h1, h2, .page-title, .glass-card, #root > *');
        await expect(title.first()).toBeVisible({ timeout: 15000 });
      }
      
      console.log(`Successfully verified ${route}`);
    }
  });
});
