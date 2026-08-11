import { test, expect } from '@playwright/test';

test.describe('Bird Game - Scoring', () => {
  test('BR-FR-015 | BR-FR-016 | BG-17 | passing the whole obstacle adds exactly one point', async ({ page }) => {
    await page.goto('/');

    const scoreLocator = page.locator('#score');
    const obstacleLocator = page.locator('#obstacle');

    await expect(scoreLocator).toHaveText('0');

    await page.evaluate(() => {
      score = 0;
      scoreText.textContent = '0';
      obstaclePassed = false;

      birdTop = 200;
      birdVelocity = 0;
      movingUp = false;
      movingDown = false;

      obstacleLeft =
        bird.offsetLeft - obstacle.offsetWidth - 1;

      obstacle.style.left = obstacleLeft + 'px';

      gameStarted = true;
      gameOver = false;

      updateGame();

      cancelAnimationFrame(animationId);
      gameStarted = false;
    });

    await expect(scoreLocator).toHaveText('1');

    const obstacleAfterFirstPass =
      await obstacleLocator.evaluate(element => element.offsetLeft);

    await page.evaluate(() => {
      gameStarted = true;
      gameOver = false;

      updateGame();

      cancelAnimationFrame(animationId);
      gameStarted = false;
    });

    await expect(scoreLocator).toHaveText('1');

    const obstacleAfterSecondUpdate =
      await obstacleLocator.evaluate(element => element.offsetLeft);

    expect(obstacleAfterSecondUpdate)
      .toBeLessThan(obstacleAfterFirstPass);
  });
});
