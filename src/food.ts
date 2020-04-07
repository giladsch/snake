import { Point } from "./point";

export class Food {
  position: Point;

  constructor(position: Point) {
    this.position = position;
  }

  draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = "#ec0f36";
    this.position.draw(context);
  }
}
