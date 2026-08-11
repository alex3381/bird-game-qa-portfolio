import { test, expect } from '@playwright/test';

test.describe('Bird Game - Initial State', () => {
  test('TC-START-001 | BR-FR-001 | BG-8 | displays the correct initial game state', async ({ page }) => {
    await page.goto('/');

    const bird = page.locator('#bird');
    const obstacle = page.locator('#obstacle');
    const score = page.locator('#score');
    const instructions = page.locator('#instructions');

    await expect(bird).toBeVisible();
    await expect(obstacle).toBeVisible();
    await expect(score).toHaveText('0');
    await expect(instructions).toBeVisible();
  });
});
