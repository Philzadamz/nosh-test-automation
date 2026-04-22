// ============================================================
// TEST SUITE: Nosh Gift Codes — Buy Flow
// ============================================================
// These tests verify the Buy Nosh Gift Codes 3-step wizard.
//
// Flow:
//   Landing  — Nosh Gift Codes page with 3 sub-cards
//   Step 1   — Enter amount and quantity
//   Step 2   — Purchase Summary
//   Step 3   — Terms of Purchase → Complete Order → PIN
// ============================================================

import NoshGiftCodesPage from "../../pages/NoshGiftCodesPage";

const noshGiftCodesPage = new NoshGiftCodesPage();

describe("Nosh Gift Codes — Buy Flow", () => {
  let testData;

  before(() => {
    cy.fixture("testData").then((data) => {
      testData = data;
    });
  });

  // Log in and navigate to the Nosh Gift Codes page before each test
  beforeEach(() => {
    cy.loginWithFixture();
    noshGiftCodesPage.visit();
  });

  // Wait 2000ms after each test before moving to the next
  afterEach(() => {
    cy.wait(2000);
  });

  // ── TEST 1 ──────────────────────────────────────────────
  it("should display the Nosh Gift Codes landing page with all 3 sub-cards", () => {
    cy.url().should("include", "/nosh-giftcode");
    noshGiftCodesPage.pageHeading.should("be.visible");
    noshGiftCodesPage.buyNoshGiftCodesCard.should("be.visible");
    noshGiftCodesPage.redeemGiftCodeCard.should("be.visible");
    noshGiftCodesPage.giftCodeHistoryCard.should("be.visible");
  });

  // ── TEST 2 ──────────────────────────────────────────────
  it("should navigate to the Buy Nosh Gift Codes wizard when the card is clicked", () => {
    noshGiftCodesPage.clickBuyNoshGiftCodes();
    noshGiftCodesPage.wizardHeading.should("be.visible");
    cy.contains("How much do you need?").should("be.visible");
  });

  // ── TEST 3 ──────────────────────────────────────────────
  it("should display Step 1 — amount input, quantity controls and amount to pay", () => {
    noshGiftCodesPage.clickBuyNoshGiftCodes();
    noshGiftCodesPage.amountInput.should("be.visible");
    noshGiftCodesPage.quantityIncrement.should("be.visible");
    noshGiftCodesPage.amountToPay.should("be.visible");
  });

  // ── TEST 4 ──────────────────────────────────────────────
  it("should advance to Step 2 — Purchase Summary after entering amount and clicking Proceed", () => {
    // Random amount between 5000 and 10000
    const amount = Math.floor(Math.random() * 5001) + 5000;

    noshGiftCodesPage.clickBuyNoshGiftCodes();
    noshGiftCodesPage.enterAmount(amount);
    noshGiftCodesPage.clickProceed();
    noshGiftCodesPage.purchaseSummary.should("be.visible");
    noshGiftCodesPage.giftCardCategory.should("be.visible");
    noshGiftCodesPage.amountToPay.should("be.visible");
  });

  // ── TEST 5 ──────────────────────────────────────────────
  it("should advance to Step 3 — Terms of Purchase after reviewing purchase summary", () => {
    const amount = Math.floor(Math.random() * 5001) + 5000;

    noshGiftCodesPage.clickBuyNoshGiftCodes();
    noshGiftCodesPage.enterAmount(amount);
    noshGiftCodesPage.clickProceed();
    noshGiftCodesPage.clickProceed();
    noshGiftCodesPage.termsOfPurchase.should("be.visible");
    noshGiftCodesPage.iUnderstandCheckbox.should("be.visible");
    noshGiftCodesPage.completeOrderButton.should("be.visible");
  });

  // ── TEST 6 ──────────────────────────────────────────────
  it("should complete the order by checking I understand, entering PIN and confirming", () => {
    const amount = Math.floor(Math.random() * 5001) + 5000;

    noshGiftCodesPage.clickBuyNoshGiftCodes();
    noshGiftCodesPage.enterAmount(amount);
    noshGiftCodesPage.clickProceed();
    noshGiftCodesPage.clickProceed();
    noshGiftCodesPage.iUnderstandCheckbox.click();
    noshGiftCodesPage.completeOrderButton.click();
    noshGiftCodesPage.enterPin(testData.buyGiftCard.pin);
    noshGiftCodesPage.clickConfirmPin();
  });
});
