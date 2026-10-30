const { defineConfig } = require('@playwright/test')

module.exports = defineConfig({ 
    testDir: './tests',
    webServer: {
        command: 'npm run serve', 
        url: 'http://localhost:8082/',
        timeout: 120 * 1000,
        reuseExistingServer: !process.env.CI,
     },
    use: {
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
