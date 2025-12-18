import { test, expect } from '@playwright/test';
import { AuthLoginPage } from '../POM/AuthLoginPage';
import { ProtectedPage } from '../POM/ProtectedPage';

const STORAGE_STATE_PATH = '.auth/auth-storage.json';

test.describe.serial('Target 2: Authentication App (localhost)', () => {
  test('PW-AUTH: Login through UI and save storage state', async ({ page }) => {
    const login = new AuthLoginPage(page);

    await login.goto();
    await login.login('testuser', 'testpass'); // from repo README :contentReference[oaicite:2]{index=2}

    // Assert authenticated state by verifying the auth cookie exists (token is HTTP-only cookie) :contentReference[oaicite:3]{index=3}
    const cookies = await page.context().cookies('http://localhost:3000');
    expect(cookies.some(c => c.name === 'token')).toBeTruthy();

    // Save storage state for later tests
    await page.context().storageState({ path: STORAGE_STATE_PATH });
  });

  test('PW-AUTH: Invalid credentials shows error and does not authenticate', async ({ page }) => {
    const login = new AuthLoginPage(page);

    await login.goto();
    await login.login('wronguser', 'wrongpass');

    // Validate an error is shown (text may vary; match broadly)
    await expect(page.locator('body')).toContainText(/invalid|unauthorized|error/i);

    // Ensure no token cookie was set
    const cookies = await page.context().cookies('http://localhost:3000');
    expect(cookies.some(c => c.name === 'token')).toBeFalsy();
  });

  test('PW-AUTH: Visit /protected using saved storage state', async ({ browser }) => {
    // Create a new context using the saved storage state
    const context = await browser.newContext({ storageState: STORAGE_STATE_PATH });
    const page = await context.newPage();

    const protectedPage = new ProtectedPage(page);
    await protectedPage.goto();

    await protectedPage.assertAuthenticated();
    await protectedPage.assertShowsProtectedContent();

    await context.close();
  });
});
