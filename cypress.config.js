const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // The base URL of the Nosh web application
    baseUrl: "https://dev.web.usenosh.com",

    // Where Cypress looks for test spec files
    specPattern: "cypress/e2e/**/*.cy.js",

    // Where page objects and helper files are stored
    supportFile: "cypress/support/e2e.js",

    // How long Cypress waits for elements to appear (in milliseconds)
    defaultCommandTimeout: 10000,

    // How long Cypress waits for pages to load (in milliseconds)
    pageLoadTimeout: 30000,

    // Save screenshots when a test fails
    screenshotOnRunFailure: true,

    // Save a video recording of each test run
    video: false,

    // Where screenshots are saved
    screenshotsFolder: "cypress/screenshots",

    // Where videos are saved
    videosFolder: "cypress/videos",

    // Viewport size (standard laptop screen)
    viewportWidth: 1280,
    viewportHeight: 720,

    // IMPORTANT: Keep running ALL tests even when one test fails.
    // Without this, Cypress stops the entire run after the first failing spec file.
    bail: false,

    // Automatically retry a failed test before marking it as failed.
    // runMode  = how many retries during `npm run cy:run` (headless)
    // openMode = how many retries during `npm run cy:open` (interactive UI)
    // This means a test must fail twice in a row before Cypress counts it as failed.
    retries: {
      runMode: 1,
      openMode: 0,
    },

    setupNodeEvents(on, config) {
      // Add any plugins or node event listeners here if needed in the future
      return config;
    },
  },
});
