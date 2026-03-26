const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let snake = [
  { x: 10, y: 10 },
  { x: 20, y: 10 },
  { x: 30, y: 10 },
];
let direction = "right";
let squareSize = 10;

window.addEventListener("keydown", function (event) {
  // TODO: can i trade rigth by left?
  if (event.key === "ArrowUp") direction = "up";
  if (event.key === "ArrowDown") direction = "down";
  if (event.key === "ArrowLeft") direction = "left";
  if (event.key === "ArrowRight") direction = "right";
});

const intervalID = setInterval(() => {
  draw();
}, 500);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const square of snake) {
    ctx.fillStyle = "white";
    ctx.fillRect(square.x, square.y, squareSize, squareSize);
  }
  // verify wall
  // verify food
  // verify snake body
  addSquare();
}

function addSquare() {
  const head = snake[snake.length - 1];
  if (direction === "right") snake.push({ x: head.x + squareSize, y: head.y });
  if (direction === "left") snake.push({ x: head.x - squareSize, y: head.y });
  if (direction === "down") snake.push({ x: head.x, y: head.y + squareSize });
  if (direction === "up") snake.push({ x: head.x, y: head.y - squareSize });
  snake.shift();
}
