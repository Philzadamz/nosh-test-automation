// ============================================================
// PAGE OBJECT: Wallet Page
// URL: /wallet
// ============================================================
// The wallet page shows the user's:
//   - Current balance in local currency
//   - Option to withdraw funds to a bank account
//   - Wallet transaction history
// ============================================================

class WalletPage {
  // ── SELECTORS ──────────────────────────────────────────────

  get pageHeading() {
    return cy.contains("Wallet");
  }

  get availableBalance() {
    // The balance amount shown on the wallet card
    return cy.get("[data-testid='available-balance']");
  }

  get withdrawButton() {
    return cy.contains("button", "Withdraw");
  }

  get withdrawalAmountInput() {
    return cy.get('input[placeholder*="amount"]');
  }

  get bankNameDropdown() {
    // Dropdown to select the bank for withdrawal
    return cy.get("select[name='bankName']");
  }

  get accountNumberInput() {
    return cy.get('input[placeholder*="account number"]');
  }

  get accountNameDisplay() {
    // Auto-populated field showing the account holder name
    return cy.get("[data-testid='account-name']");
  }

  get confirmWithdrawalButton() {
    return cy.contains("button", "Confirm Withdrawal");
  }

  get successMessage() {
    return cy.contains("Withdrawal successful");
  }

  get walletTransactionsList() {
    // List of wallet credit/debit entries
    return cy.get("[data-testid='wallet-transactions']");
  }

  get emptyStateMessage() {
    return cy.contains("No transactions yet");
  }

  // ── ACTIONS ────────────────────────────────────────────────

  /**
   * Navigate to the wallet page
   */
  visit() {
    cy.visit("/wallet");
  }

  /**
   * Click the Withdraw button to open the withdrawal form
   */
  clickWithdraw() {
    this.withdrawButton.click();
  }

  /**
   * Enter an amount to withdraw
   * @param {string} amount - the amount in local currency
   */
  enterWithdrawalAmount(amount) {
    this.withdrawalAmountInput.clear().type(amount);
  }

  /**
   * Select a bank from the dropdown
   * @param {string} bankName - e.g. "Access Bank"
   */
  selectBank(bankName) {
    this.bankNameDropdown.select(bankName);
  }

  /**
   * Enter a bank account number
   * @param {string} accountNumber
   */
  enterAccountNumber(accountNumber) {
    this.accountNumberInput.clear().type(accountNumber);
  }

  /**
   * Click Confirm Withdrawal to finalize the withdrawal
   */
  confirmWithdrawal() {
    this.confirmWithdrawalButton.click();
  }

  /**
   * Get the currently displayed balance text
   * @returns Cypress chainable with the balance element
   */
  getBalance() {
    return this.availableBalance;
  }
}

export default WalletPage;
