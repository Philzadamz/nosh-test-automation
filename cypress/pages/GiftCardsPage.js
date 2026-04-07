// ============================================================
// PAGE OBJECT: Gift Cards Page
// URL: /giftcards
// ============================================================
// This page is where users trade (sell) their gift cards.
// The flow typically is:
//   1. Select a gift card category (e.g. Amazon, iTunes)
//   2. Select subcategory or card type
//   3. Enter the card amount
//   4. Enter the card code/PIN
//   5. Submit the trade and wait for confirmation
// ============================================================

class GiftCardsPage {
  // ── SELECTORS ──────────────────────────────────────────────

  get pageHeading() {
    return cy.contains("Gift Cards");
  }

  get searchInput() {
    // Search bar to filter gift card categories
    return cy.get('input[placeholder*="Search"]');
  }

  get giftCardCategoryList() {
    // The grid/list of available gift card categories
    return cy.get("[data-testid='gift-card-list']");
  }

  get selectedCategoryHeading() {
    // Heading shown after a category is selected
    return cy.get("[data-testid='selected-category']");
  }

  get amountInput() {
    // Input field where user enters the gift card value
    return cy.get('input[placeholder*="amount"]');
  }

  get cardCodeInput() {
    // Input where user types the gift card code/PIN
    return cy.get('input[placeholder*="code"]');
  }

  get rateDisplay() {
    // Shows how much the user will receive for their card
    return cy.contains("Rate");
  }

  get estimatedPayoutDisplay() {
    // Shows the estimated payout in local currency
    return cy.contains("You will receive");
  }

  get proceedButton() {
    return cy.contains("button", "Proceed");
  }

  get submitTradeButton() {
    return cy.contains("button", "Submit");
  }

  get confirmTradeButton() {
    return cy.contains("button", "Confirm");
  }

  get successMessage() {
    // Message shown after a successful trade submission
    return cy.contains("successful");
  }

  get tradeReferenceNumber() {
    // The reference number given after a trade is submitted
    return cy.get("[data-testid='trade-reference']");
  }

  // ── ACTIONS ────────────────────────────────────────────────

  /**
   * Navigate to the gift cards page
   */
  visit() {
    cy.visit("/giftcards");
  }

  /**
   * Search for a specific gift card category
   * @param {string} keyword - e.g. "Amazon" or "iTunes"
   */
  searchForGiftCard(keyword) {
    this.searchInput.clear().type(keyword);
  }

  /**
   * Click on a gift card category by its visible name
   * @param {string} categoryName - e.g. "Amazon"
   */
  selectGiftCardCategory(categoryName) {
    cy.contains(categoryName).click();
  }

  /**
   * Select a subcategory (card type/region)
   * @param {string} subcategoryName - e.g. "Amazon USA"
   */
  selectSubcategory(subcategoryName) {
    cy.contains(subcategoryName).click();
  }

  /**
   * Type in the value of the gift card
   * @param {string} amount - e.g. "50"
   */
  enterCardAmount(amount) {
    this.amountInput.clear().type(amount);
  }

  /**
   * Type in the gift card code or PIN
   * @param {string} code - the card code
   */
  enterCardCode(code) {
    this.cardCodeInput.clear().type(code);
  }

  /**
   * Click Proceed to move to the next step
   */
  clickProceed() {
    this.proceedButton.click();
  }

  /**
   * Click Submit to submit the trade
   */
  clickSubmitTrade() {
    this.submitTradeButton.click();
  }

  /**
   * Click Confirm on the confirmation dialog
   */
  clickConfirmTrade() {
    this.confirmTradeButton.click();
  }
}

export default GiftCardsPage;
