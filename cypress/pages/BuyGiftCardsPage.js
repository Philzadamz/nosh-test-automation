// ============================================================
// PAGE OBJECT: Buy Gift Cards Page
// URL: /buy-giftcard
// ============================================================
// A 5-step wizard for purchasing gift cards on Nosh.
//
// Step 1: Select Gift Card Country
// Step 2: Select Gift Card Brand
// Step 3: How much do you need? (amount + quantity)
// Step 4: Purchase Summary
// Step 5: Terms of Purchase
// ============================================================

class BuyGiftCardsPage {
  // ── SELECTORS ──────────────────────────────────────────────

  get stepIndicator() {
    // e.g. "Step 1/5", "Step 2/5"
    return cy.contains(/Step \d\/5/);
  }

  get stepper() {
    // Left-side non-clickable step list, anchored on the first step label
    return cy.contains("Select Gift Card Country").parents().first();
  }

  // Step 1
  get countrySearchInput() {
    return cy.get("input").filter(":visible").first();
  }

  get countryList() {
    return cy.contains("United States").parents().first();
  }

  // Step 2
  get brandSearchInput() {
    return cy.get('input[placeholder*="Search gift card"]');
  }

  // Step 3
  get amountDropdown() {
    return cy.get('button[aria-haspopup="listbox"]');
  }

  get quantityIncrement() {
    return cy.get("button.plus-btn");
  }

  get quantityDecrement() {
    return cy.get("button.minus-btn");
  }

  get amountToPay() {
    return cy.contains("Amount to pay");
  }

  // Step 4
  get purchaseSummary() {
    return cy.contains("Purchase Summary");
  }

  // Step 5
  get termsOfPurchase() {
    return cy.contains("Terms of Purchase");
  }

  get iUnderstandCheckbox() {
    // The input is hidden — target the label that controls it
    return cy.get('label[for="terms"]');
  }

  get completeOrderButton() {
    return cy.get("button.complete-order-btn");
  }

  get cancelLink() {
    return cy.get("button.cancel-btn");
  }

  get pinModal() {
    return cy.get(".form-modal-wrapper");
  }

  get pinInput() {
    return cy.get(".form-modal-wrapper input");
  }

  get confirmPinButton() {
    return cy.get("button.primary-btn");
  }

  // Navigation buttons
  get proceedButton() {
    return cy.contains("button", /Proceed/i);
  }

  get backButton() {
    return cy.contains("button", /Back/i);
  }

  // ── ACTIONS ────────────────────────────────────────────────

  /**
   * Navigate directly to the Buy Gift Cards page
   */
  visit() {
    cy.visit("/buy-giftcard");
  }

  /**
   * Step 1: Search for a country and select it
   * @param {string} countryName - e.g. "United States"
   */
  selectCountry(countryName) {
    this.countrySearchInput.clear().type(countryName);
    cy.contains(countryName).click();
  }

  /**
   * Step 2: Search for a brand in the search input
   * @param {string} keyword - e.g. "Netflix"
   */
  searchBrand(keyword) {
    this.brandSearchInput.clear().type(keyword);
  }

  /**
   * Step 2: Click on a brand by its visible name
   * @param {string} brandName - e.g. "Netflix"
   */
  selectBrand(brandName) {
    // Target the brand name inside the search result menuitem
    cy.get("p.giftcard-name")
      .contains(brandName, { matchCase: false })
      .should("be.visible")
      .click({ force: true });
  }

  /**
   * Step 3: Select the first available amount from the dropdown
   */
  selectFirstAmount() {
    // Open the Headless UI listbox, then pick the first option
    this.amountDropdown.click();
    cy.get('[role="listbox"]').should("be.visible");
    cy.get('[role="option"]').first().click();
  }

  /**
   * Click the Proceed button to advance to the next step
   */
  clickProceed() {
    this.proceedButton.click();
  }

  /**
   * Enter the transaction PIN in the confirmation modal
   * @param {string} pin - e.g. "1960"
   */
  enterPin(pin) {
    this.pinModal.should("be.visible");
    // PIN modal has one input per digit — type each character into its own input
    this.pinInput.each(($input, index) => {
      cy.wrap($input).type(pin[index]);
    });
  }

  /**
   * Click the Confirm Pin button to complete the order
   */
  clickConfirmPin() {
    this.confirmPinButton.click();
  }

  /**
   * Click the Back button to go to the previous step
   */
  clickBack() {
    this.backButton.click();
  }
}

export default BuyGiftCardsPage;
