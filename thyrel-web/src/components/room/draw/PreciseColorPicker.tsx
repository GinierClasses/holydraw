import React from 'react';
import { Box, ClickAwayListener, makeStyles } from '@material-ui/core';
import { HexColorPicker } from 'react-colorful';

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

  const colorWithDisabled = disabledColor ? disabledColor : currentColor;

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
        <Box
          component="button"
          onClick={() => !disabledColor && setShowColorPicker(prev => !prev)}
          border={2}
          m={0.5}
          p={0}
          bgcolor={colorWithDisabled}
          boxShadow={showColorPicker ? 4 : 0}
          borderColor={showColorPicker ? '#ffffff' : colorWithDisabled}
          width={92}
          height={42}
          borderRadius={21}
          className="cursor-pointer"
        />
        {showColorPicker && (
          <Box height={20} position="absolute" className={classes.container}>
            <HexColorPicker
              color={color}
              onMouseUp={() => onColorChange(color)}
              onChange={setColor}
            />
          </Box>
        )}
      </div>
    </ClickAwayListener>
  );
}
