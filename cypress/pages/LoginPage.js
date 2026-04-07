// ============================================================
// PAGE OBJECT: Login Page
// URL: /signin
// ============================================================
// This class represents the Login page of the Nosh application.
// It contains:
//   - SELECTORS: how to find elements on the page
//   - ACTIONS: methods that perform actions on the page
// ============================================================

class LoginPage {
  // ── SELECTORS ──────────────────────────────────────────────
  // These describe how to find each element on the login page.

  get emailInput() {
    return cy.get('input[type="email"], input[name="email"], #email');
  }

  get passwordInput() {
    return cy.get('input[type="password"], input[name="password"], #password');
  }

  get loginButton() {
    return cy.get("button").contains("button", /log in/i);
  }

  get forgotPasswordLink() {
    return cy.contains("a", /forgot password/i);
  }

  get signupLink() {
    return cy.contains("a", /sign up|create account|register/i);
  }

  get pageHeading() {
    return cy.contains("Welcome Back");
  }

  // ── ACTIONS ────────────────────────────────────────────────
  // These are steps a user would take on the login page.

  /**
   * Navigate to the login page
   */
  visit() {
    cy.visit("/signin");
  }

  /**
   * Type an email address into the email field
   * @param {string} email - The email address to enter
   */
  enterEmail(email) {
    this.emailInput.clear().type(email);
  }

  /**
   * Type a password into the password field
   * @param {string} password - The password to enter
   */
  enterPassword(password) {
    this.passwordInput.clear().type(password);
  }

  /**
   * Click the Log In button
   */
  clickLoginButton() {
    this.loginButton.click();
  }

  /**
   * Complete the full login process in one step
   * @param {string} email
   * @param {string} password
   */
  login(email, password) {
    this.enterEmail(email);
    this.enterPassword(password);
    this.clickLoginButton();
  }

  /**
   * Click the Forgot Password link
   */
  clickForgotPassword() {
    this.forgotPasswordLink.click();
  }

  /**
   * Click the Sign Up link to go to the registration page
   */
  clickSignupLink() {
    this.signupLink.click();
  }
}

export default LoginPage;
