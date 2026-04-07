// ============================================================
// TEST SUITE: Gift Cards
// ============================================================
// These tests verify the Gift Cards trading flow on Nosh.
//
// What is being tested:
//   1. The gift cards page loads with available categories
//   2. A user can search for a gift card category
//   3. A user can select a gift card category
//   4. The rate/payout is displayed when a card is selected
//   5. The user can enter card details and proceed to trade
// ============================================================

import GiftCardsPage from "../../pages/GiftCardsPage";

const giftCardsPage = new GiftCardsPage();

describe("Gift Cards", () => {
  let testData;

  before(() => {
    cy.fixture("testData").then((data) => {
      testData = data;
    });
  });

  // Log in and navigate to gift cards page before each test
  beforeEach(() => {
    cy.loginWithFixture();
    giftCardsPage.visit();
  });

  // ── TEST 1 ──────────────────────────────────────────────
  it("should load the gift cards page", () => {
    cy.url().should("include", "/giftcards");
    giftCardsPage.pageHeading.should("be.visible");
  });

  // ── TEST 2 ──────────────────────────────────────────────
  it("should display a list of available gift card categories", () => {
    // The gift card category list should be present and have items
    giftCardsPage.giftCardCategoryList.should("be.visible");
  });

  // ── TEST 3 ──────────────────────────────────────────────
  it("should allow a user to search for a gift card category", () => {
    giftCardsPage.searchForGiftCard(testData.giftCard.category);

    // After searching, the matching category should appear
    cy.contains(testData.giftCard.category).should("be.visible");
  });

  // ── TEST 4 ──────────────────────────────────────────────
  it("should allow a user to select a gift card category", () => {
    giftCardsPage.selectGiftCardCategory(testData.giftCard.category);

    // After selecting a category, a subcategory or rate should appear
    cy.url().should("include", testData.giftCard.category.toLowerCase());
  });

  // ── TEST 5 ──────────────────────────────────────────────
  it("should display the exchange rate after selecting a gift card", () => {
    giftCardsPage.selectGiftCardCategory(testData.giftCard.category);
    giftCardsPage.selectSubcategory(testData.giftCard.subcategory);

    // The rate should now be visible on the page
    giftCardsPage.rateDisplay.should("be.visible");
  });

  // ── TEST 6 ──────────────────────────────────────────────
  it("should show the estimated payout when amount is entered", () => {
    giftCardsPage.selectGiftCardCategory(testData.giftCard.category);
    giftCardsPage.selectSubcategory(testData.giftCard.subcategory);
    giftCardsPage.enterCardAmount(testData.giftCard.amount);

    // After entering the amount, the estimated payout should be visible
    giftCardsPage.estimatedPayoutDisplay.should("be.visible");
  });

  // ── TEST 7 ──────────────────────────────────────────────
  it("should allow the user to enter a gift card code", () => {
    giftCardsPage.selectGiftCardCategory(testData.giftCard.category);
    giftCardsPage.selectSubcategory(testData.giftCard.subcategory);
    giftCardsPage.enterCardAmount(testData.giftCard.amount);
    giftCardsPage.enterCardCode(testData.giftCard.cardCode);

    // Verify the code was entered
    giftCardsPage.cardCodeInput.should("have.value", testData.giftCard.cardCode);
  });

  // ── TEST 8 ──────────────────────────────────────────────
  it("should allow the user to proceed after entering valid gift card details", () => {
    giftCardsPage.selectGiftCardCategory(testData.giftCard.category);
    giftCardsPage.selectSubcategory(testData.giftCard.subcategory);
    giftCardsPage.enterCardAmount(testData.giftCard.amount);
    giftCardsPage.enterCardCode(testData.giftCard.cardCode);
    giftCardsPage.clickProceed();

    // After clicking Proceed, a confirmation step should appear
    giftCardsPage.confirmTradeButton.should("be.visible");
  });
});
