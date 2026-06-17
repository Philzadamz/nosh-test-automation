// ============================================================
// TEST SUITE: eSIM — Top Up
// ============================================================
// Flow:
//   1. Navigate to eSIM page via Dashboard Quick Access
//   2. Click "My eSIMs" button (top right) → goes to /e-sim/my-esims
//   3. Click "View details" on the first eSIM card
//   4. In the detail modal click "Top up" → scrolls to top-up packages
//   5. Select the first top-up plan (radio button — hidden, force: true)
//   6. Click "Buy Now"
//   7. Transaction Details modal → select Naira Wallet, enter PIN,
//      click confirmation checkbox (force: true), click "Top-up eSIM"
// ============================================================

import EsimPage from "../../pages/EsimPage";

const esimPage = new EsimPage();

describe("eSIM - Top Up", () => {
  beforeEach(() => {
    cy.loginWithFixture();
    esimPage.navigateFromDashboard();
  });

  afterEach(() => {
    cy.wait(2000);
  });

  // ── TEST 1 ──────────────────────────────────────────────
  it("should navigate to My eSIMs page when My eSIMs button is clicked", () => {
    esimPage.clickMyEsims();

    cy.wait(1000);
    cy.url().should("include", "/e-sim/my-esims");
  });

  // ── TEST 2 ──────────────────────────────────────────────
  it("should complete eSIM top up — first card, first top-up plan, Naira Wallet and PIN from fixture", () => {
    cy.fixture("testData").then((data) => {
      // Go to My eSIMs
      esimPage.clickMyEsims();

      cy.wait(1000);
      cy.url().should("include", "/e-sim/my-esims");

      // Open the first eSIM card detail modal
      esimPage.clickViewDetails();

      // Click "Top up" to scroll to the top-up packages section
      cy.wait(1000);
      esimPage.clickTopUp();

      // Select the first top-up plan (radio — hidden, force required)
      cy.wait(1000);
      esimPage.planCards.first().click({ force: true });

      // Click Buy Now
      esimPage.clickBuyNow();

      // Transaction Details modal
      cy.wait(1000);
      esimPage.transactionDetailsHeading.should("be.visible");

      // Select wallet
      esimPage.selectWallet(data.esim.wallet);

      // Enter withdrawal PIN
      esimPage.enterPin(data.esim.pin);

      // Click confirmation checkbox (hidden — force required)
      esimPage.clickConfirmationCheckbox();

      // Submit top-up
      esimPage.clickTopUpEsim();
    });
  });
});