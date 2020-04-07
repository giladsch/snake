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
    // let xMove = 0,
    //   yMove = 0;
    // switch (this.direction) {
    //   case Direction.UP:
    //     yMove = -1;
    //     break;
    //   case Direction.DOWN:
    //     yMove = 1;
    //     break;
    //   case Direction.RIGHT:
    //     xMove = 1;
    //     break;
    //   case Direction.LEFT:
    //     xMove = -1;
    //     break;
    // }

    const { xMove, yMove } = this.getMovesByDirection(this.direction);

    this.head.x += xMove;
    this.head.y += yMove;

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
      tailPart.x += xMove;
      tailPart.y += yMove;
    });

    return false;
  }
  eat(food: Food) {
    debugger;
    this.tailParts.push(food.position);
  }

  getMovesByDirection(direction: Direction) {
    let xMove = 0,
      yMove = 0;
    switch (direction) {
      case Direction.UP:
        yMove = -1;
        break;
      case Direction.DOWN:
        yMove = 1;
        break;
      case Direction.RIGHT:
        xMove = 1;
        break;
      case Direction.LEFT:
        xMove = -1;
        break;
    }
    return { xMove: xMove, yMove: yMove };
  }
}
