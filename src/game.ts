import { Point } from "./point";
import { Snake } from "./snake";
import { Food } from "./food";

// import { EventEmitter } from "events";
import { Generate, Keys, Direction } from "./shared";
import { GameSettings } from "./interfaces";

export const settings: GameSettings = {
  width: 40,
  height: 30,
  scale: 15,
  speed: 50,
};

export default class Game {
  private context: CanvasRenderingContext2D;
  private settings: GameSettings;
  private scoreElement: HTMLElement;

  private snake: Snake;
  private food: Food;
  private timestamp?: number = 0;
  private isGameOver = false;
  private nextKey: number | null = null;

  private _score: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext("2d");
    this.settings = settings;
    this.scoreElement = document.getElementById("score") as HTMLElement;

    this.snake = new Snake(new Point(0, 0));
  }

  start(): void {
    this.canvas.width = this.settings.width * this.settings.scale;
    this.canvas.height = this.settings.height * this.settings.scale;
    this.scoreElement.innerHTML = "0";

    this.attachKeyboard();
    this.placeFood();
    this.update();
  }

  restart() {
    this.snake = new Snake(new Point(0, 0));
    this._score = 0;
    this.timestamp = 0;
    this.food = null;
    this.nextKey = null;
    this.isGameOver = false;

    this.start();
  }

  private placeFood(): void {
    const x = Generate(0, this.settings.width - 1);
    const y = Generate(0, this.settings.height - 1);

    this.food = new Food(new Point(x, y));
  }

  private attachKeyboard(): void {
    document.addEventListener("keydown", (e) => {
      if (this.nextKey == null || this.nextKey != e.keyCode) {
        if (this.isGameOver && (e.keyCode === Keys.ENTER || e.keyCode === Keys.SPACE)) {
          this.restart();
        }
        this.nextKey = e.keyCode;
      }
    });
  }

  update(timestamp?: number): void {
    timestamp = timestamp || 0;

    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.snake.draw(this.context);

    if (timestamp - this.timestamp >= this.settings.speed) {
      this.timestamp = timestamp;

      this.checkKey();

      if (this.snake.move(this.settings.width - 1, this.settings.height - 1)) {
        this.isGameOver = true;
        alert("Game over!\npress space or enter to refresh the game.");
        return;
      }

      this.checkFoodCollision();
    }

    this.food.draw(this.context);

    requestAnimationFrame(this.update.bind(this));
  }

  private checkKey(): void {
    if (this.nextKey == null) {
      return;
    }

    switch (this.nextKey) {
      case Keys.ARROW_LEFT:
        if (this.snake.direction != Direction.RIGHT) {
          this.snake.direction = Direction.LEFT;
        }
        break;
      case Keys.ARROW_UP:
        if (this.snake.direction != Direction.DOWN) {
          this.snake.direction = Direction.UP;
        }
        break;
      case Keys.ARROW_RIGHT:
        if (this.snake.direction != Direction.LEFT) {
          this.snake.direction = Direction.RIGHT;
        }
        break;
      case Keys.ARROW_DOWN:
        if (this.snake.direction != Direction.UP) {
          this.snake.direction = Direction.DOWN;
        }
        break;
    }

    this.nextKey = null;
  }

  private checkFoodCollision(): void {
    if (this.snake.head.equals(this.food.position)) {
      this.snake.eat(this.food);
      this._score += 100;
      this.scoreElement.innerHTML = this._score.toString();
      this.placeFood();
    }
  }

  get canvas(): HTMLCanvasElement {
    return this.context.canvas;
  }
}
