import { test, expect } from '@playwright/test';

test.describe('Bird Game - Initial and Visible Score', () => {
  test('BR-FR-014 | BR-FR-017 | BG-16 | score starts at 0 and remains visibly displayed', async ({ page }) => {
    await page.goto('/');

    const scoreBoard = page.locator('#scoreBoard');
    const score = page.locator('#score');

    await expect(scoreBoard).toBeVisible();
    await expect(score).toBeVisible();
    await expect(score).toHaveText('0');
    await expect(scoreBoard).toContainText('Score:');
  });
});
