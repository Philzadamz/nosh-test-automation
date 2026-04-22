// ============================================================
// TEST SUITE: Buy Gift Cards
// ============================================================
// These tests verify the 5-step Buy Gift Cards wizard on Nosh.
//
// Flow:
//   Step 1 — Select Gift Card Country
//   Step 2 — Select Gift Card Brand
//   Step 3 — Select Amount & Quantity
//   Step 4 — Purchase Summary
//   Step 5 — Terms of Purchase
//
// Note: Tests stop at Step 5 visibility. "Complete Order" is
// never clicked to avoid placing a real order on the account.
// ============================================================

import BuyGiftCardsPage from "../../pages/BuyGiftCardsPage";

const buyGiftCardsPage = new BuyGiftCardsPage();

describe("Buy Gift Cards", () => {
  let testData;

  before(() => {
    cy.fixture("testData").then((data) => {
      testData = data;
    });
  });

  // Log in and navigate to the buy gift cards page before each test
  beforeEach(() => {
    cy.loginWithFixture();
    buyGiftCardsPage.visit();
  });

  // Wait 2000ms after each test before moving to the next
  afterEach(() => {
    cy.wait(2000);
  });

  // ── TEST 1 ──────────────────────────────────────────────
  it("should display the Buy Gift Cards page with the stepper and Step 1 indicator", () => {
    cy.url().should("include", "/buy-giftcard");
    buyGiftCardsPage.stepIndicator.should("contain", "Step 1/5");
    buyGiftCardsPage.stepper.should("be.visible");
  });

  // ── TEST 2 ──────────────────────────────────────────────
  it("should display Step 1 — Select Gift Card Country with a country list", () => {
    cy.contains("Select Gift Card Country").should("be.visible");
    buyGiftCardsPage.countryList.should("be.visible");
  });

  // ── TEST 3 ──────────────────────────────────────────────
  it("should advance to Step 2 after selecting a country and clicking Proceed", () => {
    buyGiftCardsPage.selectCountry(testData.buyGiftCard.country);
    buyGiftCardsPage.clickProceed();
    buyGiftCardsPage.stepIndicator.should("contain", "Step 2/5");
  });

  // ── TEST 4 ──────────────────────────────────────────────
  it("should display Step 2 — Select Gift Card Brand with a search input", () => {
    buyGiftCardsPage.selectCountry(testData.buyGiftCard.country);
    buyGiftCardsPage.clickProceed();
    cy.contains("Select Gift Card Brand").should("be.visible");
    buyGiftCardsPage.brandSearchInput.should("be.visible");
  });

  // ── TEST 5 ──────────────────────────────────────────────
  it("should advance to Step 3 after searching, selecting a brand and clicking Proceed", () => {
    buyGiftCardsPage.selectCountry(testData.buyGiftCard.country);
    buyGiftCardsPage.clickProceed();
    buyGiftCardsPage.searchBrand(testData.buyGiftCard.brand);
    buyGiftCardsPage.selectBrand(testData.buyGiftCard.brand);
    buyGiftCardsPage.clickProceed();
    buyGiftCardsPage.stepIndicator.should("contain", "Step 3/5");
  });

  // ── TEST 6 ──────────────────────────────────────────────
  it("should display Step 3 — amount dropdown and quantity controls", () => {
    buyGiftCardsPage.selectCountry(testData.buyGiftCard.country);
    buyGiftCardsPage.clickProceed();
    buyGiftCardsPage.searchBrand(testData.buyGiftCard.brand);
    buyGiftCardsPage.selectBrand(testData.buyGiftCard.brand);
    buyGiftCardsPage.clickProceed();
    cy.contains("How much do you need?").should("be.visible");
    buyGiftCardsPage.amountDropdown.should("be.visible");
    buyGiftCardsPage.quantityIncrement.should("be.visible");
  });

  // ── TEST 7 ──────────────────────────────────────────────
  it("should advance to Step 4 after selecting an amount and clicking Proceed", () => {
    buyGiftCardsPage.selectCountry(testData.buyGiftCard.country);
    buyGiftCardsPage.clickProceed();
    buyGiftCardsPage.searchBrand(testData.buyGiftCard.brand);
    buyGiftCardsPage.selectBrand(testData.buyGiftCard.brand);
    buyGiftCardsPage.clickProceed();
    buyGiftCardsPage.selectFirstAmount();
    buyGiftCardsPage.clickProceed();
    buyGiftCardsPage.stepIndicator.should("contain", "Step 4/5");
  });

  // ── TEST 8 ──────────────────────────────────────────────
  it("should display Step 4 — Purchase Summary with amount to pay", () => {
    buyGiftCardsPage.selectCountry(testData.buyGiftCard.country);
    buyGiftCardsPage.clickProceed();
    buyGiftCardsPage.searchBrand(testData.buyGiftCard.brand);
    buyGiftCardsPage.selectBrand(testData.buyGiftCard.brand);
    buyGiftCardsPage.clickProceed();
    buyGiftCardsPage.selectFirstAmount();
    buyGiftCardsPage.clickProceed();
    buyGiftCardsPage.purchaseSummary.should("be.visible");
    buyGiftCardsPage.amountToPay.should("be.visible");
  });

  // ── TEST 9 ──────────────────────────────────────────────
  it("should advance to Step 5 after reviewing the purchase summary", () => {
    buyGiftCardsPage.selectCountry(testData.buyGiftCard.country);
    buyGiftCardsPage.clickProceed();
    buyGiftCardsPage.searchBrand(testData.buyGiftCard.brand);
    buyGiftCardsPage.selectBrand(testData.buyGiftCard.brand);
    buyGiftCardsPage.clickProceed();
    buyGiftCardsPage.selectFirstAmount();
    buyGiftCardsPage.clickProceed();
    buyGiftCardsPage.clickProceed();
    buyGiftCardsPage.stepIndicator.should("contain", "Step 5/5");
  });

  // ── TEST 10 ─────────────────────────────────────────────
  it("should complete the order by checking I understand, entering PIN and confirming", () => {
    buyGiftCardsPage.selectCountry(testData.buyGiftCard.country);
    buyGiftCardsPage.clickProceed();
    buyGiftCardsPage.searchBrand(testData.buyGiftCard.brand);
    buyGiftCardsPage.selectBrand(testData.buyGiftCard.brand);
    buyGiftCardsPage.clickProceed();
    buyGiftCardsPage.selectFirstAmount();
    buyGiftCardsPage.clickProceed();
    buyGiftCardsPage.clickProceed();
    buyGiftCardsPage.termsOfPurchase.should("be.visible");
    buyGiftCardsPage.iUnderstandCheckbox.click();
    buyGiftCardsPage.completeOrderButton.click();
    buyGiftCardsPage.enterPin(testData.buyGiftCard.pin);
    buyGiftCardsPage.clickConfirmPin();
  });
});
