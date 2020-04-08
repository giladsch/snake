import Game from "./src/game";
import "./index.less";

const canvas: HTMLCanvasElement = document.getElementById("myCanvas") as HTMLCanvasElement;
const game = new Game(canvas);

game.start();
