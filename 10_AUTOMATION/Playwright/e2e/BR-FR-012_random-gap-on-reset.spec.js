import { test, expect } from '@playwright/test';

test.describe('Bird Game - Random Gap on Reset', () => {
  test('BR-FR-012 | BG-15 | obstacle gap position changes when obstacle resets', async ({ page }) => {
    await page.goto('/');

    const game = page.locator('#game');
    const hole = page.locator('#hole');
    const obstacle = page.locator('#obstacle');

    await expect(game).toBeVisible();
    await expect(hole).toBeVisible();
    await expect(obstacle).toBeVisible();

    const holeTopBefore = await hole.evaluate(
      element => Number.parseFloat(element.style.top)
    );

    const controlledRandom = holeTopBefore > 170 ? 0 : 0.999999;

    await page.evaluate((randomValue) => {
      Math.random = () => randomValue;
      resetObstacle();
    }, controlledRandom);

    const holeTopAfter = await hole.evaluate(
      element => Number.parseFloat(element.style.top)
    );

    expect(holeTopAfter).not.toBe(holeTopBefore);
    expect(holeTopAfter).toBeGreaterThanOrEqual(70);
    expect(holeTopAfter).toBeLessThanOrEqual(270);
  });
});
