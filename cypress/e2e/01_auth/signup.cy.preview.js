// ============================================================
// PREVIEW FILE — review this before applying to signup.cy.js
// ============================================================
// Changes from the current version:
//   - Removed fixture dependency (no more testData.json for signup)
//   - Added @faker-js/faker to generate all inputs dynamically
//   - Added generateUser() helper to produce a fresh user per test
//   - Split tests so each one tests a single field in isolation
//   - Referral code field is intentionally left blank / not touched
//   - Added cy.log() in the submission test for easier debugging
// ============================================================

import { faker } from "@faker-js/faker";
import SignupPage from "../../pages/SignupPage";

const signupPage = new SignupPage();

// ── HELPER: Generate a fresh random user ───────────────────
// Every field is faker-generated so tests never conflict with
// each other, even when run back-to-back multiple times.
function generateUser() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  // Build a password that meets typical strong-password rules:
  // at least one uppercase, one number, and one special character.
  const password = `${faker.internet.password({ length: 8, memorable: false })}A1@`;

  return {
    fullName: `${firstName} ${lastName}`,

    // Email is derived from the generated name for consistency
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),

    password,
    confirmPassword: password,

    // Nigerian phone numbers: "0" prefix + 10 random digits = 11 digits total
    phoneNumber: `0${faker.string.numeric(10)}`,

  };
}

// ────────────────────────────────────────────────────────────

describe("Signup / Registration", () => {
  beforeEach(() => {
    signupPage.visit();
  });

  // ── TEST 1 ──────────────────────────────────────────────
  it("should display the signup page with all required fields", () => {
    cy.url().should("include", "/signup");

    signupPage.pageHeading.should("be.visible");
    signupPage.fullNameInput.should("be.visible");
    signupPage.emailInput.should("be.visible");
    signupPage.passwordInput.should("be.visible");
    signupPage.confirmPasswordInput.should("be.visible");
    signupPage.phoneNumberInput.should("be.visible");
    signupPage.termsCheckbox.should("exist");
    signupPage.signupButton.should("be.visible");
  });

  // ── TEST 2 ──────────────────────────────────────────────
  it("should allow typing a randomly generated full name", () => {
    const user = generateUser();
    signupPage.enterFullName(user.fullName);
    signupPage.fullNameInput.should("have.value", user.fullName);
  });

  // ── TEST 3 ──────────────────────────────────────────────
  it("should allow typing a randomly generated email address", () => {
    const user = generateUser();
    signupPage.enterEmail(user.email);
    signupPage.emailInput.should("have.value", user.email);
  });

  // ── TEST 4 ──────────────────────────────────────────────
  it("should allow typing a password and matching confirm password", () => {
    const user = generateUser();
    signupPage.enterPassword(user.password);
    signupPage.enterConfirmPassword(user.confirmPassword);
    signupPage.passwordInput.should("have.value", user.password);
    signupPage.confirmPasswordInput.should("have.value", user.confirmPassword);
  });

  // ── TEST 5 ──────────────────────────────────────────────
  it("should allow typing a randomly generated Nigerian phone number", () => {
    const user = generateUser();
    signupPage.enterPhoneNumber(user.phoneNumber);
    signupPage.phoneNumberInput.should("have.value", user.phoneNumber);
  });

  // ── TEST 6 ──────────────────────────────────────────────
  it("should allow the user to check the terms and conditions checkbox", () => {
    signupPage.acceptTerms();
    signupPage.termsCheckbox.should("be.checked");
  });

  // ── TEST 7 ──────────────────────────────────────────────
  it("should navigate to the sign in page when Sign In link is clicked", () => {
    signupPage.signinLink.click();
    cy.url().should("include", "/signin");
  });

  // ── TEST 8 ──────────────────────────────────────────────
  it("should fill all fields with faker data and submit the signup form", () => {
    const user = generateUser();

    // Prints the generated user in the Cypress log — useful when debugging a failure
    cy.log(`Signing up as: ${user.fullName} | ${user.email} | ${user.country}`);

    signupPage.enterFullName(user.fullName);
    signupPage.enterEmail(user.email);
    signupPage.enterPassword(user.password);
    signupPage.enterConfirmPassword(user.confirmPassword);
    signupPage.enterPhoneNumber(user.phoneNumber);
    signupPage.acceptTerms();
    signupPage.clickSignupButton();

    // After a successful signup the app redirects away from /signup
    cy.url().should("not.include", "/signup");
  });
});
