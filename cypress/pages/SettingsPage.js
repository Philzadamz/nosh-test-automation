// ============================================================
// PAGE OBJECT: Settings
// ============================================================
// Navigation: Sidebar → "Settings" (a[href="/settings"])
//
// Settings page has three tabs:
//   Profile          → shows readonly user info fields
//   KYC Verification → shows KYC Level 1 and KYC Level 2 cards
//   Security Settings → Change Password, Change Withdrawal Pin,
//                       Reset Withdrawal Pin, Enable 2-FA
//
// Security actions open modals — close them with the X / Cancel
// button without taking further action.
// ============================================================

class SettingsPage {
  // ── NAVIGATION ─────────────────────────────────────────────

  navigateFromSidebar() {
    cy.get('a[href="/settings"]').first().scrollIntoView().click();
    cy.wait(2000);
  }

  // ── TABS ───────────────────────────────────────────────────

  get profileTab() {
    return cy.contains("Profile");
  }

  get kycVerificationTab() {
    return cy.contains("KYC Verification");
  }

  get securitySettingsTab() {
    return cy.contains("Security Settings");
  }

  // ── KYC TAB CONTENT ────────────────────────────────────────

  get kycLevel1() {
    return cy.contains("KYC Level 1");
  }

  get kycLevel2() {
    return cy.contains("KYC Level 2");
  }

  // ── SECURITY SETTINGS BUTTONS ──────────────────────────────

  get changePasswordButton() {
    return cy.contains("button", "Change Password");
  }

  get changeWithdrawalPinButton() {
    return cy.contains("button", "Change Withdrawal Pin");
  }

  get resetWithdrawalPinButton() {
    return cy.contains("button", "Reset Withdrawal Pin");
  }

  get enable2FAButton() {
    return cy.contains("button", "Enable 2-FA");
  }

  // ── MODAL CLOSE ────────────────────────────────────────────

  closeModal() {
    cy.contains("button", "Cancel").click();
    cy.wait(500);
  }

  // ── TAB ACTIONS ────────────────────────────────────────────

  clickProfileTab() {
    this.profileTab.click();
    cy.wait(500);
  }

  clickKycVerificationTab() {
    this.kycVerificationTab.click();
    cy.wait(1000);
  }

  clickSecuritySettingsTab() {
    this.securitySettingsTab.click();
    cy.wait(1000);
  }

  // ── SECURITY ACTIONS ───────────────────────────────────────

  clickChangePassword() {
    this.changePasswordButton.click();
    cy.wait(1000);
  }

  clickChangeWithdrawalPin() {
    this.changeWithdrawalPinButton.click();
    cy.wait(1000);
  }

  clickResetWithdrawalPin() {
    this.resetWithdrawalPinButton.click();
    cy.wait(1000);
  }

  clickEnable2FA() {
    this.enable2FAButton.click();
    cy.wait(1000);
  }
}

export default SettingsPage;