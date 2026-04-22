// ============================================================
// TEST SUITE: Gift Cards
// ============================================================
// These tests verify the Gift Cards page flow on Nosh.
//
// Flow:
//   1. User logs in and lands on the dashboard
//   2. User clicks "Gift Cards" in the sidebar
//   3. User is routed to the gift cards page
//   4. User sees 3 cards: Buy Gift Cards, Sell Gift Cards,
//      and Nosh Gift Codes
//   5. Clicking each card routes to its individual page
// ============================================================

import GiftCardsPage from "../../pages/GiftCardsPage";

const giftCardsPage = new GiftCardsPage();

describe("Gift Cards", () => {
  // Log in and navigate to the gift cards page before each test
  beforeEach(() => {
    cy.loginWithFixture();
    giftCardsPage.navigateFromSidebar();
    cy.wait(1000)
  });

  // Wait 2000ms after each test before moving to the next
  afterEach(() => {
    cy.wait(2000);
  });

  // ── TEST 1 ──────────────────────────────────────────────
  it("should navigate to the gift cards page from the sidebar", () => {
    cy.url().should("include", "/giftcards");
    giftCardsPage.pageHeading.should("be.visible");
  });

  // ── TEST 2 ──────────────────────────────────────────────
  it("should display the Buy Gift Cards, Sell Gift Cards and Nosh Gift Codes cards", () => {
    giftCardsPage.buyGiftCardsCard.should("be.visible");
    giftCardsPage.sellGiftCardsCard.should("be.visible");
    giftCardsPage.noshGiftCodesCard.should("be.visible");
  });

  // ── TEST 3 ──────────────────────────────────────────────
  it("should navigate to the Buy Gift Cards page when the card is clicked", () => {
    giftCardsPage.clickBuyGiftCards();
    cy.url().should("include", "/buy-giftcard");
  });

  // ── TEST 4 ──────────────────────────────────────────────
  it("should navigate to the Sell Gift Cards page when the card is clicked", () => {
    giftCardsPage.clickSellGiftCards();
    cy.url().should("include", "/sell-giftcard");
  });

  // ── TEST 5 ──────────────────────────────────────────────
  it("should navigate to the Nosh Gift Codes page when the card is clicked", () => {
    giftCardsPage.clickNoshGiftCodes();
    cy.url().should("include", "/nosh-giftcode");
  });
});
