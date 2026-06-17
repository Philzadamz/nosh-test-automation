// ============================================================
// TEST SUITE: International Bills — Electricity Purchase
// ============================================================
// Flow:
//   1. Navigate to International Bills via Dashboard Quick Access card
//   2. Click Electricity → verify Purchase Electricity modal opens
//   3. Select country from fixture
//   4. Select biller from fixture (loads after country)
//   5. Meter type is auto-populated — no interaction needed
//   6. Enter meter number from fixture
//   7. Enter amount from fixture
//   8. Select wallet from fixture
//   9. Click Proceed
//  10. Enter withdrawal PIN on confirmation screen
//  11. Click confirmation checkbox (hidden — force: true)
//  12. Click Purchase Electricity
// ============================================================

import InternationalBillsPage from "../../pages/InternationalBillsPage";

const internationalBillsPage = new InternationalBillsPage();

describe("International Bills - Electricity Purchase", () => {
  beforeEach(() => {
    cy.loginWithFixture();
    internationalBillsPage.navigateFromDashboard();
  });

  afterEach(() => {
    cy.wait(2000);
  });

  // ── TEST 1 ──────────────────────────────────────────────
  it("should open the Purchase Electricity modal when Electricity card is clicked", () => {
    internationalBillsPage.clickElectricity();

    cy.wait(1000);
    internationalBillsPage.electricityModalHeading.should("be.visible");
    internationalBillsPage.countryDropdown.should("be.visible");
    internationalBillsPage.networkProviderDropdown.should("be.visible");
    internationalBillsPage.meterNumberInput.should("be.visible");
  });

  // ── TEST 2 ──────────────────────────────────────────────
  it("should complete Electricity purchase — country, biller, meter number, amount and wallet from fixture", () => {
    cy.fixture("testData").then((data) => {
      internationalBillsPage.clickElectricity();

      cy.wait(1000);
      internationalBillsPage.electricityModalHeading.should("be.visible");

      // Select country
      internationalBillsPage.selectCountry(data.internationalBills.electricity.country);

      // Wait for billers to load, then select biller
      cy.wait(2000);
      internationalBillsPage.selectNetworkProvider(data.internationalBills.electricity.biller);

      // Meter type is auto-populated — no interaction needed

      // Enter meter number
      cy.wait(1000);
      internationalBillsPage.enterMeterNumber(data.internationalBills.electricity.meterNumber);

      // Enter amount
      internationalBillsPage.enterElectricityAmount(data.internationalBills.electricity.amount);

      // Select wallet
      internationalBillsPage.selectWallet(data.internationalBills.electricity.wallet);

      // Move to confirmation screen
      internationalBillsPage.clickProceed();

      // Enter withdrawal PIN on confirmation screen
      cy.wait(1000);
      internationalBillsPage.enterPin(data.internationalBills.pin);

      // Click confirmation checkbox (hidden — force required)
      internationalBillsPage.clickConfirmationCheckbox();

      // Submit final purchase
      internationalBillsPage.clickElectricityFinalPurchase();
    });
  });
});
