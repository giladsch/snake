import { settings } from "./game";

export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  draw(context: CanvasRenderingContext2D) {
    const scale = settings.scale;
    context.fillRect(this.x * scale, this.y * scale, scale, scale);
  }

  equals(other: Point): boolean {
    return this.x === other.x && this.y === other.y;
  }
}
