// ============================================================
// TEST SUITE: Local Bills — Data Purchase
// ============================================================
// Flow:
//   1. Navigate to Local Bills via Dashboard Quick Access
//   2. Click Data → verify Purchase Data modal opens
//   3. Select MTN as network provider
//   4. Select the first available data plan (plans load dynamically)
//   5. Enter phone number from fixture
//   6. Enter withdrawal PIN from fixture
//   7. Click Purchase
//
// Note: The Amount field is disabled — it auto-fills from the
// selected data plan and must not be typed into manually.
// ============================================================

import LocalBillsPage from "../../pages/LocalBillsPage";

const localBillsPage = new LocalBillsPage();

describe("Local Bills - Data Purchase", () => {
  beforeEach(() => {
    cy.loginWithFixture();
    localBillsPage.navigateFromDashboard();
  });

  afterEach(() => {
    cy.wait(2000);
  });

  // ── TEST 1 ──────────────────────────────────────────────
  it("should open the Purchase Data modal when Data card is clicked", () => {
    localBillsPage.clickData();

    localBillsPage.dataModalHeading.should("be.visible");
    localBillsPage.networkProviderDropdown.should("be.visible");
    localBillsPage.dataPlanDropdown.should("be.visible");
    localBillsPage.phoneInput.should("be.visible");
    localBillsPage.pinInput.should("be.visible");
  });

  // ── TEST 2 ──────────────────────────────────────────────
  it("should complete Data purchase — MTN, first available plan, phone and PIN from fixture", () => {
    cy.fixture("testData").then((data) => {
      localBillsPage.clickData();
      localBillsPage.dataModalHeading.should("be.visible");

      // Select network provider
      localBillsPage.selectNetworkProvider(data.localBills.data.provider);

      // Wait for data plans to load, then pick the first available plan
      cy.wait(2000);
      localBillsPage.selectDataPlan();

      // Enter phone number from fixture
      localBillsPage.enterPhoneNumber(data.localBills.phoneNumber);

      // Enter withdrawal PIN
      localBillsPage.enterPin(data.localBills.pin);

      // Submit
      localBillsPage.clickPurchase();
    });
  });
});
