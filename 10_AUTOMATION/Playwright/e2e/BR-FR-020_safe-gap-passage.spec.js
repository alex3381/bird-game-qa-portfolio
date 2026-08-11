import { test, expect } from '@playwright/test';

test.describe('Bird Game - Safe Gap Passage', () => {
  test('BR-FR-020 | BG-18 | passing safely through the gap does not end the game', async ({ page }) => {
    await page.goto('/');

    const resultLocator = page.locator('#result');
    const birdLocator = page.locator('#bird');
    const obstacleLocator = page.locator('#obstacle');

    await page.evaluate(() => {
      result.style.display = 'none';

      holeTop = 150;
      hole.style.top = holeTop + 'px';
      hole.style.height = holeHeight + 'px';
      topPipe.style.height = holeTop + 'px';

      const bottomPipeTop = holeTop + holeHeight;
      bottomPipe.style.top = bottomPipeTop + 'px';
      bottomPipe.style.height =
        game.clientHeight - bottomPipeTop + 'px';

      birdTop = 200;
      bird.style.top = birdTop + 'px';

      birdVelocity = -gravity;
      movingUp = false;
      movingDown = false;

      obstacleLeft = bird.offsetLeft;
      obstacle.style.left = obstacleLeft + 'px';

      gameStarted = true;
      gameOver = false;

      updateGame();

      cancelAnimationFrame(animationId);
      gameStarted = false;
    });

    await expect(resultLocator).toBeHidden();

    const birdBox = await birdLocator.boundingBox();
    const obstacleBox = await obstacleLocator.boundingBox();

    expect(birdBox).not.toBeNull();
    expect(obstacleBox).not.toBeNull();
    expect(birdBox.x + birdBox.width).toBeGreaterThan(obstacleBox.x);
    expect(birdBox.x).toBeLessThan(obstacleBox.x + obstacleBox.width);
  });
});
