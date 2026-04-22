// ============================================================
// PAGE OBJECT: Nosh Gift Codes Page
// URL: /nosh-giftcode
// ============================================================
// Landing page shows 3 sub-cards:
//   - Buy Nosh Gift Codes
//   - Redeem Gift Code
//   - Gift Code History
//
// Buy Nosh Gift Codes is a 3-step wizard:
//   Step 1: How much do you need? (amount + quantity)
//   Step 2: Purchase Summary
//   Step 3: Terms of Purchase → Complete Order → PIN
// ============================================================

class NoshGiftCodesPage {
  // ── LANDING PAGE SELECTORS ─────────────────────────────────

  get pageHeading() {
    return cy.contains("Nosh Gift Codes");
  }

  get buyNoshGiftCodesCard() {
    return cy.contains("Buy Nosh Gift Codes");
  }

  get redeemGiftCodeCard() {
    return cy.contains("Redeem Gift Code");
  }

  get giftCodeHistoryCard() {
    return cy.contains("Gift Code History");
  }

  // ── WIZARD SELECTORS ───────────────────────────────────────

  get wizardHeading() {
    return cy.contains("Buy Nosh Gift Codes");
  }

  // Step 1
  get amountInput() {
    return cy.get("input.bills-phone-input");
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

  // Step 2
  get purchaseSummary() {
    return cy.contains("Purchase Summary");
  }

  get giftCardCategory() {
    return cy.contains("Gift Card Category");
  }

  get selectedQuantity() {
    return cy.contains("Selected Quantity");
  }

  // Step 3
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

  // PIN modal
  get pinModal() {
    return cy.get(".form-modal-wrapper");
  }

  get pinInput() {
    return cy.get(".form-modal-wrapper input");
  }

  get confirmPinButton() {
    return cy.get("button.primary-btn");
  }

  // Navigation
  get proceedButton() {
    return cy.contains("button", /Proceed/i);
  }

  get backButton() {
    return cy.contains("button", /Back/i);
  }

  // ── ACTIONS ────────────────────────────────────────────────

  /**
   * Navigate directly to the Nosh Gift Codes landing page
   */
  visit() {
    cy.visit("/nosh-giftcode");
    cy.wait(3000);
  }

  /**
   * Click the Buy Nosh Gift Codes card on the landing page
   */
  clickBuyNoshGiftCodes() {
    this.buyNoshGiftCodesCard.click();
    cy.wait(2000);
  }

  /**
   * Step 1: Enter the amount
   * @param {number|string} amount
   */
  enterAmount(amount) {
    this.amountInput.clear().type(amount);
  }

  /**
   * Click the Proceed button to advance to the next step
   */
  clickProceed() {
    this.proceedButton.click();
  }

  /**
   * Click the Back button to return to the previous step
   */
  clickBack() {
    this.backButton.click();
  }

  /**
   * Step 3: Enter the transaction PIN — one digit per input box
   * @param {string} pin - e.g. "1960"
   */
  enterPin(pin) {
    this.pinModal.should("be.visible");
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
}

export default NoshGiftCodesPage;
