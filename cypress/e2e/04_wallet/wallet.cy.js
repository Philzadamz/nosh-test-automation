// ============================================================
// TEST SUITE: Wallet
// ============================================================
// These tests verify the Wallet page on Nosh.
//
// What is being tested:
//   1. The wallet page loads correctly
//   2. The user's available balance is displayed
//   3. The withdrawal form is accessible
//   4. The user can fill in withdrawal details
//   5. Wallet transaction history is displayed
// ============================================================

import WalletPage from "../../pages/WalletPage";

const walletPage = new WalletPage();

describe("Wallet", () => {
  let testData;

  before(() => {
    cy.fixture("testData").then((data) => {
      testData = data;
    });
  });

  // Log in and navigate to wallet before each test
  beforeEach(() => {
    cy.loginWithFixture();
    walletPage.visit();
  });

  // ── TEST 1 ──────────────────────────────────────────────
  it("should load the wallet page successfully", () => {
    cy.url().should("include", "/wallet");
    walletPage.pageHeading.should("be.visible");
  });

  // ── TEST 2 ──────────────────────────────────────────────
  it("should display the user's available balance", () => {
    walletPage.availableBalance.should("be.visible");
  });

  // ── TEST 3 ──────────────────────────────────────────────
  it("should display the Withdraw button", () => {
    walletPage.withdrawButton.should("be.visible");
  });

  // ── TEST 4 ──────────────────────────────────────────────
  it("should open the withdrawal form when the Withdraw button is clicked", () => {
    walletPage.clickWithdraw();

    // The withdrawal amount input should now be visible
    walletPage.withdrawalAmountInput.should("be.visible");
  });

  // ── TEST 5 ──────────────────────────────────────────────
  it("should allow the user to enter a withdrawal amount", () => {
    walletPage.clickWithdraw();
    walletPage.enterWithdrawalAmount(testData.wallet.withdrawalAmount);

    walletPage.withdrawalAmountInput.should(
      "have.value",
      testData.wallet.withdrawalAmount
    );
  });

  // ── TEST 6 ──────────────────────────────────────────────
  it("should allow the user to select a bank from the dropdown", () => {
    walletPage.clickWithdraw();
    walletPage.selectBank(testData.wallet.bankName);

    walletPage.bankNameDropdown.should("contain", testData.wallet.bankName);
  });

  // ── TEST 7 ──────────────────────────────────────────────
  it("should allow the user to enter a bank account number", () => {
    walletPage.clickWithdraw();
    walletPage.selectBank(testData.wallet.bankName);
    walletPage.enterAccountNumber(testData.wallet.accountNumber);

    walletPage.accountNumberInput.should(
      "have.value",
      testData.wallet.accountNumber
    );
  });

  // ── TEST 8 ──────────────────────────────────────────────
  it("should display the wallet transaction history section", () => {
    // Either transactions exist or an empty state message is shown
    cy.get("body").then(($body) => {
      if ($body.find("[data-testid='wallet-transactions']").length > 0) {
        walletPage.walletTransactionsList.should("be.visible");
      } else {
        walletPage.emptyStateMessage.should("be.visible");
      }
    });
  });
});
