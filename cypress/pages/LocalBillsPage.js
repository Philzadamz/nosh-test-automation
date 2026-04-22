// ============================================================
// PAGE OBJECT: Local Bills
// ============================================================
// Navigation: Dashboard Quick Access → "Pay Local Bills"
// Local Bills page shows 6 bill type cards:
//   Airtime | Data | Electricity | Wifi | Internet | Cable | TV Bills | Betting
//
// Clicking Airtime opens "Purchase Airtime" modal:
//   - Select network provider (headlessui listbox)
//   - Enter amount input (NGN)
//   - Phone number field (pre-filled — leave as is)
//   - Enter withdrawal pin (single input)
//   - Cancel / Purchase buttons
// ============================================================

class LocalBillsPage {
  // ── DASHBOARD QUICK ACCESS ─────────────────────────────────

  get payLocalBillsQuickAccess() {
    return cy.contains("Pay Local Bills");
  }

  // ── LOCAL BILLS PAGE — BILL TYPE CARDS ────────────────────

  get airtimeCard() {
    return cy.contains("Airtime");
  }

  get dataCard() {
    return cy.contains("Data");
  }

  get electricityCard() {
    return cy.contains("Electricity");
  }

  get wifiInternetCard() {
    return cy.contains("Wifi | Internet");
  }

  get cableTvBillsCard() {
    return cy.contains("Cable | TV Bills");
  }

  get bettingCard() {
    return cy.contains("Betting");
  }

  // ── PURCHASE AIRTIME MODAL ─────────────────────────────────

  get modalHeading() {
    return cy.contains("Purchase Airtime");
  }

  get networkProviderDropdown() {
    // Headlessui listbox trigger — same pattern as other pages
    return cy.get('button[aria-haspopup="listbox"]');
  }

  get amountInput() {
    // Amount field is the first type="number" input; phone field is the second
    return cy.get('input[type="number"]').first();
  }

  get phoneInput() {
    // Phone number field — identified by its stable class
    return cy.get('input.phone-input');
  }

  get pinInput() {
    // Single withdrawal pin input — label holds the text, input is type="password"
    return cy.get('input[type="password"]');
  }

  get purchaseButton() {
    return cy.contains("button", "Purchase");
  }

  get cancelButton() {
    return cy.contains("button", "Cancel");
  }

  // ── ACTIONS ────────────────────────────────────────────────

  /**
   * Click the Pay Local Bills card in the dashboard Quick Access section
   */
  navigateFromDashboard() {
    this.payLocalBillsQuickAccess.click();
    cy.wait(2000);
  }

  /**
   * Click the Airtime bill type card to open the Purchase Airtime modal
   */
  clickAirtime() {
    this.airtimeCard.click();
    cy.wait(1000);
  }

  /**
   * Select a network provider from the headlessui listbox dropdown
   * @param {string} provider - e.g. "MTN"
   */
  selectNetworkProvider(provider) {
    this.networkProviderDropdown.click();
    cy.contains('[role="option"]', provider, { matchCase: false }).click({ force: true });
  }

  /**
   * Enter amount into the amount input field
   * @param {number|string} amount
   */
  enterAmount(amount) {
    this.amountInput.clear().type(amount);
  }

  /**
   * Clear the pre-filled phone number and enter a new one
   * @param {string} phone - e.g. "07062309274"
   */
  enterPhoneNumber(phone) {
    this.phoneInput.clear().type(phone);
  }

  /**
   * Enter the withdrawal PIN into the single pin input
   * @param {string} pin - e.g. "1960"
   */
  enterPin(pin) {
    this.pinInput.clear().type(pin);
  }

  /**
   * Click the Purchase button to submit the airtime purchase
   */
  clickPurchase() {
    this.purchaseButton.click();
  }
}

export default LocalBillsPage;
