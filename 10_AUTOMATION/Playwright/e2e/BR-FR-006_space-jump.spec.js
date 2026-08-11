import { test, expect } from '@playwright/test';

test.describe('Bird Game - Space Jump', () => {
  test('BR-FR-006 | BG-12 | Space gives the bird one upward jump', async ({ page }) => {
    await page.goto('/');

    const bird = page.locator('#bird');
    const instructions = page.locator('#instructions');

    const before = await bird.boundingBox();
    expect(before).not.toBeNull();

    await page.keyboard.press('Space');
    await expect(instructions).toBeHidden();
    await page.waitForTimeout(100);

    const after = await bird.boundingBox();
    expect(after).not.toBeNull();
    expect(after.y).toBeLessThan(before.y - 5);
  });
});
