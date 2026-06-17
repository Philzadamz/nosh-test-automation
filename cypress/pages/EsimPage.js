// ============================================================
// PAGE OBJECT: eSIM
// ============================================================
// Navigation: Dashboard Quick Access → "eSIM" (a[href="/e-sim"])
//
// eSIM page has three purchase tabs:
//   Regional eSIM → pick a region → pick a plan → Buy Now
//   Local eSIM    → pick a country → pick a plan → Buy Now
//   Global eSIM   → pick a plan → Buy Now
//
// After selecting a plan and clicking Buy Now:
//   1. Plan Summary modal  → shows coverage, data, validity, price → Proceed
//   2. Transaction Details → select wallet, enter PIN, check checkbox → Purchase eSIM
// ============================================================

class EsimPage {
  // ── DASHBOARD NAVIGATION ───────────────────────────────────

  navigateFromDashboard() {
    cy.get('a[href="/e-sim"]').first().scrollIntoView().click();
    cy.wait(2000);
  }

  // ── TABS ───────────────────────────────────────────────────

  get regionalEsimTab() {
    return cy.contains("Regional eSIM");
  }

  get localEsimTab() {
    return cy.contains("Local eSIM");
  }

  get globalEsimTab() {
    return cy.contains("Global eSIM");
  }

  // ── REGIONAL eSIM — REGION CARDS ──────────────────────────

  get africaRegion() {
    return cy.contains("Africa");
  }

  get asiaRegion() {
    return cy.contains("Asia");
  }

  get caribbeanIslandsRegion() {
    return cy.contains("Caribbean Islands");
  }

  get europeRegion() {
    return cy.contains("Europe");
  }

  get latinAmericaRegion() {
    return cy.contains("Latin America");
  }

  get middleEastRegion() {
    return cy.contains("Middle East & North Africa");
  }

  get northAmericaRegion() {
    return cy.contains("North America");
  }

  get oceaniaRegion() {
    return cy.contains("Oceania");
  }

  // ── PLAN CARDS ─────────────────────────────────────────────

  get planCards() {
    // Each plan card wraps a hidden radio input with name="e-sim-package"
    return cy.get('input[type="radio"][name="e-sim-package"]');
  }

  get buyNowButton() {
    return cy.contains("button", /Buy Now/);
  }

  // ── PLAN SUMMARY MODAL ─────────────────────────────────────

  get planSummaryHeading() {
    return cy.contains("Plan Summary");
  }

  get planSummaryProceedButton() {
    return cy.contains("button", "Proceed");
  }

  // ── MY eSIMs PAGE ──────────────────────────────────────────

  get myEsimsLink() {
    return cy.get('a[href="/e-sim/my-esims"]').first();
  }

  get viewDetailsButton() {
    return cy.contains("button", "View details").first();
  }

  get topUpLink() {
    // "Top up" anchor inside the eSIM detail modal — scrolls to purchase top-up section
    return cy.get('a[href*="topup-packages"]');
  }

  // ── TRANSACTION DETAILS MODAL ──────────────────────────────

  get transactionDetailsHeading() {
    return cy.contains("Transaction Details");
  }

  get transactionWalletDropdown() {
    // Wallet selector inside Transaction Details modal
    return cy.get('button[aria-haspopup="listbox"]').first();
  }

  get pinInput() {
    return cy.get('input[type="password"]');
  }

  get confirmationCheckbox() {
    // Hidden checkbox — requires force: true to click
    return cy.get('input[type="checkbox"]');
  }

  get purchaseEsimButton() {
    return cy.contains("button", "Purchase eSIM");
  }

  get topUpEsimButton() {
    return cy.contains("button", "Top-up eSIM");
  }

  // ── ACTIONS ────────────────────────────────────────────────

  clickRegionalEsimTab() {
    this.regionalEsimTab.click();
    cy.wait(500);
  }

  clickLocalEsimTab() {
    this.localEsimTab.click();
    cy.wait(500);
  }

  clickGlobalEsimTab() {
    this.globalEsimTab.click();
    cy.wait(500);
  }

  clickRegion(region) {
    cy.contains(region).click();
    cy.wait(2000);
  }

  /**
   * Select the first available plan card (radio input — hidden, force required)
   */
  selectFirstPlan() {
    this.planCards.first().click({ force: true });
  }

  clickBuyNow() {
    this.buyNowButton.click();
    cy.wait(1000);
  }

  clickPlanSummaryProceed() {
    this.planSummaryProceedButton.click();
    cy.wait(1000);
  }

  selectWallet(wallet) {
    this.transactionWalletDropdown.click();
    cy.contains('[role="option"]', wallet, { matchCase: false }).click({ force: true });
  }

  enterPin(pin) {
    this.pinInput.clear().type(pin);
  }

  clickConfirmationCheckbox() {
    // Checkbox has display:none — force is required
    this.confirmationCheckbox.click({ force: true });
  }

  clickPurchaseEsim() {
    this.purchaseEsimButton.click();
  }

  clickMyEsims() {
    // Link is inside a container with lg:hidden — force required
    this.myEsimsLink.click({ force: true });
    cy.wait(2000);
  }

  clickViewDetails() {
    this.viewDetailsButton.click();
    cy.wait(1000);
  }

  clickTopUp() {
    this.topUpLink.click();
    cy.wait(1000);
  }

  clickTopUpEsim() {
    this.topUpEsimButton.click();
  }
}

export default EsimPage;