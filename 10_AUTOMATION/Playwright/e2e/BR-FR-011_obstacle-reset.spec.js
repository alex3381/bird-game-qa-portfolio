import { test, expect } from '@playwright/test';

test.describe('Bird Game - Obstacle Reset', () => {
  test('BR-FR-011 | BG-14 | obstacle resets to the right after leaving the left side', async ({ page }) => {
    await page.goto('/');

    const game = page.locator('#game');
    const obstacle = page.locator('#obstacle');
    const instructions = page.locator('#instructions');

    await expect(game).toBeVisible();
    await expect(obstacle).toBeVisible();
    await expect(instructions).toBeVisible();

    const gameWidth = await game.evaluate(element => element.clientWidth);

    await page.evaluate(() => {
      window.checkCollision = () => false;
    });

    await page.evaluate(() => {
      const obstacleElement = document.getElementById('obstacle');

      let previousLeft = Number.parseFloat(
        getComputedStyle(obstacleElement).left
      );

      obstacleElement.dataset.resetDetected = 'false';
      obstacleElement.dataset.resetPosition = '';

      const observer = new MutationObserver(() => {
        const currentLeft = Number.parseFloat(obstacleElement.style.left);

        if (
          Number.isFinite(previousLeft) &&
          Number.isFinite(currentLeft) &&
          currentLeft > previousLeft + 100
        ) {
          obstacleElement.dataset.resetDetected = 'true';
          obstacleElement.dataset.resetPosition = String(currentLeft);
        }

        previousLeft = currentLeft;
      });

      observer.observe(obstacleElement, {
        attributes: true,
        attributeFilter: ['style'],
      });
    });

    await game.click({ position: { x: 200, y: 400 } });
    await expect(instructions).toBeHidden();

    await expect.poll(
      async () => obstacle.getAttribute('data-reset-detected'),
      { timeout: 7000 }
    ).toBe('true');

    const resetPositionText =
      await obstacle.getAttribute('data-reset-position');

    expect(resetPositionText).not.toBeNull();

    const resetPosition = Number.parseFloat(resetPositionText);

    expect(resetPosition).toBeGreaterThanOrEqual(gameWidth - 10);
    expect(resetPosition).toBeLessThanOrEqual(gameWidth);
  });
});
