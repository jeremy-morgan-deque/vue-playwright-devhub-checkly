// Get `test` and `expect` from axe-watcher's playwrightTest instead of playwright/test
const { test, expect } = require('./fixtures');

//
// Goto locally running Vue instance
//
test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:8082/?');
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
