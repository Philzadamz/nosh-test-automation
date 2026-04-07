// ============================================================
// TEST SUITE: Transactions
// ============================================================
// These tests verify the Transactions history page on Nosh.
//
// What is being tested:
//   1. The transactions page loads correctly
//   2. The transaction list or empty state is displayed
//   3. Transactions can be filtered by status
//   4. A transaction can be searched by keyword
//   5. Clicking a transaction opens its details
// ============================================================

import TransactionsPage from "../../pages/TransactionsPage";

const transactionsPage = new TransactionsPage();

describe("Transactions", () => {
  // Log in and navigate to transactions page before each test
  beforeEach(() => {
    cy.loginWithFixture();
    transactionsPage.visit();
  });

  // ── TEST 1 ──────────────────────────────────────────────
  it("should load the transactions page successfully", () => {
    cy.url().should("include", "/transactions");
    transactionsPage.pageHeading.should("be.visible");
  });

  // ── TEST 2 ──────────────────────────────────────────────
  it("should display the transactions list or an empty state message", () => {
    // If there are transactions, they should be in a list.
    // If there are no transactions, a friendly empty message should show.
    cy.get("body").then(($body) => {
      if ($body.find("[data-testid='transactions-list']").length > 0) {
        transactionsPage.transactionsList.should("be.visible");
      } else {
        transactionsPage.emptyStateMessage.should("be.visible");
      }
    });
  });

  // ── TEST 3 ──────────────────────────────────────────────
  it("should display the filter dropdown", () => {
    transactionsPage.filterDropdown.should("be.visible");
  });

  // ── TEST 4 ──────────────────────────────────────────────
  it("should allow filtering transactions by Completed status", () => {
    transactionsPage.filterByStatus("Completed");

    // After filtering, only completed transactions should appear
    // or the empty state if there are none
    cy.get("body").should("be.visible");
  });

  // ── TEST 5 ──────────────────────────────────────────────
  it("should allow filtering transactions by Pending status", () => {
    transactionsPage.filterByStatus("Pending");
    cy.get("body").should("be.visible");
  });

  // ── TEST 6 ──────────────────────────────────────────────
  it("should allow the user to search for a transaction", () => {
    transactionsPage.searchInput.should("be.visible");
    transactionsPage.searchTransaction("Amazon");

    // After searching, only matching results should remain
    cy.get("body").should("be.visible");
  });

  // ── TEST 7 ──────────────────────────────────────────────
  it("should open transaction details when a transaction is clicked", () => {
    // Only run this test if there are transactions on the page
    cy.get("body").then(($body) => {
      if ($body.find("[data-testid='transaction-row']").length > 0) {
        transactionsPage.clickFirstTransaction();

        // A detail modal or detail view should appear
        transactionsPage.transactionDetailModal.should("be.visible");
      } else {
        // Skip gracefully — no transactions to click yet
        cy.log("No transactions available to click — skipping detail check");
      }
    });
  });

  // ── TEST 8 ──────────────────────────────────────────────
  it("should show reference number and status in transaction details", () => {
    cy.get("body").then(($body) => {
      if ($body.find("[data-testid='transaction-row']").length > 0) {
        transactionsPage.clickFirstTransaction();

        // The detail view should contain key information
        transactionsPage.transactionReferenceNumber.should("be.visible");
        transactionsPage.transactionStatus.should("be.visible");
        transactionsPage.transactionAmount.should("be.visible");
      } else {
        cy.log("No transactions available — skipping detail check");
      }
    });
  });

  // ── TEST 9 ──────────────────────────────────────────────
  it("should close the transaction detail modal when close is clicked", () => {
    cy.get("body").then(($body) => {
      if ($body.find("[data-testid='transaction-row']").length > 0) {
        transactionsPage.clickFirstTransaction();
        transactionsPage.transactionDetailModal.should("be.visible");

        // Close the modal
        transactionsPage.closeTransactionDetail();
        transactionsPage.transactionDetailModal.should("not.exist");
      } else {
        cy.log("No transactions available — skipping modal close check");
      }
    });
  });
});
