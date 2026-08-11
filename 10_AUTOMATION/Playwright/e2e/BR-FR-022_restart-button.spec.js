import { test, expect } from '@playwright/test';

test.describe('Bird Game - Restart Button', () => {
  test('BR-FR-022 | BG-20 | Restart button starts a fresh game page', async ({ page }) => {
    await page.goto('/');

    const resultLocator = page.locator('#result');
    const restartButton = page.locator('#restartButton');
    const instructions = page.locator('#instructions');
    const scoreLocator = page.locator('#score');

    await page.evaluate(() => {
      score = 3;
      scoreText.textContent = '3';
      endGame();
    });

    await expect(resultLocator).toBeVisible();
    await expect(restartButton).toBeVisible();

    await restartButton.click();

    await expect(resultLocator).toBeHidden();
    await expect(instructions).toBeVisible();
    await expect(scoreLocator).toHaveText('0');
  });
});
