// ============================================================
// PAGE OBJECT: Transactions Page
// URL: /transactions
// ============================================================
// Shows the full history of all the user's gift card trades.
// Users can filter by status (pending, completed, etc.)
// and click on individual transactions to see more details.
// ============================================================

class TransactionsPage {
  // ── SELECTORS ──────────────────────────────────────────────

  get pageHeading() {
    return cy.contains("Transactions");
  }

  get transactionsList() {
    // The main list/table of transactions
    return cy.get("[data-testid='transactions-list']");
  }

  get firstTransactionRow() {
    // The most recent transaction in the list
    return cy.get("[data-testid='transaction-row']").first();
  }

  get filterDropdown() {
    // Dropdown to filter by transaction status
    return cy.get("select[name='status']");
  }

  get dateRangePicker() {
    return cy.get("[data-testid='date-range-picker']");
  }

  get searchInput() {
    return cy.get('input[placeholder*="Search transactions"]');
  }

  get statusBadge() {
    // The colored status pill on each transaction (e.g. Completed, Pending)
    return cy.get("[data-testid='status-badge']");
  }

  get emptyStateMessage() {
    return cy.contains("No transactions found");
  }

  // ── Transaction Detail Modal Selectors ────────────────────

  get transactionDetailModal() {
    return cy.get("[data-testid='transaction-detail-modal']");
  }

  get transactionReferenceNumber() {
    return cy.get("[data-testid='reference-number']");
  }

  get transactionAmount() {
    return cy.get("[data-testid='transaction-amount']");
  }

  get transactionStatus() {
    return cy.get("[data-testid='transaction-status']");
  }

  get transactionDate() {
    return cy.get("[data-testid='transaction-date']");
  }

  get closeModalButton() {
    return cy.get("[data-testid='close-modal']");
  }

  // ── ACTIONS ────────────────────────────────────────────────

  /**
   * Navigate to the transactions page
   */
  visit() {
    cy.visit("/transactions");
  }

  /**
   * Filter transactions by a specific status
   * @param {string} status - e.g. "Completed", "Pending", "Failed"
   */
  filterByStatus(status) {
    this.filterDropdown.select(status);
  }

  /**
   * Search for a transaction using a keyword or reference number
   * @param {string} keyword
   */
  searchTransaction(keyword) {
    this.searchInput.clear().type(keyword);
  }

  /**
   * Click on the first transaction in the list to open its details
   */
  clickFirstTransaction() {
    this.firstTransactionRow.click();
  }

  /**
   * Close the transaction detail modal
   */
  closeTransactionDetail() {
    this.closeModalButton.click();
  }
}

export default TransactionsPage;
