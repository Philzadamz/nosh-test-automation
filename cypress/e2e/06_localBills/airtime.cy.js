// ============================================================
// TEST SUITE: Local Bills — Airtime Purchase
// ============================================================
// Flow:
//   1. Navigate to Local Bills via Dashboard Quick Access
//   2. Validate all 6 bill type cards are visible
//   3. Click Airtime → verify Purchase Airtime modal opens
//   4. Select MTN as network provider
//   5. Enter a random amount (100–5000)
//   6. Clear and enter phone number from fixture
//   7. Enter withdrawal PIN from fixture
//   8. Click Purchase
// ============================================================

import LocalBillsPage from "../../pages/LocalBillsPage";

const localBillsPage = new LocalBillsPage();

describe("Local Bills - Airtime Purchase", () => {
  beforeEach(() => {
    cy.loginWithFixture();
    localBillsPage.navigateFromDashboard();
  });

  afterEach(() => {
    cy.wait(2000);
  });

  // ── TEST 1 ──────────────────────────────────────────────
  it("should navigate to the Local Bills page from the dashboard", () => {
    cy.url().should("include", "/local-bills");
  });

  // ── TEST 2 ──────────────────────────────────────────────
  it("should display all 6 bill type cards", () => {
    localBillsPage.airtimeCard.should("be.visible");
    localBillsPage.dataCard.should("be.visible");
    localBillsPage.electricityCard.should("be.visible");
    localBillsPage.wifiInternetCard.should("be.visible");
    localBillsPage.cableTvBillsCard.should("be.visible");
    localBillsPage.bettingCard.should("be.visible");
  });

  // ── TEST 3 ──────────────────────────────────────────────
  it("should open the Purchase Airtime modal when Airtime card is clicked", () => {
    localBillsPage.clickAirtime();
    localBillsPage.airtimeModalHeading.should("be.visible");
    localBillsPage.networkProviderDropdown.should("be.visible");
    localBillsPage.amountInput.should("be.visible");
    localBillsPage.pinInput.should("be.visible");
  });

  // ── TEST 4 ──────────────────────────────────────────────
  it("should complete Airtime purchase — MTN, random amount, phone and PIN from fixture", () => {
    const amount = Math.floor(Math.random() * 4901) + 100; // 100–5000

    cy.fixture("testData").then((data) => {
      localBillsPage.clickAirtime();
      localBillsPage.airtimeModalHeading.should("be.visible");

      // Select network provider
      localBillsPage.selectNetworkProvider("MTN");

      // Enter random amount
      localBillsPage.enterAmount(amount);

      // Clear pre-filled number and enter fixture phone number
      localBillsPage.enterPhoneNumber(data.localBills.phoneNumber);

      // Enter withdrawal PIN
      localBillsPage.enterPin(data.localBills.pin);

      // Submit
      localBillsPage.clickPurchase();
    });
  });
});
