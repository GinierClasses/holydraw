export type DrawingCanvasProviderProps = {
  color?: string;
  lineSize?: number;
  disabled?: boolean;
  canvasSize?: CanvasWidth;
  children?: React.ReactElement | React.ReactElement[];
};

export type CanvasWidth = {
  width: number;
  height: number;
  border: number;
  scale: number;
  lineScale: number;
};
