// ============================================================
// TEST SUITE: Gift Code History + Redeem Gift Code
// ============================================================
// Flow:
//   1. Navigate to Nosh Gift Codes landing page
//   2. Click Gift Code History card
//   3. Click the first record to open Gift Code Details modal
//   4. Click "Copy Codes" — captures the code via clipboard stub
//   5. Close the modal
//   6. Navigate back to Nosh Gift Codes landing
//   7. Click Redeem Gift Code card
//   8. Enter the copied code and click Redeem
//   9. Confirm redemption by clicking YES
// ============================================================

import GiftCodeHistoryPage from "../../pages/GiftCodeHistoryPage";

const giftCodeHistoryPage = new GiftCodeHistoryPage();

describe("Gift Code History + Redeem Gift Code", () => {
  beforeEach(() => {
    cy.loginWithFixture();
    giftCodeHistoryPage.visitNoshGiftCodes();
  });

  afterEach(() => {
    cy.wait(2000);
  });

  // ── TEST 1 ──────────────────────────────────────────────
  it("should display the Gift Code History table after clicking the history card", () => {
    giftCodeHistoryPage.clickGiftCodeHistory();
    cy.url().should("include", "/nosh-giftcode");
    giftCodeHistoryPage.historyTableRows.should("have.length.greaterThan", 0);
  });

  // ── TEST 2 ──────────────────────────────────────────────
  it("should open a Gift Code Details modal when the first history row is clicked", () => {
    giftCodeHistoryPage.clickGiftCodeHistory();
    giftCodeHistoryPage.historyTableRows.first().click({ force: true });
    cy.wait(1000);
    giftCodeHistoryPage.modalHeading.should("be.visible");
    giftCodeHistoryPage.copyCodesButton.should("be.visible");
  });

  // ── TEST 3 ──────────────────────────────────────────────
  it("should copy the gift code from the first history record", () => {
    giftCodeHistoryPage.clickGiftCodeHistory();
    giftCodeHistoryPage.copyFirstGiftCode();
    cy.get("@giftCode").should("exist").and("not.be.empty");
  });

  // ── TEST 4 ──────────────────────────────────────────────
  it("should copy first gift code from history and redeem it", () => {
    // Step 1: Open history and copy the first gift code
    giftCodeHistoryPage.clickGiftCodeHistory();
    giftCodeHistoryPage.copyFirstGiftCode();

    // Step 2: Close the modal
    giftCodeHistoryPage.closeModal();

    // Step 3: Go back to Nosh Gift Codes landing and click Redeem Gift Code card
    giftCodeHistoryPage.visitNoshGiftCodes();
    giftCodeHistoryPage.clickRedeemGiftCodeCard();

    // Step 4: Paste the copied code and complete redemption
    cy.get("@giftCode").then((code) => {
      giftCodeHistoryPage.giftCodeInput.should("be.visible");
      giftCodeHistoryPage.enterGiftCode(code);
      giftCodeHistoryPage.clickRedeem();
      giftCodeHistoryPage.confirmYesButton.should("be.visible");
      giftCodeHistoryPage.confirmRedeem();
    });
  });
});
