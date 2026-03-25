const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;

for (let i = 0; i < MAX_WIDTH; i = i + 10) {
  for (let j = 0; j < MAX_HEIGHT; j = j + 10) {
    ctx.fillStyle = "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
    ctx.fillRect(i, j, 10, 10);
  }
}
