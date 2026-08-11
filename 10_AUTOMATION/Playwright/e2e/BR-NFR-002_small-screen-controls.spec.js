import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    width: 375,
    height: 667,
  },
});

test.describe('Bird Game - Smaller Screen Usability', () => {
  test('BR-NFR-002 | BG-23 | game and on-screen controls remain usable on a smaller screen', async ({ page }) => {
    await page.goto('/');

    const game = page.locator('#game');
    const upButton = page.locator('#upButton');
    const downButton = page.locator('#downButton');
    const instructions = page.locator('#instructions');

    await expect(game).toBeVisible();
    await expect(upButton).toBeVisible();
    await expect(downButton).toBeVisible();

    await expect(game).toBeInViewport();
    await expect(upButton).toBeInViewport();
    await expect(downButton).toBeInViewport();

    const gameBox = await game.boundingBox();
    expect(gameBox).not.toBeNull();
    expect(gameBox.width).toBeLessThanOrEqual(375);

    await upButton.click();
    await expect(instructions).toBeHidden();
  });
});
