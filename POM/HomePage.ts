import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { SearchModal } from './SearchModal';

export class HomePage extends BasePage {
  readonly h1: Locator;
  readonly footer: Locator;
  readonly search: SearchModal;

  constructor(page: Page) {
    super(page);

    // Role locator for main H1
    this.h1 = page.getByRole('heading', { level: 1 });

    // CSS locator for footer region
    this.footer = page.locator('footer');

    // Composed POM for search modal
    this.search = new SearchModal(page);
  }

  async goto(): Promise<void> {
    await this.page.goto('/');
    await expect(this.h1).toBeVisible();
  }

  async assertMainH1(expectedText: string): Promise<void> {
    await expect(this.h1).toHaveText(expectedText);
  }

  async assertFooterCopyrightWithRegexAriaSnapshot(): Promise<void> {
    const copyright = this.page.locator('.footer__copyright');
  
    await expect(copyright).toMatchAriaSnapshot(`
    - text: /Copyright © \\d{4} Microsoft/
    `);
  }
  
  
  
  

  async visualSnapshotOfH1(snapshotName: string): Promise<void> {
    await expect(this.h1).toHaveScreenshot(snapshotName, {
      scale: 'css',
      maxDiffPixels: 250,
    });
  }
  
  
}
