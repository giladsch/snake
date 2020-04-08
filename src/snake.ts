import { Point } from "./point";
import { Direction } from "./shared";
import { Food } from "./food";

export class Snake {
  tailParts: Point[];
  direction: Direction;
  head: Point;

  constructor(inizializePosition: Point) {
    this.head = inizializePosition;
    this.tailParts = [];
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = "#0fd24f";
    this.head.draw(context);

    context.fillStyle = "#29a050";
    this.tailParts.forEach((tailPart) => tailPart.draw(context));
  }

  move(maxX: number, maxY: number): boolean {
    let x = this.head.x;
    let y = this.head.y;
    let detectCollision = false;

    switch (this.direction) {
      case Direction.UP:
        this.head.y -= 1;
        break;
      case Direction.DOWN:
        this.head.y += 1;
        break;
      case Direction.RIGHT:
        this.head.x += 1;
        break;
      case Direction.LEFT:
        this.head.x -= 1;
        break;
    }

    if (this.head.x < 0) {
      this.head.x = maxX;
    }

    if (this.head.y < 0) {
      this.head.y = maxY;
    }

    if (this.head.x > maxX) {
      this.head.x = 0;
    }

    if (this.head.y > maxY) {
      this.head.y = 0;
    }

    this.tailParts.forEach((tailPart) => {
      const xtmp = tailPart.x;
      const ytmp = tailPart.y;

      tailPart.set(x, y);

      if (tailPart.equals(this.head)) {
        detectCollision = true;
      }

      x = xtmp;
      y = ytmp;
    });

    return detectCollision;
  }

  eat(food: Food) {
    this.tailParts.push(food.position);
  }
}
