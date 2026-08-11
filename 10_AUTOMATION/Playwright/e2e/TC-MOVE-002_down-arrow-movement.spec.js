import { test, expect } from '@playwright/test';

test.describe('Bird Game - Down Arrow Movement', () => {
  test('TC-MOVE-002 | BR-FR-005 | BG-11 | Down Arrow moves bird continuously downward while held', async ({ page }) => {
    await page.goto('/');

    const bird = page.locator('#bird');
    const instructions = page.locator('#instructions');

    const before = await bird.boundingBox();
    expect(before).not.toBeNull();

    await page.keyboard.down('ArrowDown');
    await expect(instructions).toBeHidden();
    await page.waitForTimeout(100);

    const during = await bird.boundingBox();
    expect(during).not.toBeNull();
    expect(during.y).toBeGreaterThan(before.y + 5);

    await page.keyboard.up('ArrowDown');
  });
});
