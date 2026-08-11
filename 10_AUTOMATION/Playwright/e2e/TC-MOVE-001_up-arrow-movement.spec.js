import { test, expect } from '@playwright/test';

test.describe('Bird Game - Up Arrow Movement', () => {
  test('TC-MOVE-001 | BR-FR-004 | BG-11 | Up Arrow moves bird continuously upward while held', async ({ page }) => {
    await page.goto('/');

    const bird = page.locator('#bird');
    const instructions = page.locator('#instructions');

    const before = await bird.boundingBox();
    expect(before).not.toBeNull();

    await page.keyboard.down('ArrowUp');
    await expect(instructions).toBeHidden();
    await page.waitForTimeout(100);

    const during = await bird.boundingBox();
    expect(during).not.toBeNull();
    expect(during.y).toBeLessThan(before.y - 5);

    await page.keyboard.up('ArrowUp');
  });
});
