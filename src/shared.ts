export const Generate = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export enum Keys {
  ENTER = 13,
  SPACE = 32,
  ARROW_LEFT = 37,
  ARROW_UP = 38,
  ARROW_RIGHT = 39,
  ARROW_DOWN = 40,
}

export enum Direction {
  LEFT = "LEFT",
  UP = "UP",
  RIGHT = "RIGHT",
  DOWN = "DOWN",
}
