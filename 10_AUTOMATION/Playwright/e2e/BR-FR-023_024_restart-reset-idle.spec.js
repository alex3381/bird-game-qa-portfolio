import { test, expect } from '@playwright/test';

test.describe('Bird Game - Restart Reset and Idle State', () => {
  test('BR-FR-023 | BR-FR-024 | BG-21 | restart resets state and returns game to idle', async ({ page }) => {
    await page.goto('/');

    const game = page.locator('#game');
    const bird = page.locator('#bird');
    const obstacle = page.locator('#obstacle');
    const scoreLocator = page.locator('#score');
    const instructions = page.locator('#instructions');
    const resultLocator = page.locator('#result');
    const restartButton = page.locator('#restartButton');

    await page.evaluate(() => {
      score = 5;
      scoreText.textContent = '5';

      birdTop = 300;
      bird.style.top = birdTop + 'px';

      obstacleLeft = 100;
      obstacle.style.left = obstacleLeft + 'px';

      instructions.style.display = 'none';

      endGame();
    });

    await expect(resultLocator).toBeVisible();

    await restartButton.click();

    await expect(resultLocator).toBeHidden();
    await expect(scoreLocator).toHaveText('0');
    await expect(instructions).toBeVisible();

    expect(
      await bird.evaluate(element => element.offsetTop)
    ).toBe(200);

    const gameWidth =
      await game.evaluate(element => element.clientWidth);

    const obstacleWidth =
      await obstacle.evaluate(element => element.offsetWidth);

    const expectedObstacleLeft =
      gameWidth - obstacleWidth;

    expect(
      await obstacle.evaluate(element => element.offsetLeft)
    ).toBe(expectedObstacleLeft);

    const birdBeforeWait = await bird.boundingBox();
    const obstacleBeforeWait = await obstacle.boundingBox();

    expect(birdBeforeWait).not.toBeNull();
    expect(obstacleBeforeWait).not.toBeNull();

    await page.waitForTimeout(500);

    const birdAfterWait = await bird.boundingBox();
    const obstacleAfterWait = await obstacle.boundingBox();

    expect(birdAfterWait).not.toBeNull();
    expect(obstacleAfterWait).not.toBeNull();

    expect(birdAfterWait.y).toBeCloseTo(birdBeforeWait.y, 1);
    expect(obstacleAfterWait.x).toBeCloseTo(obstacleBeforeWait.x, 1);
    await expect(scoreLocator).toHaveText('0');
  });
});
