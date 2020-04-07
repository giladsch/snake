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

  private snake: Snake;
  private food: Food;
  private timestamp?: number = 0;

  private nextKey: number | null = null;

  private _score: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext("2d");
    this.settings = settings;

    this.snake = new Snake(new Point(0, 0));
  }

  start(): void {
    this.canvas.width = this.settings.width * this.settings.scale;
    this.canvas.height = this.settings.height * this.settings.scale;

    this.attachKeyboard();
    this.placeFood();
    this.update();
  }

  private placeFood(): void {
    const x = Generate(0, this.settings.width - 1);
    const y = Generate(0, this.settings.height - 1);

    this.food = new Food(new Point(x, y));
  }

  private attachKeyboard(): void {
    document.addEventListener("keydown", (e) => {
      if (this.nextKey == null || this.nextKey != e.keyCode) {
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
        // this.emit("over", this._score);
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
        this.snake.direction = Direction.LEFT;
        break;
      case Keys.ARROW_UP:
        this.snake.direction = Direction.UP;
        break;
      case Keys.ARROW_RIGHT:
        this.snake.direction = Direction.RIGHT;
        break;
      case Keys.ARROW_DOWN:
        this.snake.direction = Direction.DOWN;
        break;
    }

    this.nextKey = null;
  }

  private checkFoodCollision(): void {
    if (this.snake.head.equals(this.food.position)) {
      this.snake.eat(this.food);
      // this.emit("score", ++this._score);
      this.placeFood();
    }
  }

  get canvas(): HTMLCanvasElement {
    return this.context.canvas;
  }
}
