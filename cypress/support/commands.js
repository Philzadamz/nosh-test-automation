// ============================================================
// CUSTOM CYPRESS COMMANDS
// ============================================================
// Custom commands are reusable actions you can call in any test.
// Instead of writing the same login steps in every test file,
// we write it once here and call cy.login() anywhere we need it.
// ============================================================

import LoginPage from "../pages/LoginPage";

const loginPage = new LoginPage();

/**
 * Custom command: cy.login(email, password)
 *
 * Use this in any test to log into Nosh without repeating steps.
 *
 * Example usage in a test:
 *   cy.login('user@example.com', 'Password123@')
 */
Cypress.Commands.add("login", (email, password) => {
  cy.visit("/signin");
  loginPage.enterEmail(email);
  loginPage.enterPassword(password);
  loginPage.clickLoginButton();

  // Wait until the dashboard is visible before continuing
  cy.url().should("not.include", "/signin");
});

/**
 * Custom command: cy.loginWithFixture()
 *
 * Logs in using the credentials stored in cypress/fixtures/testData.json.
 * This is the easiest way to log in — no need to pass credentials manually.
 *
 * Example usage in a test:
 *   cy.loginWithFixture()
 */
Cypress.Commands.add("loginWithFixture", () => {
  cy.fixture("testData").then((data) => {
    cy.login(data.existingUser.email, data.existingUser.password);
  });
});
