// ============================================================
// PAGE OBJECT: Gift Code History + Redeem Gift Code
// ============================================================
// Gift Code History (/nosh-giftcode/history):
//   - Table of purchased gift codes (div.table-item-wrapper rows)
//   - Clicking a row opens a Gift Code Details modal
//   - Modal has a "Copy Codes" button that writes the code to clipboard
//
// Redeem Gift Code (/nosh-giftcode/redeem):
//   - "Enter gift codes" input
//   - Currency dropdown (default NGN — leave unchanged)
//   - Redeem button → confirmation modal (YES / NO)
// ============================================================

class GiftCodeHistoryPage {
  // ── GIFT CODE HISTORY SELECTORS ────────────────────────────

  get giftCodeHistoryCard() {
    return cy.contains("Gift Code History");
  }

  get redeemGiftCodeCard() {
    return cy.contains("Redeem Gift Code");
  }

  get historyTableRows() {
    return cy.get("div.table-item-wrapper");
  }

  // ── GIFT CODE DETAILS MODAL ────────────────────────────────

  get modalHeading() {
    return cy.contains("Gift Code Details");
  }

  get copyCodesButton() {
    return cy.contains("Copy Codes");
  }

  get closeModalButton() {
    // X button sits next to the "Gift Code Details" heading in the modal header
    return cy.contains("Gift Code Details").parent().find("button").first();
  }

  // ── REDEEM PAGE SELECTORS ──────────────────────────────────

  get giftCodeInput() {
    return cy.get('input[name="giftCode"]');
  }

  get redeemButton() {
    return cy.contains("button", "Redeem");
  }

  get confirmYesButton() {
    return cy.contains("button", "YES");
  }

  // ── ACTIONS ────────────────────────────────────────────────

  /**
   * Navigate to the Nosh Gift Codes landing page
   */
  visitNoshGiftCodes() {
    cy.visit("/nosh-giftcode");
    cy.wait(3000);
  }

  /**
   * Click the Gift Code History card on the landing page
   */
  clickGiftCodeHistory() {
    this.giftCodeHistoryCard.click();
    cy.wait(2000);
  }

  /**
   * Click the Redeem Gift Code card on the landing page
   */
  clickRedeemGiftCodeCard() {
    this.redeemGiftCodeCard.click();
    cy.wait(2000);
  }

  /**
   * Close the Gift Code Details modal using the X button
   */
  closeModal() {
    this.closeModalButton.click({ force: true });
    cy.wait(1000);
  }

  /**
   * Click the first row in the history table, then click the Copy Codes button.
   * Stubs clipboard.writeText so the copied value can be retrieved as @giftCode alias.
   */
  copyFirstGiftCode() {
    // Stub clipboard.writeText BEFORE clicking so we capture what is written
    cy.window().then((win) => {
      cy.stub(win.navigator.clipboard, "writeText").as("clipboardWrite").resolves();
    });

    // Open the first history record
    this.historyTableRows.first().click({ force: true });
    cy.wait(1000);

    // Click the Copy Codes button in the modal
    this.copyCodesButton.click({ force: true });

    // Extract the copied value from the stub and store as @giftCode
    cy.get("@clipboardWrite").then((stub) => {
      cy.wrap(stub.args[0][0]).as("giftCode");
    });
  }

  /**
   * Enter a gift code into the redeem input
   * @param {string} code
   */
  enterGiftCode(code) {
    this.giftCodeInput.clear().type(code);
  }

  /**
   * Click the Redeem button
   */
  clickRedeem() {
    this.redeemButton.click();
  }

  /**
   * Confirm redemption by clicking YES on the confirmation modal
   */
  confirmRedeem() {
    this.confirmYesButton.click();
  }
}

export default GiftCodeHistoryPage;
