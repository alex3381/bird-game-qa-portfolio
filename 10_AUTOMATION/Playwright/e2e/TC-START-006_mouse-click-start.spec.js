import { test, expect } from '@playwright/test';

test.describe('Bird Game - Mouse Click Start', () => {
  test('TC-START-006 | BR-FR-003 | BG-10 | mouse click starts gameplay', async ({ page }) => {
    await page.goto('/');

    const game = page.locator('#game');
    const obstacle = page.locator('#obstacle');
    const instructions = page.locator('#instructions');

    await expect(game).toBeVisible();
    await expect(instructions).toBeVisible();

    const before = await obstacle.boundingBox();
    expect(before).not.toBeNull();

    await game.click({ position: { x: 200, y: 400 } });
    await expect(instructions).toBeHidden();

    await page.waitForTimeout(100);

    const after = await obstacle.boundingBox();
    expect(after).not.toBeNull();
    expect(after.x).toBeLessThan(before.x);
  });
});
