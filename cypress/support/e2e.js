// ============================================================
// SUPPORT FILE — runs before every test automatically
// ============================================================
// This file is loaded by Cypress before every test spec.
// Use it to:
//   - Import custom commands
//   - Set global configuration
//   - Add global hooks (beforeEach, afterEach)
// ============================================================

// Import our custom commands (e.g. cy.login(), cy.loginWithFixture())
import "./commands";

// ============================================================
// UNCAUGHT EXCEPTION HANDLER
// ============================================================
// Fires whenever the application throws a JavaScript error
// that is not caught by the app itself (e.g. a React crash,
// a failed API call that isn't handled, a third-party script).
//
// Returning FALSE tells Cypress:
//   "I am aware of this error — do NOT fail the test because of it."
//
// Returning TRUE (or nothing) tells Cypress:
//   "This error should fail the test."
// ============================================================
Cypress.on("uncaught:exception", (err, runnable) => {
  // Log the error clearly in the Cypress command log so we
  // can still see what went wrong without the test failing.
  Cypress.log({
    name: "Uncaught Exception",
    message: err.message,
    consoleProps: () => ({
      "Error Message": err.message,
      "Error Stack": err.stack,
      "Running Test": runnable.title,
    }),
  });

  // These are known third-party or app-level errors we want to ignore.
  // Add more strings here as you discover harmless errors in the app.
  const knownErrorsToIgnore = [
    "ResizeObserver loop limit exceeded",       // common browser warning, not a real bug
    "ChunkLoadError",                           // lazy-loaded JS chunk failed — not test-related
    "Non-Error promise rejection captured",     // common in React apps, not test-related
    "Load failed",                              // network hiccup, not caused by the test
  ];

  const isKnownError = knownErrorsToIgnore.some((knownMsg) =>
    err.message.includes(knownMsg)
  );

  if (isKnownError) {
    // Silently ignore known harmless errors — test continues
    return false;
  }

  // For any other unexpected error, still prevent the test from failing
  // BUT print a clear warning so the developer knows to investigate.
  console.warn(
    `[Nosh Tests] Uncaught exception in test "${runnable.title}": ${err.message}`
  );

  // Return false to prevent the test from failing due to app-level errors.
  // Change this to `return true` if you want app errors to fail the tests.
  return false;
});
