import React, { MutableRefObject } from 'react';
import { CanvasWidth } from './canvas.type';

type DrawingCanvasContextProps = {
  clear: () => void;
  undo: () => void;
  redo: () => void;
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  size: CanvasWidth;
};

export const DrawingCanvasContext = React.createContext<DrawingCanvasContextProps>(
  {} as any,
);

export function useCanvasContext() {
  const context = React.useContext(DrawingCanvasContext);
  if (!context)
    throw new Error(
      'useCanvasContext should be used within a DrawingCanvasContext',
    );
  return context;
}
