import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AuthLoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);

    // Keep selectors resilient (works even if labels vary)
    this.usernameInput = page.locator('input[name="username"], input#username, input[type="text"]').first();
    this.passwordInput = page.locator('input[name="password"], input#password, input[type="password"]').first();
    this.loginButton = page.locator('button[type="submit"], button:has-text("Login"), input[type="submit"]').first();
  }

  async goto(): Promise<void> {
    await this.page.goto('http://localhost:3000/');
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
