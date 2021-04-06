import React from 'react';

export const CanvasRefContext = React.createContext<{
  canvasRef: React.RefObject<HTMLCanvasElement>;
}>({} as any);

export function useCanvasRefContext() {
  const context = React.useContext(CanvasRefContext);
  if (!context)
    throw new Error(
      'useRoomContext should be used within a RoomSocketContextProvider',
    );
  return context;
}
