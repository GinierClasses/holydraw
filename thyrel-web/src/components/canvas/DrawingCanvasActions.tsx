import { useSessionContext } from 'hooks/SessionProvider';
import { useTimerEvent } from 'hooks/useTimerInterval';
import React from 'react';
import { callAll } from 'utils/utils';
import { useCanvasContext } from './DrawingCanvasContext';

/*
 * All this component will injected on click event on the children.
 * Those event will match with the name of component.
 * They be only used inside a <DrawingCanvasContext>
 */

// clear all line on the canvas
export function OnClearAction({ children }: { children: React.ReactElement }) {
  const { clear } = useCanvasContext();
  return React.cloneElement(children, {
    onClick: callAll(clear, children.props.onClick),
  });
}

// undo last line on the canvas
export function OnUndoAction({ children }: { children: React.ReactElement }) {
  const { undo } = useCanvasContext();
  return React.cloneElement(children, {
    onClick: callAll(undo, children.props.onClick),
  });
}

// redo last line "undo" if exist on the canvas
export function OnRedoAction({ children }: { children: React.ReactElement }) {
  const { redo } = useCanvasContext();
  return React.cloneElement(children, {
    onClick: callAll(redo, children.props.onClick),
  });
}

// this component will not injected onClick but call the onSave on click on children
// the onSave will contain the big data url of canvas
export function OnSaveAction({
  children,
  onSave,
}: {
  children: React.ReactElement;
  onSave: (drawImage?: string) => void;
}) {
  const { session, autoSave } = useSessionContext(); // session,
  const { canvasRef } = useCanvasContext();

  useTimerEvent({
    finishAt: new Date(session?.stepFinishAt || ''),
    timeDuration: session?.timeDuration || 60,
    onFinish: () => autoSave(canvasRef?.current?.toDataURL()),
    onFinishPercentage: 98,
  });

  return React.cloneElement(children, {
    onClick: () => {
      onSave(canvasRef.current?.toDataURL());
      children.props.onClick?.();
    },
  });
}
