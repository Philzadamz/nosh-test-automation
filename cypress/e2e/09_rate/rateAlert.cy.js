// ============================================================
// TEST SUITE: Rate Alert
// ============================================================
// Flow:
//   1. Navigate to Rate Alert via Dashboard Quick Access
//   2. Verify Rate Alert page loads
// ============================================================

import RatePage from "../../pages/RatePage";

const ratePage = new RatePage();

describe("Rate Alert", () => {
  beforeEach(() => {
    cy.loginWithFixture();
    ratePage.navigateToRateAlert();
  });

  afterEach(() => {
    cy.wait(2000);
  });

  // ── TEST 1 ──────────────────────────────────────────────
  it("should navigate to the Rate Alert page from the dashboard", () => {
    cy.wait(1000);
    cy.url().should("include", "/rate-alert");
  });

  // ── TEST 2 ──────────────────────────────────────────────
  it("should display the Rate Alert page content", () => {
    cy.wait(1000);
    ratePage.rateAlertHeading.should("be.visible");
  });
});