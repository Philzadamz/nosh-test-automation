// ============================================================
// TEST SUITE: Dashboard
// ============================================================
// These tests verify the Dashboard page after a user logs in.
//
// What is being tested:
//   1. The dashboard loads after login
//   2. Key sections are visible (balance, quick actions)
//   3. Navigation links take the user to the right pages
//   4. The "Sell Gift Card" button is accessible
//   5. Recent transactions section is visible
// ============================================================

import DashboardPage from "../../pages/DashboardPage";

const dashboardPage = new DashboardPage();

describe("Dashboard", () => {
  // Log in before every test in this suite using our custom command
  beforeEach(() => {
    cy.loginWithFixture();
  });

  // ── TEST 1 ──────────────────────────────────────────────
  it("should load the dashboard page after login", () => {
    // Verify the URL contains /dashboard
    dashboardPage.verifyDashboardIsLoaded();
  });

  // ── TEST 2 ──────────────────────────────────────────────
  it("should display a welcome message to the user", () => {
    dashboardPage.welcomeMessage.should("be.visible");
  });

  // ── TEST 3 ──────────────────────────────────────────────
  it("should display the wallet balance card", () => {
    dashboardPage.walletBalanceCard.should("be.visible");
  });

  // ── TEST 4 ──────────────────────────────────────────────
  it("should display the Sell Gift Card quick action button", () => {
    dashboardPage.sellGiftCardButton.should("be.visible");
  });

  // ── TEST 5 ──────────────────────────────────────────────
  it("should display the recent transactions section", () => {
    dashboardPage.recentTransactionsList.should("be.visible");
  });

  // ── TEST 6 ──────────────────────────────────────────────
  it("should navigate to Gift Cards page from the navigation menu", () => {
    dashboardPage.goToGiftCards();
    cy.url().should("include", "/giftcards");
  });

  // ── TEST 7 ──────────────────────────────────────────────
  it("should navigate to Wallet page from the navigation menu", () => {
    dashboardPage.goToWallet();
    cy.url().should("include", "/wallet");
  });

  // ── TEST 8 ──────────────────────────────────────────────
  it("should navigate to Transactions page from the navigation menu", () => {
    dashboardPage.goToTransactions();
    cy.url().should("include", "/transactions");
  });

  // ── TEST 9 ──────────────────────────────────────────────
  it("should navigate to Gift Cards page when Sell Gift Card is clicked", () => {
    dashboardPage.clickSellGiftCard();

    // Clicking "Sell Gift Card" should take the user to the gift cards page
    cy.url().should("include", "/giftcards");
  });

  // ── TEST 10 ─────────────────────────────────────────────
  it("should navigate to Transactions page when View All is clicked", () => {
    dashboardPage.clickViewAllTransactions();
    cy.url().should("include", "/transactions");
  });
});
