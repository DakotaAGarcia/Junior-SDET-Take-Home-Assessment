import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ReleaseNotesPage extends BasePage {
  readonly gettingStartedToggle: Locator;
  readonly installationLink: Locator;

  constructor(page: Page) {
    super(page);

    // Sidebar collapsible section
    this.gettingStartedToggle = page.getByRole('button', { name: 'Getting Started' });

    // A known child item under Getting Started (used to validate collapsed state)
    this.installationLink = page.getByRole('link', { name: 'Installation' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/docs/release-notes');
    await expect(this.gettingStartedToggle).toBeVisible();
  }

  async collapseGettingStartedAndValidate(): Promise<void> {
    // Validate expanded (child visible)
    await expect(this.installationLink).toBeVisible();

    // Collapse
    await this.gettingStartedToggle.click();

    // Validate collapsed
    await expect(this.gettingStartedToggle).toHaveAttribute('aria-expanded', 'false');
    await expect(this.installationLink).toBeHidden();
  }
}
