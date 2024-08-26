import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Rick And Morty');
});

test('Flow add recent characters viewed', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('Recently Viewed Characters')).toBeVisible();
  await expect(page.getByTestId('recents')).not.toBeVisible();
  await expect(page.getByText('No characters viewed recently.')).toBeVisible();
  await expect(page.getByText('Rick Sanchez')).toBeVisible();

  // await page.getByText('Rick Sanchez').click();
  await page.getByTestId('character-1').click();
  await page.waitForURL('**/characters/1');

  const title = page.getByText('Character Details');
  await title.waitFor();
  await expect(title).toBeVisible();

  await page.goBack();

  await expect(page.getByText('Recently Viewed Characters')).toBeVisible();
  const recents = page.getByTestId('recents');
  await expect(recents).toBeVisible();
  await expect(page.getByText('No characters viewed recently.')).not.toBeVisible();
  await expect(recents.getByText('Rick Sanchez')).toBeVisible();
});
