const game = document.getElementById("game");
const bird = document.getElementById("bird");
const obstacle = document.getElementById("obstacle");
const hole = document.getElementById("hole");
const topPipe = document.getElementById("topPipe");
const bottomPipe = document.getElementById("bottomPipe");
const result = document.getElementById("result");
const resultText = document.getElementById("text");
const scoreText = document.getElementById("score");
const instructions = document.getElementById("instructions");
const restartButton = document.getElementById("restartButton");
const upButton = document.getElementById("upButton");
const downButton = document.getElementById("downButton");

/* Game settings */
const gravity = 0.35;
const jumpPower = -6.5;
const manualMovementSpeed = 4;
const obstacleSpeed = 2.5;
const holeHeight = 160;

/* Game state */
let birdTop = 200;
let birdVelocity = 0;

/*
    BG-27 baseline fix:
    keep the first obstacle visible when the page loads.
*/
let obstacleLeft = game.clientWidth - obstacle.offsetWidth;

let holeTop = 150;
let score = 0;
let obstaclePassed = false;
let movingUp = false;
let movingDown = false;
let gameStarted = false;
let gameOver = false;
let animationId;

/*
    Give the obstacle a random gap position.
*/
function randomiseHole() {
    const minimumHoleTop = 70;
    const maximumHoleTop =
        game.clientHeight - holeHeight - 70;

    holeTop = Math.floor(
        Math.random() *
        (maximumHoleTop - minimumHoleTop + 1)
    ) + minimumHoleTop;

    topPipe.style.height = holeTop + "px";

    hole.style.top = holeTop + "px";
    hole.style.height = holeHeight + "px";

    const bottomPipeTop =
        holeTop + holeHeight;

    bottomPipe.style.top =
        bottomPipeTop + "px";

    bottomPipe.style.height =
        game.clientHeight - bottomPipeTop + "px";
}

/*
    Move the obstacle back to the right.
*/
function resetObstacle() {
    obstacleLeft = game.clientWidth;
    obstaclePassed = false;

    randomiseHole();

    obstacle.style.left =
        obstacleLeft + "px";
}

/*
    Start the animation only after
    the player presses a control.
*/
function startGame() {
    if (gameStarted || gameOver) {
        return;
    }

    gameStarted = true;
    instructions.style.display = "none";

    animationId =
        requestAnimationFrame(updateGame);
}

/*
    Make the bird jump.
*/
function jump() {
    if (gameOver) {
        return;
    }

    if (!gameStarted) {
        startGame();
    }

    movingUp = false;
    movingDown = false;
    birdVelocity = jumpPower;
}

/*
    Begin moving upward.
*/
function startMovingUp() {
    if (gameOver) {
        return;
    }

    if (!gameStarted) {
        startGame();
    }

    movingUp = true;
    movingDown = false;
}

/*
    Stop moving upward.
*/
function stopMovingUp() {
    movingUp = false;
}

/*
    Begin moving downward.
*/
function startMovingDown() {
    if (gameOver) {
        return;
    }

    if (!gameStarted) {
        startGame();
    }

    movingDown = true;
    movingUp = false;
}

/*
    Stop moving downward.
*/
function stopMovingDown() {
    movingDown = false;
}

/*
    Detect collision with a pipe,
    the top of the game or the ground.
*/
function checkCollision() {
    const birdLeft = bird.offsetLeft;
    const birdRight =
        birdLeft + bird.offsetWidth;
    const birdBottom =
        birdTop + bird.offsetHeight;
    const obstacleRight =
        obstacleLeft + obstacle.offsetWidth;

    /* Collision with game boundaries. */
    if (
        birdTop <= 0 ||
        birdBottom >= game.clientHeight
    ) {
        return true;
    }

    /* Is the bird horizontally inside the obstacle? */
    const touchingObstacleHorizontally =
        birdRight >= obstacleLeft &&
        birdLeft <= obstacleRight;

    /* Is the bird outside the safe gap? */
    const outsideSafeGap =
        birdTop < holeTop ||
        birdBottom > holeTop + holeHeight;

    return (
        touchingObstacleHorizontally &&
        outsideSafeGap
    );
}

/*
    End the current game.
*/
function endGame() {
    gameOver = true;
    movingUp = false;
    movingDown = false;

    cancelAnimationFrame(animationId);

    result.style.display = "block";
    resultText.textContent =
        "Your score: " + score;
}

/*
    Main game animation.
*/
function updateGame() {
    if (!gameStarted || gameOver) {
        return;
    }

    /* Manual up-and-down movement. */
    if (movingUp) {
        birdVelocity = -manualMovementSpeed;
    } else if (movingDown) {
        birdVelocity = manualMovementSpeed;
    } else {
        birdVelocity += gravity;
    }

    /* Change the bird's position. */
    birdTop += birdVelocity;
    bird.style.top = birdTop + "px";

    /* Rotate the bird. */
    if (birdVelocity < 0) {
        bird.style.transform = "rotate(-20deg)";
    } else if (birdVelocity > 0) {
        bird.style.transform = "rotate(20deg)";
    }

    /* Move the obstacle. */
    obstacleLeft -= obstacleSpeed;
    obstacle.style.left = obstacleLeft + "px";

    /* Increase the score after passing the obstacle. */
    if (
        !obstaclePassed &&
        obstacleLeft + obstacle.offsetWidth < bird.offsetLeft
    ) {
        score++;
        scoreText.textContent = score;
        obstaclePassed = true;
    }

    /* Reset the obstacle after it leaves the game screen. */
    if (
        obstacleLeft + obstacle.offsetWidth < 0
    ) {
        resetObstacle();
    }

    /* Check for collision. */
    if (checkCollision()) {
        endGame();
        return;
    }

    animationId =
        requestAnimationFrame(updateGame);
}

/*
    Mouse click makes the bird jump.
*/
game.addEventListener("click", jump);

/*
    Keyboard controls.
*/
document.addEventListener(
    "keydown",
    function (event) {
        if (event.code === "ArrowUp") {
            event.preventDefault();
            startMovingUp();
        }

        if (event.code === "ArrowDown") {
            event.preventDefault();
            startMovingDown();
        }

        if (event.code === "Space") {
            event.preventDefault();
            jump();
        }
    }
);

document.addEventListener(
    "keyup",
    function (event) {
        if (event.code === "ArrowUp") {
            stopMovingUp();
        }

        if (event.code === "ArrowDown") {
            stopMovingDown();
        }
    }
);

/*
    On-screen Up button controls.
*/
upButton.addEventListener(
    "pointerdown",
    function (event) {
        event.preventDefault();
        startMovingUp();
    }
);

upButton.addEventListener(
    "pointerup",
    stopMovingUp
);

upButton.addEventListener(
    "pointerleave",
    stopMovingUp
);

upButton.addEventListener(
    "pointercancel",
    stopMovingUp
);

/*
    On-screen Down button controls.
*/
downButton.addEventListener(
    "pointerdown",
    function (event) {
        event.preventDefault();
        startMovingDown();
    }
);

downButton.addEventListener(
    "pointerup",
    stopMovingDown
);

downButton.addEventListener(
    "pointerleave",
    stopMovingDown
);

downButton.addEventListener(
    "pointercancel",
    stopMovingDown
);

/*
    Restart the game.
*/
restartButton.addEventListener(
    "click",
    function () {
        window.location.reload();
    }
);

/*
    Prepare the game without starting it.
*/
randomiseHole();

bird.style.top =
    birdTop + "px";

obstacle.style.left =
    obstacleLeft + "px";
