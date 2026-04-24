// ============================================================
// TEST SUITE: Local Bills — Electricity Purchase
// ============================================================
// Flow:
//   1. Navigate to Local Bills via Dashboard Quick Access
//   2. Click Electricity → verify Purchase Electricity modal opens
//   3. Select electricity provider from fixture
//   4. Select meter type from fixture
//   5. Enter meter number from fixture
//   6. Enter amount from fixture
//   7. Enter phone number from fixture
//   8. Enter withdrawal PIN from fixture
//   9. Click Purchase
// ============================================================

import LocalBillsPage from "../../pages/LocalBillsPage";

const localBillsPage = new LocalBillsPage();

describe("Local Bills - Electricity Purchase", () => {
  beforeEach(() => {
    cy.loginWithFixture();
    localBillsPage.navigateFromDashboard();
  });

  afterEach(() => {
    cy.wait(2000);
  });

  // ── TEST 1 ──────────────────────────────────────────────
  it("should open the Purchase Electricity modal when Electricity card is clicked", () => {
    localBillsPage.clickElectricity();

    localBillsPage.electricityModalHeading.should("be.visible");
    localBillsPage.networkProviderDropdown.should("be.visible");
    localBillsPage.meterTypeDropdown.should("be.visible");
    localBillsPage.meterNumberInput.should("be.visible");
    localBillsPage.electricityAmountInput.should("be.visible");
    localBillsPage.phoneInput.should("be.visible");
    localBillsPage.pinInput.should("be.visible");
  });

  // ── TEST 2 ──────────────────────────────────────────────
  it("should complete Electricity purchase — provider, meter type, meter number, amount, phone and PIN from fixture", () => {
    cy.fixture("testData").then((data) => {
      localBillsPage.clickElectricity();
      localBillsPage.electricityModalHeading.should("be.visible");

      // Select electricity provider
      localBillsPage.selectNetworkProvider(data.localBills.electricity.provider);

      // Select meter type
      localBillsPage.selectMeterType(data.localBills.electricity.meterType);

      // Enter meter number
      localBillsPage.enterMeterNumber(data.localBills.electricity.meterNumber);

      // Enter amount
      localBillsPage.enterElectricityAmount(data.localBills.electricity.amount);

      // Enter phone number
      localBillsPage.enterPhoneNumber(data.localBills.phoneNumber);

      // Enter withdrawal PIN
      localBillsPage.enterPin(data.localBills.pin);

      // Submit
      localBillsPage.clickPurchase();
    });
  });
});
