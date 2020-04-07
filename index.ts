import Game from "./src/game";
import "./index.less";

const canvas: HTMLCanvasElement = document.getElementById("myCanvas") as HTMLCanvasElement;
const game = new Game(canvas);

// const score: HTMLElement = document.getElementById("score") as HTMLElement;

// game.on("score", (s) => (score.innerHTML = s));
// game.on("over", (s) => alert("Game over!\nRefresh page for new game."));

game.start();
