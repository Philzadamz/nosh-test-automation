// ============================================================
// TEST SUITE: Signup / Registration
// ============================================================
// These tests verify that a new user can register on Nosh.
//
// What is being tested:
//   1. The signup page loads correctly with all required fields
//   2. A new user can fill out and submit the signup form
//   3. The signup page has a working link back to login
//   4. A new user can complete full registration and be redirected
// ============================================================

import SignupPage from "../../pages/SignupPage";

const signupPage = new SignupPage();

describe("Signup / Registration", () => {
  let testData;

  before(() => {
    cy.fixture("testData").then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    signupPage.visit();
  });

  // ── TEST 1 ──────────────────────────────────────────────
  it("should display the signup page with all required fields", () => {
    cy.url().should("include", "/signup");

    // Verify all form fields are visible to the user
    signupPage.fullNameInput.should("be.visible");
    signupPage.emailInput.should("be.visible");
    signupPage.passwordInput.should("be.visible");
    signupPage.confirmPasswordInput.should("be.visible");
    signupPage.phoneNumberInput.should("be.visible");
    signupPage.termsCheckbox.should("exist");
    signupPage.signupButton.should("be.visible");
  });

  // ── TEST 2 ──────────────────────────────────────────────
  it("should allow a user to fill in all signup form fields", () => {
    // Use a unique email with a timestamp to avoid "already exists" errors
    const uniqueEmail = `testuser_${Date.now()}@mailinator.com`;
    const userData = { ...testData.newUser, email: uniqueEmail };

    // Fill in every field of the signup form
    signupPage.fillSignupForm(userData);

    // Verify the form fields actually contain the values we typed
    signupPage.fullNameInput.should("have.value", userData.fullName);
    signupPage.emailInput.should("have.value", uniqueEmail);
    signupPage.phoneNumberInput.should("have.value", userData.phoneNumber);
  });

  // ── TEST 3 ──────────────────────────────────────────────
  it("should navigate to the login page when Sign In link is clicked", () => {
    signupPage.signinLink.click();
    cy.url().should("include", "/signin");
  });

  // ── TEST 4 ──────────────────────────────────────────────
  it("should allow a new user to complete registration and be redirected", () => {
    // Generate a unique email so this test can run repeatedly
    const uniqueEmail = `noshtest_${Date.now()}@mailinator.com`;
    const userData = { ...testData.newUser, email: uniqueEmail };

    // Fill in the full form
    signupPage.fillSignupForm(userData);

    // Submit the form
    signupPage.clickSignupButton();

    // After successful registration, the user should be redirected
    // (either to login, dashboard, or an email verification page)
    cy.url().should("not.include", "/signup");
  });
});
