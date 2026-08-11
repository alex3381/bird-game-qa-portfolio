import { test, expect } from '@playwright/test';

test.describe('Bird Game - Pre-Start Idle State', () => {
  test('TC-START-002 | BR-FR-002 | BG-9 | game remains idle before player input', async ({ page }) => {
    await page.goto('/');

    const bird = page.locator('#bird');
    const obstacle = page.locator('#obstacle');
    const instructions = page.locator('#instructions');
    const score = page.locator('#score');

    const birdBefore = await bird.boundingBox();
    const obstacleBefore = await obstacle.boundingBox();

    expect(birdBefore).not.toBeNull();
    expect(obstacleBefore).not.toBeNull();

    await page.waitForTimeout(500);

    const birdAfter = await bird.boundingBox();
    const obstacleAfter = await obstacle.boundingBox();

    expect(birdAfter).not.toBeNull();
    expect(obstacleAfter).not.toBeNull();

    expect(birdAfter.y).toBeCloseTo(birdBefore.y, 1);
    expect(obstacleAfter.x).toBeCloseTo(obstacleBefore.x, 1);
    await expect(score).toHaveText('0');
    await expect(instructions).toBeVisible();
  });
});
