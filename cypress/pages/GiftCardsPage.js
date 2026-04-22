// ============================================================
// PAGE OBJECT: Gift Cards Page
// URL: /giftcards
// ============================================================
// This page shows three options: Buy Gift Cards, Sell Gift Cards,
// and Nosh Gift Codes. Each card routes to its own sub-page.
// ============================================================

class GiftCardsPage {
  // ── SELECTORS ──────────────────────────────────────────────

  get pageHeading() {
    return cy.contains("h1, h2, h3", "Gift Cards");
  }

  get sidebarGiftCardsLink() {
    return cy.contains("a", "Gift Cards");
  }

  get buyGiftCardsCard() {
    return cy.contains("Buy Gift Cards");
  }

  get sellGiftCardsCard() {
    return cy.contains("Sell Gift Cards");
  }

  get noshGiftCodesCard() {
    return cy.contains("Nosh Gift Codes");
  }

  // ── ACTIONS ────────────────────────────────────────────────

  /**
   * Navigate to the gift cards page via the sidebar link
   */
  navigateFromSidebar() {
    this.sidebarGiftCardsLink.click();
  }

  /**
   * Click the Buy Gift Cards card
   */
  clickBuyGiftCards() {
    this.buyGiftCardsCard.click();
  }

  /**
   * Click the Sell Gift Cards card
   */
  clickSellGiftCards() {
    this.sellGiftCardsCard.click();
  }

  /**
   * Click the Nosh Gift Codes card
   */
  clickNoshGiftCodes() {
    this.noshGiftCodesCard.click();
  }
}

export default GiftCardsPage;
