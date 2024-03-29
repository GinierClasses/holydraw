import { client } from 'api/client';
import { getToken } from 'api/player-provider';
import { useSessionContext } from 'hooks/SessionProvider';
import { useTimerEvent } from 'hooks/useTimerInterval';
import React from 'react';
import { HolyElement } from 'types/HolyElement.type';
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
  const { currentElement, session } = useSessionContext();
  const { canvasRef } = useCanvasContext();

  useTimerEvent({
    finishAt: new Date(session?.stepFinishAt || ''),
    timeDuration: session?.timeDuration || 60,
    onFinish: () => {
      client<HolyElement>(`element/auto/${currentElement?.id}`, {
        token: getToken(),
        method: 'PATCH',
        data: { draw: canvasRef?.current?.toDataURL() },
      });
    },
    onFinishPercentage: 99,
  });

  return React.cloneElement(children, {
    onClick: () => {
      onSave(canvasRef.current?.toDataURL());
      children.props.onClick?.();
    },
  });
}
