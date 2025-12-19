import { test, expect } from '@playwright/test';
import { HomePage } from '../POM/HomePage';
import { ReleaseNotesPage } from '../POM/ReleaseNotesPage';

test.describe('Target 1: Playwright Documentation Site (POM)', () => {
  test('PW-DOC: H1 Assertion Test', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await home.assertMainH1(
      'Playwright enables reliable end-to-end testing for modern web apps.'
    );
  });

  test('PW-DOC: Search Navigation Test to /docs/locators', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await home.search.open();
    await home.search.search('locators');
    await home.search.clickLocatorsResult();
    

    await expect(page).toHaveURL(/\/docs\/locators$/);

      // H1 validation scoped to main content
    const pageH1 = page.locator('main').getByRole('heading', { level: 1 });
    await expect(pageH1).toHaveText('Locators');
    
  });

  test('PW-DOC: Footer Regex Assertion via aria snapshot', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();

    await home.assertFooterCopyrightWithRegexAriaSnapshot();
  });

  test('PW-DOC: Visual testing (image snapshot) of homepage H1', async ({ page }, testInfo) => {
    // Keep visual snapshots deterministic: validate only in headless mode.
    test.skip(testInfo.project.use.headless === false, 'Visual snapshots are validated in headless mode for determinism.');
  
    const home = new HomePage(page);
    await home.goto();
  
    await home.visualSnapshotOfH1('homepage-h1.png');
  });

  test('PW-DOC: Component state validation (collapse Getting Started)', async ({ page }) => {
    const releaseNotes = new ReleaseNotesPage(page);
    await releaseNotes.goto();

    await releaseNotes.collapseGettingStartedAndValidate();
  });
});
