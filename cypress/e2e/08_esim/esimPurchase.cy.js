// ============================================================
// TEST SUITE: eSIM — Purchase
// ============================================================
// Flow:
//   1. Navigate to eSIM page via Dashboard Quick Access
//   2. Verify all 3 tabs are visible (Regional, Local, Global)
//   3. Click Local eSIM tab → verify country list is shown
//   4. Click Global eSIM tab → verify global plan cards are shown
//   5. Click Regional eSIM tab → verify region cards are shown
//   6. Purchase from Regional eSIM:
//        a. Click Africa region
//        b. Select first plan card
//        c. Click Buy Now
//        d. Plan Summary modal → click Proceed
//        e. Transaction Details → select wallet, enter PIN,
//           click checkbox (force), click Purchase eSIM
// ============================================================

import EsimPage from "../../pages/EsimPage";

const esimPage = new EsimPage();

describe("eSIM - Purchase", () => {
  beforeEach(() => {
    cy.loginWithFixture();
    esimPage.navigateFromDashboard();
  });

  afterEach(() => {
    cy.wait(2000);
  });

  // ── TEST 1 ──────────────────────────────────────────────
  it("should navigate to the eSIM page from the dashboard", () => {
    cy.wait(1000);
    cy.url().should("include", "/e-sim");
  });

  // ── TEST 2 ──────────────────────────────────────────────
  it("should display all 3 eSIM tabs — Regional, Local and Global", () => {
    cy.wait(1000);
    esimPage.regionalEsimTab.should("be.visible");
    esimPage.localEsimTab.should("be.visible");
    esimPage.globalEsimTab.should("be.visible");
  });

  // ── TEST 3 ──────────────────────────────────────────────
  it("should show a country list when Local eSIM tab is clicked", () => {
    esimPage.clickLocalEsimTab();
    cy.wait(1000);
    // Verify the country list renders — check countries at the top of the alphabetical grid
    cy.contains("Afghanistan").should("be.visible");
    cy.contains("Albania").should("be.visible");
  });

  // ── TEST 4 ──────────────────────────────────────────────
  it("should show global plan cards when Global eSIM tab is clicked", () => {
    esimPage.clickGlobalEsimTab();
    cy.wait(1000);
    esimPage.planCards.should("have.length.greaterThan", 0);
  });

  // ── TEST 5 ──────────────────────────────────────────────
  it("should show region cards when Regional eSIM tab is clicked", () => {
    esimPage.clickRegionalEsimTab();
    cy.wait(1000);
    esimPage.africaRegion.should("be.visible");
    esimPage.asiaRegion.should("be.visible");
    esimPage.europeRegion.should("be.visible");
    esimPage.northAmericaRegion.should("be.visible");
  });

  // ── TEST 6 ──────────────────────────────────────────────
  it("should complete eSIM purchase from Regional — Africa, first plan, wallet and PIN from fixture", () => {
    cy.fixture("testData").then((data) => {
      // Navigate to Regional eSIM (default tab)
      esimPage.clickRegionalEsimTab();

      // Click Africa region
      esimPage.clickRegion(data.esim.region);

      // Select first available plan
      esimPage.selectFirstPlan();

      // Click Buy Now
      esimPage.clickBuyNow();

      // Plan Summary modal — verify and proceed
      cy.wait(1000);
      esimPage.planSummaryHeading.should("be.visible");
      esimPage.clickPlanSummaryProceed();

      // Transaction Details modal — select wallet, enter PIN, checkbox, purchase
      cy.wait(1000);
      esimPage.transactionDetailsHeading.should("be.visible");
      esimPage.selectWallet(data.esim.wallet);

      esimPage.enterPin(data.esim.pin);

      // Checkbox confirms device is eSIM compatible — hidden, force required
      esimPage.clickConfirmationCheckbox();

      esimPage.clickPurchaseEsim();
    });
  });
});