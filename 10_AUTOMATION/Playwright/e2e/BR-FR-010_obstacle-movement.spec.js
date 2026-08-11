import { test, expect } from '@playwright/test';

test.describe('Bird Game - Obstacle Movement', () => {
  test('BR-FR-010 | BG-14 | obstacle moves continuously from right to left', async ({ page }) => {
    await page.goto('/');

    const game = page.locator('#game');
    const obstacle = page.locator('#obstacle');
    const instructions = page.locator('#instructions');

    await expect(game).toBeVisible();
    await expect(obstacle).toBeVisible();
    await expect(instructions).toBeVisible();

    const start = await obstacle.boundingBox();
    expect(start).not.toBeNull();

    await game.click({ position: { x: 200, y: 400 } });
    await expect(instructions).toBeHidden();

    await page.waitForTimeout(150);
    const first = await obstacle.boundingBox();
    expect(first).not.toBeNull();

    await page.waitForTimeout(150);
    const second = await obstacle.boundingBox();
    expect(second).not.toBeNull();

    expect(first.x).toBeLessThan(start.x);
    expect(second.x).toBeLessThan(first.x);

    const firstDistance = start.x - first.x;
    const secondDistance = first.x - second.x;

    expect(firstDistance).toBeGreaterThan(1);
    expect(secondDistance).toBeGreaterThan(1);
  });
});
