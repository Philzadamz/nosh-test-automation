// ============================================================
// PAGE OBJECT: Signup Page
// URL: /signup
// ============================================================
// This class represents the Sign Up / Registration page.
// New users fill in this form to create a Nosh account.
// ============================================================

class SignupPage {
  // ── SELECTORS ──────────────────────────────────────────────

  get fullNameInput() {
    return cy.get('input[name="name"]');
  }

  get emailInput() {
    return cy.get('input[type="email"], input[name="name"]');
  }

  get passwordInput() {
    // Target the first password field (not confirm password)
    return cy.get('input[type="password"], input[name="password"]').first();
  }

  get confirmPasswordInput() {
    return cy.get('input[type="password"], input[name="confirmPassword"]');
  }

  get phoneNumberInput() {
    return cy.get('input[type="number"], input[name="phoneNumber"]');
  }

  get termsCheckbox() {
    return cy.get('input[type="checkbox"], input#customCheckbox');
  }

  get signupButton() {
    return cy.contains("button", /sign up/i);
  }

  get signinLink() {
    return cy.contains("a", /sign in/i);
  }

  get pageHeading() {
    return cy.contains(/Create An Account/i);
  }

  // ── ACTIONS ────────────────────────────────────────────────

  /**
   * Navigate to the signup page
   */
  visit() {
    cy.visit("/signup");
  }

  /**
   * Fill in the full name field
   * @param {string} name
   */
  enterFullName(name) {
    this.fullNameInput.clear().type(name);
  }

  /**
   * Fill in the email field
   * @param {string} email
   */
  enterEmail(email) {
    this.emailInput.clear().type(email);
  }

  /**
   * Fill in the password field
   * @param {string} password
   */
  enterPassword(password) {
    this.passwordInput.clear().type(password);
  }

  /**
   * Fill in the confirm password field
   * @param {string} password
   */
  enterConfirmPassword(password) {
    this.confirmPasswordInput.clear().type(password);
  }

  /**
   * Fill in the phone number field
   * @param {string} phone
   */
  enterPhoneNumber(phone) {
    this.phoneNumberInput.clear().type(phone);
  }

  /**
   * Check the terms and conditions checkbox
   */
  acceptTerms() {
    this.termsCheckbox.check();
  }

  /**
   * Click the Sign Up button to submit the form
   */
  clickSignupButton() {
    this.signupButton.click();
  }

  /**
   * Complete the full signup form in one step
   * @param {Object} userData - user data from the fixture file
   */
  fillSignupForm(userData) {
    this.enterFullName(userData.fullName);
    this.enterEmail(userData.email);
    this.enterPassword(userData.password);
    this.enterConfirmPassword(userData.confirmPassword);
    this.enterPhoneNumber(userData.phoneNumber);
    this.acceptTerms();
  }
}

export default SignupPage;
