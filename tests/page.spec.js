// Get `test` and `expect` from axe-watcher's playwrightTest instead of playwright/test
const { test, expect } = require('./fixtures');

//
// Go to the app under test. The base URL comes from playwright.config.js:
// the local Vue dev server by default, or the live site when run on Checkly.
// './' keeps the GitHub Pages sub-path (/vue-playwright-devhub-checkly/) intact.
//
test.beforeEach(async ({ page }) => {
  await page.goto('./');
});

//
// Make sure we have the correct title
//
test('homepage has correct title', async ({ page }) => {
  await expect(page).toHaveTitle('Hello World!');
});

test('trigger login error', async ({ page }) => {
  await page.fill('input.username', 'GoodUser');
  await page.fill('input.password', 'BadPassword');
  await page.click('button.login-button', {force:true});
  await page.click('button.login-button', {force:true});
  const divLoginError = await page.locator('div.login-error');
  await expect(divLoginError).toBeVisible();
});
