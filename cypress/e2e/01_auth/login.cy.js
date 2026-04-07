// ============================================================
// TEST SUITE: Login
// ============================================================
// These tests verify that a registered user can successfully
// log into the Nosh platform.
//
// What is being tested:
//   1. The login page loads correctly
//   2. A user can log in with valid credentials
//   3. After login, the user lands on the dashboard
//   4. The login page has a working link to sign up
//   5. The login page has a working forgot password link
// ============================================================

import LoginPage from "../../pages/LoginPage";

// Create an instance of the LoginPage to use in our tests
const loginPage = new LoginPage();

describe("Login", () => {
  // Load the test data from the fixture file before all tests
  let testData;

  before(() => {
    cy.fixture("testData").then((data) => {
      testData = data;
    });
  });

  // Visit the login page before each individual test
  beforeEach(() => {
    loginPage.visit();
  });

  // ── TEST 1 ──────────────────────────────────────────────
  it("should display the login page correctly", () => {
    // Verify the page URL is correct
    cy.url().should("include", "/signin");

    // Verify the heading is visible
    loginPage.pageHeading.should("be.visible");

    // Verify the email and password inputs are on the page
    loginPage.emailInput.should("be.visible");
    loginPage.passwordInput.should("be.visible");

    // Verify the login button is on the page
    loginPage.loginButton.should("be.visible");
  });

  // ── TEST 2 ──────────────────────────────────────────────
  it("should log in successfully with valid credentials", () => {
    // Type in the email and password from our test data
    loginPage.login(
      testData.existingUser.email,
      testData.existingUser.password
    );

    // After clicking Log In, the URL should change away from /signin
    cy.url().should("not.include", "/signin");

    // The user should now be on the dashboard
    cy.url().should("include", "/dashboard");
  });

  // ── TEST 3 ──────────────────────────────────────────────
  it("should navigate to the signup page when Sign Up link is clicked", () => {
    loginPage.clickSignupLink();

    // Verify the URL changed to the signup page
    cy.url().should("include", "/signup");
  });

  // ── TEST 4 ──────────────────────────────────────────────
  it("should navigate to forgot password page when the link is clicked", () => {
    loginPage.clickForgotPassword();

    // Verify we are now on the forgot password page
    cy.url().should("include", "/forgotpassword");
  });
});
