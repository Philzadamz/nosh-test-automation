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

  // ── MODAL HEADINGS ─────────────────────────────────────────

  get airtimeModalHeading() {
    return cy.contains("Purchase Airtime");
  }

  get dataModalHeading() {
    return cy.contains("Purchase Data");
  }

  get electricityModalHeading() {
    return cy.contains("Purchase Electricity");
  }

  get wifiModalHeading() {
    return cy.contains("Purchase Wifi | Internet");
  }

  get cableModalHeading() {
    return cy.contains("Purchase Cable | Tv");
  }

  get bettingModalHeading() {
    // Uses class selector to avoid matching the "Betting" card button on the bills page
    return cy.contains('.form-modal-title', 'Betting');
  }

  get customerIdInput() {
    return cy.get('input[name="customerId"]');
  }

  // ── SHARED MODAL ELEMENTS ──────────────────────────────────

  get networkProviderDropdown() {
    return cy.get('button[aria-haspopup="listbox"]').first();
  }

  get dataPlanDropdown() {
    // Second headlessui listbox — populated after a network provider is selected
    return cy.get('button[aria-haspopup="listbox"]').eq(1);
  }

  get meterTypeDropdown() {
    // Second headlessui listbox in the electricity modal
    return cy.get('button[aria-haspopup="listbox"]').eq(1);
  }

  get meterNumberInput() {
    return cy.get('input[name="deviceNumber"]');
  }

  get deviceNumberInput() {
    // Reuses the same selector as meterNumberInput — wifi/internet modal calls it "device number"
    return cy.get('input[name="deviceNumber"]');
  }

  get wifiPlanDropdown() {
    // Second headlessui listbox in the wifi modal — loads after provider is selected
    return cy.get('button[aria-haspopup="listbox"]').eq(1);
  }

  get cablePlanDropdown() {
    // Second headlessui listbox in the cable modal — loads after provider is selected
    return cy.get('button[aria-haspopup="listbox"]').eq(1);
  }

  get electricityAmountInput() {
    // Second number input in the electricity modal — after the meter number input
    return cy.get('input[type="number"]').eq(1);
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
   * Click the Data bill type card to open the Purchase Data modal
   */
  clickData() {
    this.dataCard.click();
    cy.wait(1000);
  }

  /**
   * Select the first available plan from the data plan dropdown.
   * Plans are dynamic and load after a network provider is selected.
   */
  selectDataPlan() {
    this.dataPlanDropdown.click();
    cy.get('[role="option"]').first().click({ force: true });
  }

  /**
   * Click the Wifi | Internet bill type card to open the Purchase Wifi | Internet modal
   */
  clickWifi() {
    this.wifiInternetCard.click();
    cy.wait(1000);
  }

  /**
   * Select the first available wifi plan from the second listbox.
   * Plans load dynamically after a provider is selected.
   */
  selectWifiPlan() {
    this.wifiPlanDropdown.click();
    cy.get('[role="option"]').first().click({ force: true });
  }

  /**
   * Enter the device number for wifi/internet purchase
   * @param {string} number
   */
  enterDeviceNumber(number) {
    this.deviceNumberInput.clear().type(number);
  }

  /**
   * Click the Betting card to open the Betting modal
   */
  clickBetting() {
    this.bettingCard.click();
    cy.wait(1000);
  }

  /**
   * Enter the customer ID for the betting platform
   * @param {string} id
   */
  enterCustomerId(id) {
    this.customerIdInput.clear().type(id);
  }

  /**
   * Click the Cable | TV Bills card to open the Purchase Cable | Tv modal
   */
  clickCable() {
    this.cableTvBillsCard.click();
    cy.wait(1000);
  }

  /**
   * Select the first available plan from the cable plan dropdown.
   * Plans load dynamically after a provider is selected.
   */
  selectCablePlan() {
    this.cablePlanDropdown.click();
    cy.get('[role="option"]').first().click({ force: true });
  }

  /**
   * Click the Electricity bill type card to open the Purchase Electricity modal
   */
  clickElectricity() {
    this.electricityCard.click();
    cy.wait(1000);
  }

  /**
   * Select a meter type from the second headlessui listbox
   * @param {string} type - e.g. "Prepaid" or "Postpaid"
   */
  selectMeterType(type) {
    this.meterTypeDropdown.click();
    cy.contains('[role="option"]', type, { matchCase: false }).click({ force: true });
  }

  /**
   * Enter the electricity meter number
   * @param {string} number
   */
  enterMeterNumber(number) {
    this.meterNumberInput.clear().type(number);
  }

  /**
   * Enter the amount for electricity purchase
   * @param {string|number} amount
   */
  enterElectricityAmount(amount) {
    this.electricityAmountInput.clear().type(amount);
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
