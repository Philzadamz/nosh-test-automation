// ============================================================
// PAGE OBJECT: Dashboard Page
// URL: /dashboard
// ============================================================
// The dashboard is the first page a user sees after logging in.
// It shows the user's wallet balance, quick action buttons,
// recent transactions, and the main navigation menu.
// ============================================================

class DashboardPage {
  // ── SELECTORS ──────────────────────────────────────────────

  get pageTitle() {
    // The page title shown on the dashboard
    return cy.contains("Dashboard");
  }

  get ngnWalletCard() {
    return cy.contains("Nigerian Naira");
  }

  get usdWalletCard() {
    return cy.contains("United States Dollars");
  }

  get ghsWalletCard() {
    return cy.contains("Ghanaian Cedis");
  }

  get cryptoWalletCard() {
    return cy.contains("Crypto Wallet");
  }

  get recentTransactionsList() {
    // The list of recent transactions shown on the dashboard
    return cy.contains("Recent Transactions").parent();
  }

  get mainScrollContainer() {
    // The main content area is a styled-component with dynamic classes.
    // We locate it by traversing up from "Your Wallets" and finding the
    // nearest ancestor that has overflow-y: scroll.
    return cy
      .contains("Your Wallets")
      .parents()
      .filter((_i, el) => {
        const overflowY = Cypress.$(el).css("overflow-y");
        return overflowY === "scroll" || overflowY === "auto";
      })
      .first();
  }

  // ── ACTIONS ────────────────────────────────────────────────

  /**
   * Navigate directly to the dashboard page
   */
  visit() {
    cy.visit("/dashboard");
  }

  /**
   * Check if the dashboard has fully loaded by verifying the URL
   */
  verifyDashboardIsLoaded() {
    cy.url().should("include", "/dashboard");
  }
}

export default DashboardPage;
