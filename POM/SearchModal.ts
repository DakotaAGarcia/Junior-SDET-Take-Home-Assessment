import { expect, type Locator, type Page } from '@playwright/test';

export class SearchModal {
  readonly searchButton: Locator;
  readonly searchInput: Locator;

  constructor(private readonly page: Page) {
    // Accessibility-first locators
    this.searchButton = page.getByLabel('Search');
    this.searchInput = page.getByPlaceholder('Search docs');
  }

  async open(): Promise<void> {
    await this.searchButton.click();
    await expect(this.searchInput).toBeVisible();
  }

  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
  }

  async clickLocatorsResult(): Promise<void> {
    await this.page.locator('a[href="/docs/locators"]').first().click();
  }
  
  
}
