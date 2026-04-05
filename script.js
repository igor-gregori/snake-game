const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const snakeLengthInfo = document.getElementById("snakeLength");

const renderTime = 100;
let snake = [
  { x: 10, y: 10 },
  { x: 20, y: 10 },
  { x: 30, y: 10 },
];
let direction = "right";
const squareSize = 10;
let food = { x: 0, y: 0 };
const foodsToWin = 50;

window.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowUp":
      changeDirection("up");
      break;
    case "ArrowDown":
      changeDirection("down");
      break;
    case "ArrowLeft":
      changeDirection("left");
      break;
    case "ArrowRight":
      changeDirection("right");
      break;
  }
});

setSnakeInfo(snake.length);
spawnFood();

const intervalID = setInterval(() => {
  draw();
}, renderTime);

function draw() {
  renderSnake();
  renderFood();
  verifyWin();
  verifyWall();
  verifyFood();
  verifySnakeBody();
  moveSnake();
}

function changeDirection(newDirection) {
  switch (newDirection) {
    case "up":
      if (newDirection !== "down") direction = "up";
      break;
    case "down":
      if (newDirection !== "up") direction = "down";
      break;
    case "left":
      if (newDirection !== "right") direction = "left";
      break;
    case "right":
      if (newDirection !== "left") direction = "right";
      break;
  }
}

function renderSnake() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const square of snake) {
    ctx.fillStyle = "white";
    ctx.fillRect(square.x, square.y, squareSize, squareSize);
  }
}

function renderFood() {
  ctx.fillStyle = "greenyellow";
  ctx.fillRect(food.x, food.y, squareSize, squareSize);
}

function verifyWin() {
  if (snake.length >= foodsToWin) {
    clearInterval(intervalID);
    renderWin();
  }
}

function verifyWall() {
  const head = snake[snake.length - 1];
  if (head.x < 0 || head.x > canvas.width) {
    clearInterval(intervalID);
    renderGameOver();
  }
  if (head.y < 0 || head.y > canvas.height) {
    clearInterval(intervalID);
    renderGameOver();
  }
}

function verifyFood() {
  const head = snake[snake.length - 1];
  if (head.x === food.x && head.y === food.y) {
    snake.push(head);
    setSnakeInfo(snake.length);
    spawnFood();
  }
}

function verifySnakeBody() {
  const head = snake[snake.length - 1];
  for (let i = 0; i < snake.length - 2; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      clearInterval(intervalID);
      renderGameOver();
    }
  }
}

function spawnFood() {
  food = {
    x: Math.floor(Math.random() * (canvas.width / 10)) * 10,
    y: Math.floor(Math.random() * (canvas.height / 10)) * 10,
  };
  const isInSnake = snake.find((e) => e.x === food.x && e.y === food.y);
  if (isInSnake !== undefined) {
    spawnFood();
  }
}

function moveSnake() {
  const head = snake[snake.length - 1];
  switch (direction) {
    case "right":
      snake.push({ x: head.x + squareSize, y: head.y });
      break;
    case "left":
      snake.push({ x: head.x - squareSize, y: head.y });
      break;
    case "down":
      snake.push({ x: head.x, y: head.y + squareSize });
      break;
    case "up":
      snake.push({ x: head.x, y: head.y - squareSize });
      break;
  }
  snake.shift();
}

function setSnakeInfo(length) {
  snakeLengthInfo.innerText = `Snake Length: ${length}/${foodsToWin}`;
}

function renderWin() {
  ctx.font = "48px Roboto Mono";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("You win 🏆", canvas.width / 2, canvas.height / 2);
}

function renderGameOver() {
  ctx.font = "48px Roboto Mono";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Game over 🙁", canvas.width / 2, canvas.height / 2);
}
