import { expect, test } from '@playwright/test';

// A model e2e test for the Gesso theme. It checks the front page for the
// core landmark regions that Gesso's page template always renders, so it
// works against any site content without depending on specific copy.
test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders the core page landmarks', async ({ page }) => {
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();
  });

  test('includes a skip link to the main content', async ({ page }) => {
    const skipLink = page.getByRole('link', { name: 'Skip to main content' });
    await expect(skipLink).toHaveAttribute('href', '#main');
  });
});
