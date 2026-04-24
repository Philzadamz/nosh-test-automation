// ============================================================
// TEST SUITE: Local Bills — Wifi | Internet Purchase
// ============================================================
// Flow:
//   1. Navigate to Local Bills via Dashboard Quick Access
//   2. Click Wifi | Internet → verify modal opens
//   3. Select wifi provider from fixture
//   4. Select first available wifi plan (plans load dynamically)
//   5. Enter device number from fixture
//   6. Enter phone number from fixture
//   7. Enter withdrawal PIN from fixture
//   8. Click Purchase
//
// Note: The Amount field is disabled — it auto-fills from the
// selected wifi plan and must not be typed into manually.
// ============================================================

import LocalBillsPage from "../../pages/LocalBillsPage";

const localBillsPage = new LocalBillsPage();

describe("Local Bills - Wifi | Internet Purchase", () => {
  beforeEach(() => {
    cy.loginWithFixture();
    localBillsPage.navigateFromDashboard();
  });

  afterEach(() => {
    cy.wait(2000);
  });

  // ── TEST 1 ──────────────────────────────────────────────
  it("should open the Purchase Wifi | Internet modal when Wifi | Internet card is clicked", () => {
    localBillsPage.clickWifi();

    localBillsPage.wifiModalHeading.should("be.visible");
    localBillsPage.networkProviderDropdown.should("be.visible");
    localBillsPage.wifiPlanDropdown.should("be.visible");
    localBillsPage.deviceNumberInput.should("be.visible");
    localBillsPage.phoneInput.should("be.visible");
    localBillsPage.pinInput.should("be.visible");
  });

  // ── TEST 2 ──────────────────────────────────────────────
  it("should complete Wifi | Internet purchase — provider, first available plan, device number, phone and PIN from fixture", () => {
    cy.fixture("testData").then((data) => {
      localBillsPage.clickWifi();
      localBillsPage.wifiModalHeading.should("be.visible");

      // Select wifi provider
      localBillsPage.selectNetworkProvider(data.localBills.wifi.provider);

      // Wait for plans to load, then pick the first available plan
      cy.wait(2000);
      localBillsPage.selectWifiPlan();

      // Enter device number
      localBillsPage.enterDeviceNumber(data.localBills.wifi.deviceNumber);

      // Enter phone number
      localBillsPage.enterPhoneNumber(data.localBills.phoneNumber);

      // Enter withdrawal PIN
      localBillsPage.enterPin(data.localBills.pin);

      // Submit
      localBillsPage.clickPurchase();
    });
  });
});
