// ============================================================
// TEST SUITE: Sell Gift Cards
// ============================================================
// These tests verify the 3-step Sell Gift Cards wizard on Nosh.
//
// Flow:
//   Step 1 — Select Gift Card Category (brand, subcategory, amount)
//   Step 2 — Upload Images (comment entered instead of image)
//   Step 3 — Review Transaction Details → click Proceed
// ============================================================

import SellGiftCardsPage from "../../pages/SellGiftCardsPage";

const sellGiftCardsPage = new SellGiftCardsPage();

describe("Sell Gift Cards", () => {
  let testData;

  before(() => {
    cy.fixture("testData").then((data) => {
      testData = data;
    });
  });

  // Log in and navigate to sell gift cards page before each test
  beforeEach(() => {
    cy.loginWithFixture();
    sellGiftCardsPage.visit();
  });

  // Wait 2000ms after each test before moving to the next
  afterEach(() => {
    cy.wait(2000);
  });

  // ── TEST 1 ──────────────────────────────────────────────
  it("should display the Sell Gift Cards page with Step 1/3 indicator", () => {
    cy.url().should("include", "/sell-giftcard");
    sellGiftCardsPage.stepIndicator.should("contain", "Step 1/3");
  });

  // ── TEST 2 ──────────────────────────────────────────────
  it("should display Step 1 — Select Gift Card Category with search input", () => {
    cy.contains("Select Gift Card Category").should("be.visible");
    sellGiftCardsPage.categorySearchInput.should("be.visible");
  });

  // ── TEST 3 ──────────────────────────────────────────────
  it("should advance to Step 2 after selecting brand, subcategory, amount and clicking Proceed", () => {
    // Generate a random amount between 300 and 500
    const amount = Math.floor(Math.random() * 201) + 300;

    sellGiftCardsPage.selectCategory(testData.sellGiftCard.brand);
    sellGiftCardsPage.selectSubcategory(testData.sellGiftCard.subcategory);
    sellGiftCardsPage.rateDisplay.should("be.visible");
    sellGiftCardsPage.enterAmount(amount);
    sellGiftCardsPage.clickProceed();
    sellGiftCardsPage.stepIndicator.should("contain", "Step 2/3");
  });

  // ── TEST 4 ──────────────────────────────────────────────
  it("should display Step 2 — Upload Images with upload area and comment box", () => {
    const amount = Math.floor(Math.random() * 201) + 300;

    sellGiftCardsPage.selectCategory(testData.sellGiftCard.brand);
    sellGiftCardsPage.selectSubcategory(testData.sellGiftCard.subcategory);
    sellGiftCardsPage.enterAmount(amount);
    sellGiftCardsPage.clickProceed();
    cy.contains("Upload Images").should("be.visible");
    sellGiftCardsPage.uploadArea.should("be.visible");
    sellGiftCardsPage.commentBox.should("be.visible");
  });

  // ── TEST 5 ──────────────────────────────────────────────
  it("should advance to Step 3 after entering a comment and clicking Proceed", () => {
    const amount = Math.floor(Math.random() * 201) + 300;

    sellGiftCardsPage.selectCategory(testData.sellGiftCard.brand);
    sellGiftCardsPage.selectSubcategory(testData.sellGiftCard.subcategory);
    sellGiftCardsPage.enterAmount(amount);
    sellGiftCardsPage.clickProceed();
    sellGiftCardsPage.enterComment(testData.sellGiftCard.comment);
    sellGiftCardsPage.clickProceed();
    sellGiftCardsPage.stepIndicator.should("contain", "Step 3/3");
  });

  // ── TEST 6 ──────────────────────────────────────────────
  it("should display Step 3 — Review Transaction Details and proceed", () => {
    const amount = Math.floor(Math.random() * 201) + 300;

    sellGiftCardsPage.selectCategory(testData.sellGiftCard.brand);
    sellGiftCardsPage.selectSubcategory(testData.sellGiftCard.subcategory);
    sellGiftCardsPage.enterAmount(amount);
    sellGiftCardsPage.clickProceed();
    sellGiftCardsPage.enterComment(testData.sellGiftCard.comment);
    sellGiftCardsPage.clickProceed();
    sellGiftCardsPage.reviewHeading.should("be.visible");
    sellGiftCardsPage.totalAmount.should("be.visible");
    sellGiftCardsPage.nairaEquivalent.should("be.visible");
    sellGiftCardsPage.addedComment.should("be.visible");
    sellGiftCardsPage.clickProceed();
  });

  // ── TEST 7 ──────────────────────────────────────────────
  it("should show the Important Notice modal and submit the trade", () => {
    const amount = Math.floor(Math.random() * 201) + 300;

    sellGiftCardsPage.selectCategory(testData.sellGiftCard.brand);
    sellGiftCardsPage.selectSubcategory(testData.sellGiftCard.subcategory);
    sellGiftCardsPage.enterAmount(amount);
    sellGiftCardsPage.clickProceed();
    sellGiftCardsPage.enterComment(testData.sellGiftCard.comment);
    sellGiftCardsPage.clickProceed();
    sellGiftCardsPage.clickProceed();
    sellGiftCardsPage.importantNoticeModal.should("be.visible");
    sellGiftCardsPage.submitTradeButton.click();
  });
});
