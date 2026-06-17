// ============================================================
// TEST SUITE: Settings
// ============================================================
// Flow:
//   1. Navigate to Settings via sidebar
//   2. Verify all 3 tabs are present
//   3. Check Profile tab content (default)
//   4. Switch to KYC Verification tab and verify content
//   5. Switch to Security Settings tab and verify content
//   6. Open Change Password modal → close without action
//   7. Open Change Withdrawal Pin modal → close without action
//   8. Open Enable 2-FA modal → close without action
// ============================================================

import SettingsPage from "../../pages/SettingsPage";

const settingsPage = new SettingsPage();

describe("Settings", () => {
  beforeEach(() => {
    cy.loginWithFixture();
    settingsPage.navigateFromSidebar();
  });

  afterEach(() => {
    cy.wait(2000);
  });

  // ── TEST 1 ──────────────────────────────────────────────
  it("should navigate to the Settings page from the sidebar", () => {
    cy.wait(1000);
    cy.url().should("include", "/settings");
  });

  // ── TEST 2 ──────────────────────────────────────────────
  it("should display all 3 settings tabs", () => {
    cy.wait(1000);
    settingsPage.profileTab.should("be.visible");
    settingsPage.kycVerificationTab.should("be.visible");
    settingsPage.securitySettingsTab.should("be.visible");
  });

  // ── TEST 3 ──────────────────────────────────────────────
  it("should display Profile tab content by default", () => {
    cy.wait(1000);
    settingsPage.profileTab.click();
    cy.wait(500);
    cy.contains("Full Name").should("be.visible");
    cy.contains("Username").should("be.visible");
    cy.contains("Phone Number").should("be.visible");
    cy.contains("Email Address").should("be.visible");
  });

  // ── TEST 4 ──────────────────────────────────────────────
  it("should display KYC Verification tab content", () => {
    cy.wait(1000);
    settingsPage.clickKycVerificationTab();
    settingsPage.kycLevel1.should("be.visible");
    settingsPage.kycLevel2.should("be.visible");
  });

  // ── TEST 5 ──────────────────────────────────────────────
  it("should display Security Settings tab content", () => {
    cy.wait(1000);
    settingsPage.clickSecuritySettingsTab();
    settingsPage.changePasswordButton.should("be.visible");
    settingsPage.changeWithdrawalPinButton.should("be.visible");
    settingsPage.enable2FAButton.should("be.visible");
  });

  // ── TEST 6 ──────────────────────────────────────────────
  it("should open and close the Change Password modal", () => {
    cy.wait(1000);
    settingsPage.clickSecuritySettingsTab();
    settingsPage.clickChangePassword();
    // Assert modal container is open — avoids matching the covered trigger button
    cy.get(".form-modal").should("be.visible");
    settingsPage.closeModal();
  });

  // ── TEST 7 ──────────────────────────────────────────────
  it("should open and close the Change Withdrawal Pin modal", () => {
    cy.wait(1000);
    settingsPage.clickSecuritySettingsTab();
    settingsPage.clickChangeWithdrawalPin();
    cy.get(".form-modal").should("be.visible");
    settingsPage.closeModal();
  });

  // ── TEST 8 ──────────────────────────────────────────────
  it("should open and close the Enable 2-FA modal", () => {
    cy.wait(1000);
    settingsPage.clickSecuritySettingsTab();
    settingsPage.clickEnable2FA();
    cy.get(".form-modal").should("be.visible");
    settingsPage.closeModal();
  });
});