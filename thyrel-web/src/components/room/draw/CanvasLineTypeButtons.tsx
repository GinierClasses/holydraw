import { Button, ButtonGroup } from '@material-ui/core';
import { useCanvasContext } from 'components/canvas/DrawingCanvasContext';
import React from 'react';
import { LineType } from 'types/canvas.types';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import CreateIcon from '@material-ui/icons/Create';

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
      color={lineType === lineTypeProps ? 'secondary' : 'default'}>
      {children}
    </Button>
  );
}
