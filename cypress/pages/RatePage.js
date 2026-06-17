// ============================================================
// PAGE OBJECT: Rate Alert & Rate Calculator
// ============================================================
// Navigation:
//   Rate Alert      → Dashboard Quick Access → "Rate Alert"      (a[href="/rate-alert"])
//   Rate Calculator → Dashboard Quick Access → "Rate Calculators" (a[href="/rate-calculator"])
//
// Both links are in the Quick Access grid; use .first() and
// scrollIntoView() to avoid matching any sidebar duplicates.
// ============================================================

class RatePage {
  // ── DASHBOARD NAVIGATION ───────────────────────────────────

  navigateToRateAlert() {
    cy.get('a[href="/rate-alert"]').first().scrollIntoView().click();
    cy.wait(2000);
  }

  navigateToRateCalculator() {
    cy.get('a[href="/rate-calculator"]').first().scrollIntoView().click();
    cy.wait(2000);
  }

  // ── RATE ALERT PAGE ────────────────────────────────────────

  get rateAlertHeading() {
    return cy.contains("Rate Alert");
  }

  get createAlertButton() {
    return cy.contains("button", /create alert/i);
  }

  get fromCurrencyDropdown() {
    return cy.get('button[aria-haspopup="listbox"]').first();
  }

  get toCurrencyDropdown() {
    return cy.get('button[aria-haspopup="listbox"]').eq(1);
  }

  get targetRateInput() {
    return cy.get('input[type="number"]').first();
  }

  get saveAlertButton() {
    return cy.contains("button", /save/i);
  }

  // ── RATE CALCULATOR PAGE ───────────────────────────────────

  get rateCalculatorHeading() {
    return cy.contains("Rate Calculators");
  }

  get giftCardTab() {
    return cy.contains("Gift Card");
  }

  get cryptoTab() {
    return cy.contains("Crypto");
  }

  get giftCardCategoryDropdown() {
    // Custom dropdown identified by its placeholder text
    return cy.contains("Gift Card Category");
  }

  get giftCardSubcategoryDropdown() {
    // Custom dropdown identified by its placeholder text
    return cy.contains("Gift Card Subcategory");
  }

  get giftCardAmountInput() {
    return cy.get('input[name="amount"]');
  }

  get calculatedResult() {
    // The converted NGN value shown below the amount input
    return cy.contains(/₦|NGN/);
  }

  // ── ACTIONS ────────────────────────────────────────────────

  selectFromCurrency(currency) {
    this.fromCurrencyDropdown.click();
    cy.contains('[role="option"]', currency, { matchCase: false }).click({ force: true });
  }

  selectToCurrency(currency) {
    this.toCurrencyDropdown.click();
    cy.contains('[role="option"]', currency, { matchCase: false }).click({ force: true });
  }

  enterTargetRate(rate) {
    this.targetRateInput.clear().type(rate);
  }

  selectGiftCardCategory(category) {
    this.giftCardCategoryDropdown.click();
    cy.contains(category).click();
  }

  selectGiftCardSubcategory(subcategory) {
    this.giftCardSubcategoryDropdown.click();
    cy.contains(subcategory).click();
  }

  enterGiftCardAmount(amount) {
    this.giftCardAmountInput.clear().type(amount);
  }
}

export default RatePage;