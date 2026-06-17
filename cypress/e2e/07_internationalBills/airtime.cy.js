// ============================================================
// TEST SUITE: International Bills — Airtime Purchase
// ============================================================
// Flow:
//   1. Navigate to International Bills via Dashboard Quick Access card
//      (scrolls to the card and clicks a[href="/intl-bills"])
//   2. Validate all 6 bill type cards are visible
//   3. Click Airtime → verify Purchase Airtime modal opens
//   4. Select country from fixture
//   5. Select network provider from fixture (loads after country)
//   6. Enter phone number from fixture
//   7. Enter amount from fixture
//   8. Select wallet from fixture
//   9. Click Proceed
// ============================================================

import InternationalBillsPage from "../../pages/InternationalBillsPage";

const internationalBillsPage = new InternationalBillsPage();

describe("International Bills - Airtime Purchase", () => {
  beforeEach(() => {
    cy.loginWithFixture();
    internationalBillsPage.navigateFromDashboard();
  });

  afterEach(() => {
    cy.wait(2000);
  });

  // ── TEST 1 ──────────────────────────────────────────────
  it("should navigate to the International Bills page from the dashboard", () => {
    cy.wait(1000);
    cy.url().should("include", "/intl-bills");
  });

  // ── TEST 2 ──────────────────────────────────────────────
  it("should display all 6 bill type cards", () => {
    cy.wait(1000);
    internationalBillsPage.airtimeCard.should("be.visible");
    internationalBillsPage.dataCard.should("be.visible");
    internationalBillsPage.electricityCard.should("be.visible");
    internationalBillsPage.wifiInternetCard.should("be.visible");
    internationalBillsPage.cableTvBillsCard.should("be.visible");
    internationalBillsPage.waterCard.should("be.visible");
  });

  // ── TEST 3 ──────────────────────────────────────────────
  it("should open the Purchase Airtime modal when Airtime card is clicked", () => {
    internationalBillsPage.clickAirtime();

    cy.wait(1000);
    internationalBillsPage.airtimeModalHeading.should("be.visible");
    internationalBillsPage.countryDropdown.should("be.visible");
    internationalBillsPage.networkProviderDropdown.should("be.visible");
    internationalBillsPage.phoneInput.should("be.visible");
    internationalBillsPage.amountInput.should("be.visible");
  });

  // ── TEST 4 ──────────────────────────────────────────────
  it("should complete Airtime purchase — country, provider, phone, amount and wallet from fixture", () => {
    cy.fixture("testData").then((data) => {
      internationalBillsPage.clickAirtime();

      cy.wait(1000);
      internationalBillsPage.airtimeModalHeading.should("be.visible");

      // Select country
      internationalBillsPage.selectCountry(data.internationalBills.airtime.country);

      // Wait for network providers to load, then select provider
      cy.wait(2000);
      internationalBillsPage.selectNetworkProvider(data.internationalBills.airtime.provider);

      // Enter amount (passed first — selector targets the amount field)
      internationalBillsPage.enterAmount(data.internationalBills.phoneNumber);

      // Enter phone number (passed second — selector targets the phone field)
      internationalBillsPage.enterPhoneNumber(data.internationalBills.airtime.amount);

      // Select wallet
      internationalBillsPage.selectWallet(data.internationalBills.airtime.wallet);

      // Move to confirmation screen
      internationalBillsPage.clickProceed();

      // Enter withdrawal PIN on confirmation screen
      cy.wait(1000);
      internationalBillsPage.enterPin(data.internationalBills.pin);

      // Check confirmation checkbox to enable Purchase button
      internationalBillsPage.clickConfirmationCheckbox();

      // Submit final purchase
      internationalBillsPage.clickFinalPurchase();
    });
  });
});
