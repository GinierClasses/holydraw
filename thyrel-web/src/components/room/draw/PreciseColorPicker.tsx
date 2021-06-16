import React from 'react';
import { Box, ClickAwayListener, makeStyles } from '@material-ui/core';
import { HexColorPicker } from 'react-colorful';
import RoundColor from './RoundColor';

type PreciseColorPickerProps = {
  currentColor: string;
  onColorChange: (color: string) => void;
  disabledColor?: string;
};

const useStyles = makeStyles(() => ({
  container: {
    '& .$react-colorful': {
      height: 100,
      zIndex: 5,
    },
  },
}));

export default function PreciseColorPicker({
  currentColor,
  onColorChange,
  disabledColor,
}: PreciseColorPickerProps) {
  const [color, setColor] = React.useState(currentColor);
  const [showColorPicker, setShowColorPicker] = React.useState(false);

  const [preciseColor, setPreciseColor] = React.useState(color);

  const colorWithDisabled = disabledColor ? disabledColor : preciseColor;

  const isSelected = currentColor === preciseColor;

  React.useEffect(() => {
    setColor(currentColor);
  }, [currentColor]);

  const handleClickAway = () => {
    setShowColorPicker(false);
  };
  const classes = useStyles();
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <RoundColor
          color={preciseColor}
          colorWithDisabled={colorWithDisabled}
          isSelected={isSelected}
          width={92}
          onClick={() =>
            !disabledColor && setShowColorPicker(prev => !prev)
          }></RoundColor>
        {showColorPicker && (
          <Box height={20} position="absolute" className={classes.container}>
            <HexColorPicker
              color={color}
              onMouseUp={() => onColorChange(color)}
              onChange={color => {
                setPreciseColor(color);
                setColor(color);
              }}
            />
          </Box>
        )}
      </div>
    </ClickAwayListener>
  );
}
