// ============================================================
// TEST SUITE: Dashboard
// ============================================================
// These tests verify the Dashboard page after a user logs in.
//
// What is being tested:
//   1. The dashboard loads after login
//   2. The page title displays as Dashboard
//   3. The NGN, USD and GHS wallet balance cards are visible
//   4. The crypto wallet card is visible
//   5. The recent transactions section is visible on scroll
// ============================================================

import DashboardPage from "../../pages/DashboardPage";

const dashboardPage = new DashboardPage();

describe("Dashboard", () => {
  // Log in before every test in this suite using our custom command
  beforeEach(() => {
    cy.loginWithFixture();
  });

  // Wait 2000ms after each test before moving to the next
  afterEach(() => {
    cy.wait(2000);
  });

  // ── TEST 1 ──────────────────────────────────────────────
  it("should load the dashboard page after login", () => {
    // Verify the URL contains /dashboard
    dashboardPage.verifyDashboardIsLoaded();
  });

  // ── TEST 2 ──────────────────────────────────────────────
  it("should display the page title as Dashboard", () => {
    dashboardPage.pageTitle.should("be.visible");
  });

  // ── TEST 3 ──────────────────────────────────────────────
  it("should display the NGN, USD and GHS wallet balance cards", () => {
    dashboardPage.ngnWalletCard.should("be.visible");
    dashboardPage.usdWalletCard.should("be.visible");
    dashboardPage.ghsWalletCard.should("be.visible");
  });

  // ── TEST 4 ──────────────────────────────────────────────
  it("should display the crypto wallet card", () => {
    dashboardPage.cryptoWalletCard.should("be.visible");
  });

  // ── TEST 5 ──────────────────────────────────────────────
  it("should display the recent transactions section when scrolled to the bottom", () => {
    dashboardPage.mainScrollContainer.scrollTo("bottom");
    dashboardPage.recentTransactionsList.should("be.visible");
  });
});
