import { test, expect } from '@playwright/test';

test.describe('Bird Game - Game Over State', () => {

  test(
    'BR-FR-021 | BG-19 | Game Over stops gameplay, scoring and player controls',
    async ({ page }) => {

      await page.goto('/');

      const bird = page.locator('#bird');
      const obstacle = page.locator('#obstacle');
      const result = page.locator('#result');
      const resultText = page.locator('#text');
      const score = page.locator('#score');
      const game = page.locator('#game');
      const upButton = page.locator('#upButton');
      const downButton = page.locator('#downButton');
      const restartButton = page.locator('#restartButton');

      /*
        Confirm the initial game state.
      */

      await expect(bird).toBeVisible();
      await expect(obstacle).toBeVisible();
      await expect(result).toBeHidden();

      /*
        Hold Arrow Up until the bird reaches
        the top boundary and causes Game Over.
      */

      await page.keyboard.down('ArrowUp');

      await expect(
        result
      ).toBeVisible({
        timeout: 4000
      });

      await page.keyboard.up('ArrowUp');

      /*
        Game Over UI should be displayed.
      */

      await expect(
        resultText
      ).toContainText('Your score:');

      await expect(
        restartButton
      ).toBeVisible();


      /*
        Record the state immediately after
        Game Over.
      */

      const birdBoxBefore =
        await bird.boundingBox();

      const obstacleBoxBefore =
        await obstacle.boundingBox();

      expect(birdBoxBefore).not.toBeNull();
      expect(obstacleBoxBefore).not.toBeNull();

      const birdTopBefore =
        birdBoxBefore.y;

      const obstacleLeftBefore =
        obstacleBoxBefore.x;

      const scoreBefore =
        await score.textContent();


      /*
        Wait briefly.

        Once Game Over occurs:
        - animation should stop;
        - obstacle should stop;
        - score should stop changing.
      */

      await page.waitForTimeout(300);

      const birdBoxAfterWait =
        await bird.boundingBox();

      const obstacleBoxAfterWait =
        await obstacle.boundingBox();

      expect(birdBoxAfterWait).not.toBeNull();
      expect(obstacleBoxAfterWait).not.toBeNull();

      expect(
        birdBoxAfterWait.y
      ).toBeCloseTo(
        birdTopBefore,
        1
      );

      expect(
        obstacleBoxAfterWait.x
      ).toBeCloseTo(
        obstacleLeftBefore,
        1
      );

      await expect(
        score
      ).toHaveText(
        scoreBefore
      );


      /*
        Try keyboard controls after Game Over.

        They must not restart gameplay
        or move the bird.
      */

      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Space');


      /*
        The Game Over overlay correctly blocks
        normal pointer interaction with the game.

        dispatchEvent is used here only to verify
        that the underlying control handlers also
        respect the gameOver state.

        This does not modify the application.
      */

      await game.dispatchEvent('click');

      await upButton.dispatchEvent(
        'pointerdown'
      );

      await upButton.dispatchEvent(
        'pointerup'
      );

      await downButton.dispatchEvent(
        'pointerdown'
      );

      await downButton.dispatchEvent(
        'pointerup'
      );


      /*
        Give the application a short period
        in which movement would have occurred
        if the controls were still active.
      */

      await page.waitForTimeout(200);


      /*
        Confirm the bird still has not moved.
      */

      const birdBoxAfterControls =
        await bird.boundingBox();

      const obstacleBoxAfterControls =
        await obstacle.boundingBox();

      expect(birdBoxAfterControls).not.toBeNull();
      expect(obstacleBoxAfterControls).not.toBeNull();

      expect(
        birdBoxAfterControls.y
      ).toBeCloseTo(
        birdTopBefore,
        1
      );

      expect(
        obstacleBoxAfterControls.x
      ).toBeCloseTo(
        obstacleLeftBefore,
        1
      );


      /*
        Score must also remain unchanged.
      */

      await expect(
        score
      ).toHaveText(
        scoreBefore
      );


      /*
        Game Over must remain displayed.
      */

      await expect(
        result
      ).toBeVisible();
    }
  );

});