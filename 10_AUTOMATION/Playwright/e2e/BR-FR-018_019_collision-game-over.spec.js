import { test, expect } from '@playwright/test';

test.describe('Bird Game - Collision and Game Over', () => {
  test('BR-FR-018 | BG-18 | collision with a pipe ends the game', async ({ page }) => {
    await page.goto('/');

    const resultLocator = page.locator('#result');

    await page.evaluate(() => {
      result.style.display = 'none';

      holeTop = 250;
      hole.style.top = holeTop + 'px';
      topPipe.style.height = holeTop + 'px';

      const bottomPipeTop = holeTop + holeHeight;
      bottomPipe.style.top = bottomPipeTop + 'px';
      bottomPipe.style.height =
        game.clientHeight - bottomPipeTop + 'px';

      birdTop = 100;
      bird.style.top = birdTop + 'px';
      birdVelocity = 0;

      obstacleLeft = bird.offsetLeft;
      obstacle.style.left = obstacleLeft + 'px';

      movingUp = false;
      movingDown = false;
      gameStarted = true;
      gameOver = false;

      updateGame();
    });

    await expect(resultLocator).toBeVisible();
    await expect(resultLocator).toContainText('Game Over');
  });

  test('BR-FR-019 | BG-18 | collision with a game boundary ends the game', async ({ page }) => {
    await page.goto('/');

    const resultLocator = page.locator('#result');

    await page.evaluate(() => {
      result.style.display = 'none';

      birdTop = 1;
      bird.style.top = birdTop + 'px';
      birdVelocity = 0;

      movingUp = true;
      movingDown = false;
      gameStarted = true;
      gameOver = false;

      updateGame();
    });

    await expect(resultLocator).toBeVisible();
    await expect(resultLocator).toContainText('Game Over');
  });
});
