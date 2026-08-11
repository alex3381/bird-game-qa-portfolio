import { test, expect } from '@playwright/test';

test.describe('Bird Game - Browser Compatibility Smoke', () => {
  test('BR-NFR-001 | BG-22 | game loads and primary keyboard control works in supported browser project', async ({ page }) => {
    await page.goto('/');

    const game = page.locator('#game');
    const bird = page.locator('#bird');
    const scoreLocator = page.locator('#score');
    const instructions = page.locator('#instructions');

    await expect(game).toBeVisible();
    await expect(bird).toBeVisible();
    await expect(scoreLocator).toHaveText('0');
    await expect(instructions).toBeVisible();

    const before = await bird.boundingBox();
    expect(before).not.toBeNull();

    await page.keyboard.down('ArrowUp');
    await expect(instructions).toBeHidden();
    await page.waitForTimeout(100);

    const after = await bird.boundingBox();
    expect(after).not.toBeNull();

    expect(after.y).toBeLessThan(before.y - 5);

    await page.keyboard.up('ArrowUp');
  });
});
