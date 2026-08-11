import { test, expect } from '@playwright/test';

test.describe('Bird Game - Obstacle Gap Size and Boundaries', () => {
  test('BR-FR-013 | BG-15 | obstacle opening is 160px and remains inside playable area', async ({ page }) => {
    await page.goto('/');

    const game = page.locator('#game');
    const hole = page.locator('#hole');

    await expect(game).toBeVisible();
    await expect(hole).toBeAttached();

    const gameHeight = await game.evaluate(element => element.clientHeight);
    const holeData = await hole.evaluate(element => ({
      top: element.offsetTop,
      height: element.offsetHeight,
    }));

    const holeBottom = holeData.top + holeData.height;

    expect(holeData.height).toBe(160);
    expect(holeData.top).toBeGreaterThanOrEqual(0);
    expect(holeBottom).toBeLessThanOrEqual(gameHeight);
  });
});
