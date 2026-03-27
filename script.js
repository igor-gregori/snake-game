const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let snake = [
  { x: 10, y: 10 },
  { x: 20, y: 10 },
  { x: 30, y: 10 },
];
let direction = "right";
let squareSize = 10;
let food = {
  x: Math.floor(Math.random() * (canvas.width / 10)) * 10,
  y: Math.floor(Math.random() * (canvas.height / 10)) * 10,
};

window.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowUp":
      if (direction !== "down") direction = "up";
      break;
    case "ArrowDown":
      if (direction !== "up") direction = "down";
      break;
    case "ArrowLeft":
      if (direction !== "right") direction = "left";
      break;
    case "ArrowRight":
      if (direction !== "left") direction = "right";
      break;
  }
});

const intervalID = setInterval(() => {
  draw();
}, 100);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const square of snake) {
    ctx.fillStyle = "white";
    ctx.fillRect(square.x, square.y, squareSize, squareSize);
  }
  ctx.fillStyle = "green";
  ctx.fillRect(food.x, food.y, squareSize, squareSize);
  verifyWall();
  // verify food
  // verify snake body
  addSquare();
}

function verifyWall() {
  const head = snake[snake.length - 1];
  if (head.x < 0 || head.x > canvas.width) {
    clearInterval(intervalID);
    alert("game over");
  }
  if (head.y < 0 || head.y > canvas.height) {
    clearInterval(intervalID);
    alert("game over");
  }
}

function addSquare() {
  const head = snake[snake.length - 1];
  if (direction === "right") snake.push({ x: head.x + squareSize, y: head.y });
  if (direction === "left") snake.push({ x: head.x - squareSize, y: head.y });
  if (direction === "down") snake.push({ x: head.x, y: head.y + squareSize });
  if (direction === "up") snake.push({ x: head.x, y: head.y - squareSize });
  snake.shift();
}
