// ============================================================
// PAGE OBJECT: International Bills
// ============================================================
// Navigation: Dashboard Quick Access → "International Bills"
// International Bills page shows 6 bill type cards:
//   Airtime | Data | Electricity | Wifi | Internet | Cable | TV Bills | Water
//
// Each card opens a modal with fields similar to Local Bills
// but targeting international providers and phone numbers.
// ============================================================

class InternationalBillsPage {
  // ── DASHBOARD QUICK ACCESS ─────────────────────────────────

  get internationalBillsQuickAccess() {
    return cy.contains("International Bills");
  }

  // ── INTERNATIONAL BILLS PAGE — BILL TYPE CARDS ────────────

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

  get waterCard() {
    return cy.contains("Water");
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

  get waterModalHeading() {
    return cy.contains("Purchase Water");
  }

  // ── SHARED MODAL ELEMENTS ──────────────────────────────────

  get countryDropdown() {
    // First headlessui listbox — country selector
    return cy.get('button[aria-haspopup="listbox"]').first();
  }

  get networkProviderDropdown() {
    // Second headlessui listbox — loads after country is selected
    return cy.get('button[aria-haspopup="listbox"]').eq(1);
  }

  get walletDropdown() {
    // Always the last headlessui listbox — wallet selector regardless of how many plan dropdowns precede it
    return cy.get('button[aria-haspopup="listbox"]').last();
  }

  get dataPlanDropdown() {
    // Third headlessui listbox — populated after a network provider is selected
    return cy.get('button[aria-haspopup="listbox"]').eq(2);
  }

  get meterTypeDropdown() {
    // Third headlessui listbox in the electricity modal
    return cy.get('button[aria-haspopup="listbox"]').eq(2);
  }

  get wifiPlanDropdown() {
    // Third headlessui listbox in the wifi modal — loads after provider is selected
    return cy.get('button[aria-haspopup="listbox"]').eq(2);
  }

  get cablePlanDropdown() {
    // Third headlessui listbox in the cable modal — loads after provider is selected
    return cy.get('button[aria-haspopup="listbox"]').eq(2);
  }

  get meterNumberInput() {
    return cy.get('input[name="deviceNumber"]');
  }

  get deviceNumberInput() {
    return cy.get('input[name="deviceNumber"]');
  }

  get electricityAmountInput() {
    // Second number input in the electricity modal — after the meter number input
    return cy.get('input[type="number"]').eq(1);
  }

  get amountInput() {
    // Amount field — first type="number" input
    return cy.get('input[type="number"]').first();
  }

  get phoneInput() {
    // The amount field shares the .phone-input class but is disabled (auto-populated).
    // Exclude disabled inputs to always land on the actual phone number field.
    return cy.get('input.phone-input').not('[disabled]').last();
  }

  get pinInput() {
    return cy.get('input[type="password"]');
  }

  get proceedButton() {
    return cy.contains("button", "Proceed");
  }

  get confirmationCheckbox() {
    return cy.get('input[type="checkbox"]');
  }

  get finalPurchaseButton() {
    return cy.contains("button", "Purchase Airtime");
  }

  get cancelButton() {
    return cy.contains("button", "Cancel");
  }

  // ── ACTIONS ────────────────────────────────────────────────

  /**
   * Scroll to the International Bills card in the dashboard Quick Access section and click it.
   * Uses the href anchor to avoid matching the sidebar "International Bills" link.
   */
  navigateFromDashboard() {
    cy.get('a[href="/intl-bills"]').first().scrollIntoView().click();
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
   * Click the Electricity bill type card to open the Purchase Electricity modal
   */
  clickElectricity() {
    this.electricityCard.click();
    cy.wait(1000);
  }

  /**
   * Click the Wifi | Internet bill type card to open the Purchase Wifi | Internet modal
   */
  clickWifi() {
    this.wifiInternetCard.click();
    cy.wait(1000);
  }

  /**
   * Click the Cable | TV Bills card to open the Purchase Cable | Tv modal
   */
  clickCable() {
    this.cableTvBillsCard.click();
    cy.wait(1000);
  }

  /**
   * Click the Water bill type card to open the Purchase Water modal
   */
  clickWater() {
    this.waterCard.click();
    cy.wait(1000);
  }

  /**
   * Select a country from the first headlessui listbox
   * @param {string} country - e.g. "Ghana"
   */
  selectCountry(country) {
    this.countryDropdown.click();
    cy.contains('[role="option"]', country, { matchCase: false }).click({ force: true });
  }

  /**
   * Select a network provider from the second headlessui listbox
   * @param {string} provider - e.g. "MTN"
   */
  selectNetworkProvider(provider) {
    this.networkProviderDropdown.click();
    cy.contains('[role="option"]', provider, { matchCase: false }).click({ force: true });
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
   * Select the first available wifi plan from the third listbox.
   */
  selectWifiPlan() {
    this.wifiPlanDropdown.click();
    cy.get('[role="option"]').first().click({ force: true });
  }

  /**
   * Select the first available cable plan from the third listbox.
   */
  selectCablePlan() {
    this.cablePlanDropdown.click();
    cy.get('[role="option"]').first().click({ force: true });
  }

  /**
   * Select a meter type from the third headlessui listbox
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
   * Enter the device number for wifi/cable purchase
   * @param {string} number
   */
  enterDeviceNumber(number) {
    this.deviceNumberInput.clear().type(number);
  }

  /**
   * Enter amount into the amount input field
   * @param {number|string} amount
   */
  enterAmount(amount) {
    this.amountInput.clear().type(amount);
  }

  /**
   * Enter the amount for electricity purchase
   * @param {string|number} amount
   */
  enterElectricityAmount(amount) {
    this.electricityAmountInput.clear().type(amount);
  }

  /**
   * Enter the phone number
   * @param {string} phone
   */
  enterPhoneNumber(phone) {
    this.phoneInput.clear().type(phone);
  }

  /**
   * Enter the withdrawal PIN
   * @param {string} pin
   */
  enterPin(pin) {
    this.pinInput.clear().type(pin);
  }

  /**
   * Select a wallet from the wallet dropdown
   * @param {string} wallet - e.g. "Naira Wallet"
   */
  selectWallet(wallet) {
    this.walletDropdown.click();
    cy.contains('[role="option"]', wallet, { matchCase: false }).click({ force: true });
  }

  /**
   * Click the Proceed button to move to the confirmation step
   */
  clickProceed() {
    this.proceedButton.click();
  }

  /**
   * Click the confirmation checkbox on the summary screen
   */
  clickConfirmationCheckbox() {
    // Checkbox has display:none — force is required
    this.confirmationCheckbox.click({ force: true });
  }

  /**
   * Click the final Purchase Airtime button on the confirmation screen
   */
  clickFinalPurchase() {
    this.finalPurchaseButton.click();
  }

  /**
   * Click the final Purchase Data button on the data confirmation screen
   */
  clickDataFinalPurchase() {
    cy.contains("button", "Purchase Data").click();
  }

  /**
   * Click the final Purchase Electricity button on the electricity confirmation screen
   */
  clickElectricityFinalPurchase() {
    cy.contains("button", "Purchase Electricity").click();
  }
}

export default InternationalBillsPage;