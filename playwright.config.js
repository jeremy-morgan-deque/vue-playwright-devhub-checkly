const { defineConfig } = require('@playwright/test')

// When a remote URL is provided (Checkly sets BASE_URL via checkly.config.js, and
// ENVIRONMENT_URL when a check runs against a deployment), test that URL directly.
// Otherwise start the local Vue dev server, exactly as before (local + GitHub Actions).
const remoteURL = process.env.ENVIRONMENT_URL || process.env.BASE_URL

module.exports = defineConfig({
    testDir: './tests',
    webServer: remoteURL
        ? undefined
        : {
            command: 'npm run serve',
            url: 'http://localhost:8082/',
            timeout: 120 * 1000,
            reuseExistingServer: !process.env.CI,
        },
    use: {
        baseURL: remoteURL || 'http://localhost:8082/',
        componentTesting: true,
        launchOptions: {
            executablePath: process.env.AXE_CHROME_PATH,
        },
    },
    projects: [
        {
            name: 'chromium',
            use: {
                browserName: 'chromium',
            },
        },
    ],
})
