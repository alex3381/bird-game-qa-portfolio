import { test, expect } from '@playwright/test';

test.describe('Bird Game - Mouse Click Jump', () => {
  test('BR-FR-007 | BG-12 | mouse click gives the bird one upward jump', async ({ page }) => {
    await page.goto('/');

    const game = page.locator('#game');
    const bird = page.locator('#bird');
    const instructions = page.locator('#instructions');

    await expect(game).toBeVisible();
    await expect(bird).toBeVisible();
    await expect(instructions).toBeVisible();

    const before = await bird.boundingBox();
    expect(before).not.toBeNull();

    await game.click({ position: { x: 200, y: 400 } });
    await expect(instructions).toBeHidden();

    await expect.poll(async () => {
      const current = await bird.boundingBox();
      expect(current).not.toBeNull();
      return current.y;
    }, { timeout: 500 }).toBeLessThan(before.y - 10);
  });
});
