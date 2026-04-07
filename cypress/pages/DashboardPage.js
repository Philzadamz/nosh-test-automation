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

  get welcomeMessage() {
    // The greeting text shown to the user after login
    return cy.contains("Welcome");
  }

  get walletBalanceCard() {
    // The card displaying the user's available balance
    return cy.contains("Available Balance").parent();
  }

  get walletBalanceAmount() {
    // The actual balance figure
    return cy.get("[data-testid='wallet-balance']");
  }

  get sellGiftCardButton() {
    // Quick action button to start selling a gift card
    return cy.contains("Sell Gift Card");
  }

  get tradeButton() {
    // Alternative trade button on the dashboard
    return cy.contains("Trade");
  }

  get recentTransactionsList() {
    // The list of recent transactions shown on the dashboard
    return cy.contains("Recent Transactions").parent();
  }

  get viewAllTransactionsLink() {
    return cy.contains("View All");
  }

  // ── NAVIGATION MENU ────────────────────────────────────────

  get navDashboard() {
    return cy.contains("a", "Dashboard");
  }

  get navGiftCards() {
    return cy.contains("a", "Gift Cards");
  }

  get navWallet() {
    return cy.contains("a", "Wallet");
  }

  get navTransactions() {
    return cy.contains("a", "Transactions");
  }

  get navProfile() {
    return cy.contains("a", "Profile");
  }

  get userProfileAvatar() {
    // The user's avatar or initials in the top navigation bar
    return cy.get("[data-testid='user-avatar']");
  }

  // ── ACTIONS ────────────────────────────────────────────────

  /**
   * Navigate directly to the dashboard page
   */
  visit() {
    cy.visit("/dashboard");
  }

  /**
   * Click on "Sell Gift Card" quick action button
   */
  clickSellGiftCard() {
    this.sellGiftCardButton.click();
  }

  /**
   * Click on "View All" to see all transactions
   */
  clickViewAllTransactions() {
    this.viewAllTransactionsLink.click();
  }

  /**
   * Navigate to Gift Cards page via the side/top navigation
   */
  goToGiftCards() {
    this.navGiftCards.click();
  }

  /**
   * Navigate to Wallet page via navigation
   */
  goToWallet() {
    this.navWallet.click();
  }

  /**
   * Navigate to Transactions page via navigation
   */
  goToTransactions() {
    this.navTransactions.click();
  }

  /**
   * Navigate to Profile page via navigation
   */
  goToProfile() {
    this.navProfile.click();
  }

  /**
   * Check if the dashboard has fully loaded by verifying the URL
   */
  verifyDashboardIsLoaded() {
    cy.url().should("include", "/dashboard");
  }
}

export default DashboardPage;
