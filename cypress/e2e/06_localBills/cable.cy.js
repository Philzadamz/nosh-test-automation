// ============================================================
// TEST SUITE: Local Bills — Cable | Tv Purchase
// ============================================================
// Flow:
//   1. Navigate to Local Bills via Dashboard Quick Access
//   2. Click Cable | TV Bills → verify modal opens
//   3. Select cable provider from fixture
//   4. Select first available cable plan (plans load dynamically)
//   5. Enter device number from fixture
//   6. Enter phone number from fixture
//   7. Enter withdrawal PIN from fixture
//   8. Click Purchase
//
// Note: The Amount field is disabled — it auto-fills from the
// selected cable plan and must not be typed into manually.
// ============================================================

import LocalBillsPage from "../../pages/LocalBillsPage";

const localBillsPage = new LocalBillsPage();

describe("Local Bills - Cable | Tv Purchase", () => {
  beforeEach(() => {
    cy.loginWithFixture();
    localBillsPage.navigateFromDashboard();
  });

  afterEach(() => {
    cy.wait(2000);
  });

  // ── TEST 1 ──────────────────────────────────────────────
  it("should open the Purchase Cable | Tv modal when Cable | TV Bills card is clicked", () => {
    localBillsPage.clickCable();

    localBillsPage.cableModalHeading.should("be.visible");
    localBillsPage.networkProviderDropdown.should("be.visible");
    localBillsPage.cablePlanDropdown.should("be.visible");
    localBillsPage.deviceNumberInput.should("be.visible");
    localBillsPage.phoneInput.should("be.visible");
    localBillsPage.pinInput.should("be.visible");
  });

  // ── TEST 2 ──────────────────────────────────────────────
  it("should complete Cable | Tv purchase — provider, first available plan, device number, phone and PIN from fixture", () => {
    cy.fixture("testData").then((data) => {
      localBillsPage.clickCable();
      localBillsPage.cableModalHeading.should("be.visible");

      // Select cable provider
      localBillsPage.selectNetworkProvider(data.localBills.cable.provider);

      // Wait for plans to load, then pick the first available plan
      cy.wait(2000);
      localBillsPage.selectCablePlan();

      // Enter device number
      localBillsPage.enterDeviceNumber(data.localBills.cable.deviceNumber);

      // Enter phone number
      localBillsPage.enterPhoneNumber(data.localBills.phoneNumber);

      // Enter withdrawal PIN
      localBillsPage.enterPin(data.localBills.pin);

      // Submit
      localBillsPage.clickPurchase();
    });
  });
});
