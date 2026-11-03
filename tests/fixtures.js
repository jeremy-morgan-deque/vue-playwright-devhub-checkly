const { playwrightTest } = require('@axe-core/watcher/playwright-test')
const assert = require('assert')

// Get your axe Developer Hub configuration from environment variables.
// These must match the env vars set in .github/workflows/e2e.yml.
const ACCESSIBILITY_API_KEY = process.env.AXE_DEVHUB_API_KEY
const PROJECT_ID = process.env.AXE_DEVHUB_PROJECT_KEY_PLAYWRIGHT_CHECKLY
const SERVER_URL = process.env.AXE_DEVHUB_SERVER_VUE_APP || "https://axe.deque.com"

assert(ACCESSIBILITY_API_KEY, 'AXE_DEVHUB_API_KEY is required')
assert(PROJECT_ID, 'AXE_DEVHUB_PROJECT_KEY_PLAYWRIGHT_CHECKLY is required')

module.exports = playwrightTest({
  // axe watcher and devhub configuration
  axe: {
    apiKey: ACCESSIBILITY_API_KEY,
    projectId: PROJECT_ID,
    serverURL: SERVER_URL,
    takeScreenshots: true
    //runOptions: {
    //  runOnly: {
    //    type: 'tag',
    //    values: ['wcag2a', 'wcag2aa']
    //  }
    //}
  },
   
  //
  // existing playwright configuration goes here
  //

  // required for axe watcher
  // also note that chromium and chrome-for-testing is required for axe watcher as well
  headless: false,
  args: ['--headless=new']
});

