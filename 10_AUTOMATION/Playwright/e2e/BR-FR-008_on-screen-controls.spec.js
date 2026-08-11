import { test, expect } from '@playwright/test';

test.describe('Bird Game - On-Screen Controls', () => {
  test('BR-FR-008 | BG-11 | on-screen Up button moves bird continuously upward while held', async ({ page }) => {
    await page.goto('/');

    const bird = page.locator('#bird');
    const instructions = page.locator('#instructions');
    const upButton = page.locator('#upButton');

    await expect(bird).toBeVisible();
    await expect(instructions).toBeVisible();
    await expect(upButton).toBeVisible();

    const before = await bird.boundingBox();
    expect(before).not.toBeNull();

    await upButton.hover();
    await page.mouse.down();
    await expect(instructions).toBeHidden();

    await page.waitForTimeout(100);
    const first = await bird.boundingBox();
    expect(first).not.toBeNull();

    await page.waitForTimeout(100);
    const second = await bird.boundingBox();
    expect(second).not.toBeNull();

    await page.mouse.up();

    expect(first.y).toBeLessThan(before.y - 10);
    expect(second.y).toBeLessThan(first.y - 10);
  });

  test('BR-FR-008 | BG-11 | on-screen Down button moves bird continuously downward while held', async ({ page }) => {
    await page.goto('/');

    const bird = page.locator('#bird');
    const instructions = page.locator('#instructions');
    const downButton = page.locator('#downButton');

    await expect(bird).toBeVisible();
    await expect(instructions).toBeVisible();
    await expect(downButton).toBeVisible();

    const before = await bird.boundingBox();
    expect(before).not.toBeNull();

    await downButton.hover();
    await page.mouse.down();
    await expect(instructions).toBeHidden();

    await page.waitForTimeout(100);
    const first = await bird.boundingBox();
    expect(first).not.toBeNull();

    await page.waitForTimeout(100);
    const second = await bird.boundingBox();
    expect(second).not.toBeNull();

    await page.mouse.up();

    expect(first.y).toBeGreaterThan(before.y + 10);
    expect(second.y).toBeGreaterThan(first.y + 10);
  });
});
