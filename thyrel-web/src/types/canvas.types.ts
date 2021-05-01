export type Coordinate = {
  x: number;
  y: number;
};

export type Line = {
  id?: number;
  type: LineType;
  color: string;
  size: number;
  points: Coordinate[];
};

export enum LineType {
  LINE = 0,
  CIRCLE = 1,
}
