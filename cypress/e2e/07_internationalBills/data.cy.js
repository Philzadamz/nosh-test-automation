// ============================================================
// TEST SUITE: International Bills — Data Purchase
// ============================================================
// Flow:
//   1. Navigate to International Bills via Dashboard Quick Access card
//   2. Click Data → verify Purchase Data modal opens
//   3. Select country from fixture
//   4. Select network provider from fixture (loads after country)
//   5. Select a random data plan from the dropdown
//   6. Enter phone number from fixture
//   7. Select wallet from fixture
//   8. Click Proceed
//   9. Enter withdrawal PIN on confirmation screen
//  10. Click confirmation checkbox (hidden — force: true)
//  11. Click Purchase Data
//
// Note: Amount is auto-filled by the selected data plan and
// must not be typed into manually.
// ============================================================

import InternationalBillsPage from "../../pages/InternationalBillsPage";

const internationalBillsPage = new InternationalBillsPage();

describe("International Bills - Data Purchase", () => {
  beforeEach(() => {
    cy.loginWithFixture();
    internationalBillsPage.navigateFromDashboard();
  });

  afterEach(() => {
    cy.wait(2000);
  });

  // ── TEST 1 ──────────────────────────────────────────────
  it("should open the Purchase Data modal when Data card is clicked", () => {
    internationalBillsPage.clickData();

    cy.wait(1000);
    internationalBillsPage.dataModalHeading.should("be.visible");
    internationalBillsPage.countryDropdown.should("be.visible");
    internationalBillsPage.networkProviderDropdown.should("be.visible");
  });

  // ── TEST 2 ──────────────────────────────────────────────
  it("should complete Data purchase — country, provider, random plan, phone and wallet from fixture", () => {
    cy.fixture("testData").then((data) => {
      internationalBillsPage.clickData();

      cy.wait(1000);
      internationalBillsPage.dataModalHeading.should("be.visible");

      // Select country
      internationalBillsPage.selectCountry(data.internationalBills.data.country);

      // Wait for network providers to load, then select provider
      cy.wait(2000);
      internationalBillsPage.selectNetworkProvider(data.internationalBills.data.provider);

      // Wait for data plans to load, then pick a random plan
      cy.wait(2000);
      internationalBillsPage.selectDataPlan();

      // Enter phone number
      internationalBillsPage.enterPhoneNumber(data.internationalBills.phoneNumber);

      // Select wallet
      internationalBillsPage.selectWallet(data.internationalBills.data.wallet);

      // Move to confirmation screen
      internationalBillsPage.clickProceed();

      // Enter withdrawal PIN on confirmation screen
      cy.wait(1000);
      internationalBillsPage.enterPin(data.internationalBills.pin);

      // Click confirmation checkbox (hidden — force required)
      internationalBillsPage.clickConfirmationCheckbox();

      // Submit final purchase
      internationalBillsPage.clickDataFinalPurchase();
    });
  });
});
