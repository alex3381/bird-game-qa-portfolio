import { test, expect } from '@playwright/test';

test.describe('Bird Game - Gravity', () => {
  test('BR-FR-009 | BG-13 | gravity moves bird downward when manual movement stops', async ({ page }) => {
    await page.goto('/');

    const bird = page.locator('#bird');
    const instructions = page.locator('#instructions');

    await expect(bird).toBeVisible();
    await expect(instructions).toBeVisible();

    await page.keyboard.down('ArrowUp');
    await expect(instructions).toBeHidden();
    await page.waitForTimeout(150);

    await page.keyboard.up('ArrowUp');
    await page.waitForTimeout(500);

    const first = await bird.boundingBox();
    expect(first).not.toBeNull();

    await page.waitForTimeout(200);

    const second = await bird.boundingBox();
    expect(second).not.toBeNull();

    expect(second.y).toBeGreaterThan(first.y + 5);
  });
});
