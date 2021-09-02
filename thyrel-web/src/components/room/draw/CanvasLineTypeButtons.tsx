import { Button, ButtonGroup } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import { useCanvasContext } from 'components/canvas/DrawingCanvasContext';
import React from 'react';
import { LineType } from 'types/canvas.types';

export default function CanvasLineTypeButtons() {
  return (
    <ButtonGroup>
      <LineTypeButton lineType={LineType.FILL}>
        <FormatColorFillIcon />
      </LineTypeButton>
      <LineTypeButton lineType={LineType.LINE}>
        <CreateIcon />
      </LineTypeButton>
    </ButtonGroup>
  );
}

function LineTypeButton({
  children,
  lineType: lineTypeProps,
}: {
  children: React.ReactElement;
  lineType: LineType;
}) {
  const { lineType, setLineType } = useCanvasContext();

  return (
    <Button
      onClick={() => setLineType(lineTypeProps)}
      variant="outlined"
      color={lineType === lineTypeProps ? 'secondary' : 'info'}>
      {children}
    </Button>
  );
}
