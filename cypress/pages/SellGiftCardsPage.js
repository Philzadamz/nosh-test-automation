// ============================================================
// PAGE OBJECT: Sell Gift Cards Page
// URL: /sell-giftcard
// ============================================================
// A 3-step wizard for selling gift cards on Nosh.
//
// Step 1: Select Gift Card Category (brand, subcategory, amount)
// Step 2: Upload Images (skipped — comment entered instead)
// Step 3: Review Transaction Details
// ============================================================

class SellGiftCardsPage {
  // ── SELECTORS ──────────────────────────────────────────────

  get stepIndicator() {
    return cy.contains(/Step \d\/3/);
  }

  // Step 1
  get categorySearchInput() {
    return cy.get("input.search-input");
  }

  get searchResults() {
    return cy.get("div.search-results");
  }

  get subcategoryDropdown() {
    return cy.get("button.edit-category-btn").first();
  }

  get rateDisplay() {
    return cy.contains(/Rate:/);
  }

  get amountInput() {
    return cy.get("div.input-container input[name='amount']");
  }

  // Step 2
  get commentBox() {
    return cy.get("textarea.comment-box");
  }

  get uploadArea() {
    return cy.get('label[for="images"]');
  }

  // Step 3
  get reviewHeading() {
    return cy.contains("Review Transaction Details");
  }

  get nairaEquivalent() {
    return cy.contains("Naira Equivalent");
  }

  get totalAmount() {
    return cy.contains("Total Amount");
  }

  get addedComment() {
    return cy.contains("Added Comment");
  }

  get importantNoticeModal() {
    return cy.contains("Important Notice!");
  }

  get submitTradeButton() {
    return cy.contains("button", "Submit Trade");
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
   * Navigate directly to the Sell Gift Cards page
   */
  visit() {
    cy.visit("/sell-giftcard");
  }

  /**
   * Step 1: Search for a gift card brand and select it from results
   * @param {string} brandName - e.g. "Best Buy"
   */
  selectCategory(brandName) {
    this.categorySearchInput.clear({ force: true }).type(brandName, { force: true });
    this.searchResults.should("be.visible");
    cy.get("p.country-name")
      .contains(brandName, { matchCase: false })
      .should("be.visible")
      .click({ force: true });
  }

  /**
   * Step 1: Open the subcategory dropdown and select an option
   * @param {string} subcategoryName - e.g. "USA Best buy Physical Card"
   */
  selectSubcategory(subcategoryName) {
    this.subcategoryDropdown.click();
    cy.contains('[role="option"]', subcategoryName, { matchCase: false })
      .click({ force: true });
  }

  /**
   * Step 1: Enter the gift card amount
   * @param {number|string} amount
   */
  enterAmount(amount) {
    this.amountInput.clear().type(amount);
  }

  /**
   * Step 2: Enter a comment in the comment box
   * @param {string} comment
   */
  enterComment(comment) {
    this.commentBox.clear().type(comment);
  }

  /**
   * Click Proceed to advance to the next step
   */
  clickProceed() {
    this.proceedButton.click();
  }

  /**
   * Click Back to return to the previous step
   */
  clickBack() {
    this.backButton.click();
  }
}

export default SellGiftCardsPage;
