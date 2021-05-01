export type DrawingCanvasProviderProps = {
  color?: string;
  lineSize?: number;
  disabled?: boolean;
  children?: React.ReactElement | React.ReactElement[];
};

export type CanvasWidth = {
  width: number;
  height: number;
  border: number;
  scale: number;
};
