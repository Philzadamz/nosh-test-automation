// ============================================================
// TEST SUITE: Local Bills — Betting
// ============================================================
// Flow:
//   1. Navigate to Local Bills via Dashboard Quick Access
//   2. Click Betting → verify Betting modal opens
//   3. Select bet platform from fixture
//   4. Enter customer ID from fixture
//   5. Enter amount from fixture
//   6. Enter withdrawal PIN from fixture
//   7. Click Purchase
//
// Note: The Betting modal has no phone number field and no
// plan dropdown — only platform, customer ID, amount, and PIN.
// ============================================================

import LocalBillsPage from "../../pages/LocalBillsPage";

const localBillsPage = new LocalBillsPage();

describe("Local Bills - Betting", () => {
  beforeEach(() => {
    cy.loginWithFixture();
    localBillsPage.navigateFromDashboard();
  });

  afterEach(() => {
    cy.wait(2000);
  });

  // ── TEST 1 ──────────────────────────────────────────────
  it("should open the Betting modal when Betting card is clicked", () => {
    localBillsPage.clickBetting();

    localBillsPage.bettingModalHeading.should("be.visible");
    localBillsPage.networkProviderDropdown.should("be.visible");
    localBillsPage.customerIdInput.should("be.visible");
    localBillsPage.amountInput.should("be.visible");
    localBillsPage.pinInput.should("be.visible");
  });

  // ── TEST 2 ──────────────────────────────────────────────
  // it("should complete Betting purchase — platform, customer ID, amount and PIN from fixture", () => {
  //   cy.fixture("testData").then((data) => {
  //     localBillsPage.clickBetting();
  //     localBillsPage.bettingModalHeading.should("be.visible");

  //     // Select bet platform
  //     localBillsPage.selectNetworkProvider(data.localBills.betting.platform);

  //     // Enter customer ID
  //     localBillsPage.enterCustomerId(data.localBills.betting.customerId);

  //     // Enter amount
  //     localBillsPage.enterAmount(data.localBills.betting.amount);

  //     // Enter withdrawal PIN
  //     localBillsPage.enterPin(data.localBills.pin);

  //     // Submit
  //     localBillsPage.clickPurchase();
  //   });
  // });
});
