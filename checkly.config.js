const { defineConfig } = require('checkly')
const { Frequency } = require('checkly/constructs')

module.exports = defineConfig({
  projectName: 'Vue Playwright DevHub',
  logicalId: 'vue-playwright-devhub-checkly',
  repoUrl: 'https://github.com/jeremy-morgan-deque/vue-playwright-devhub-checkly',
  checks: {
    // Default location for every check in this project.
    locations: ['us-east-1'],
    // Reuse the existing Playwright config: every test in it runs on Checkly,
    // wrapped by the Axe Watcher fixture in tests/fixtures.js.
    playwrightConfigPath: './playwright.config.js',
    playwrightChecks: [
      {
        logicalId: 'vue-app-e2e-a11y',
        name: 'Vue app E2E + accessibility (Axe Watcher)',
        pwProjects: ['chromium'],
        installCommand: 'npm ci',
        frequency: Frequency.EVERY_1H,
        locations: ['us-east-1'],
        // Point the suite at the live GitHub Pages site instead of a local dev server.
        // AXE_DEVHUB_API_KEY (secret) and AXE_DEVHUB_PROJECT_KEY_PLAYWRIGHT_CHECKLY
        // must exist as Checkly environment variables / secrets — see README notes in the PR.
        environmentVariables: [
          {
            key: 'BASE_URL',
            value: 'https://jeremy-morgan-deque.github.io/vue-playwright-devhub-checkly/',
          },
        ],
      },
    ],
  },
  cli: {
    runLocation: 'us-east-1',
  },
})
