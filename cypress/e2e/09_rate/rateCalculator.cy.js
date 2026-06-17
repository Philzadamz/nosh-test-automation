// ============================================================
// TEST SUITE: Rate Calculator
// ============================================================
// Flow:
//   1. Navigate to Rate Calculator via Dashboard Quick Access
//   2. Verify Rate Calculator page loads
// ============================================================

import RatePage from "../../pages/RatePage";

const ratePage = new RatePage();

describe("Rate Calculator", () => {
  beforeEach(() => {
    cy.loginWithFixture();
    ratePage.navigateToRateCalculator();
  });

  afterEach(() => {
    cy.wait(2000);
  });

  // ── TEST 1 ──────────────────────────────────────────────
  it("should navigate to the Rate Calculator page from the dashboard", () => {
    cy.wait(1000);
    cy.url().should("include", "/rate-calculator");
  });

  // ── TEST 2 ──────────────────────────────────────────────
  it("should display the Rate Calculator page content", () => {
    cy.wait(1000);
    ratePage.rateCalculatorHeading.should("be.visible");
    ratePage.giftCardTab.should("be.visible");
    ratePage.cryptoTab.should("be.visible");
  });

  // ── TEST 3 ──────────────────────────────────────────────
  it("should calculate gift card rate — category, subcategory and amount from fixture", () => {
    cy.fixture("testData").then((data) => {
      cy.wait(1000);

      // Gift Card tab is active by default — no click needed

      // Select gift card category
      ratePage.selectGiftCardCategory(data.rateCalculator.category);
      cy.wait(1000);

      // Select subcategory
      ratePage.selectGiftCardSubcategory(data.rateCalculator.subcategory);
      cy.wait(1000);

      // Enter amount
      ratePage.enterGiftCardAmount(data.rateCalculator.amount);

      // Verify a calculated result is shown
      cy.wait(1000);
      ratePage.calculatedResult.should("exist");
    });
  });
});