import { expect, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProtectedPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.page.goto('http://localhost:3000/protected');
  }

  async assertAuthenticated(): Promise<void> {
    // Robust check: expect the token cookie to exist
    const cookies = await this.page.context().cookies('http://localhost:3000');
    expect(cookies.some(c => c.name === 'token')).toBeTruthy();
  }

  async assertShowsProtectedContent(): Promise<void> {
    // Flexible content assertion (UI may vary)
    await expect(this.page.locator('body')).toContainText(/protected|user|authenticated/i);
  }
}
