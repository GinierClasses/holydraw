import React from 'react';
import { Box, ClickAwayListener, makeStyles } from '@material-ui/core';
import { HexColorPicker } from 'react-colorful';
import RoundColor from './RoundColor';

type PreciseColorPickerProps = {
  currentColor: string;
  onColorChange: (color: string) => void;
  // disabledColor?: string;
  disabled?: boolean;
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
  // disabledColor,
  disabled,
}: PreciseColorPickerProps) {
  const [color, setColor] = React.useState(currentColor);
  const [showColorPicker, setShowColorPicker] = React.useState(false);

  // const colorWithDisabled = disabledColor ? disabledColor : currentColor;

  React.useEffect(() => {
    setColor(currentColor);
  }, [currentColor]);

  const handleClickAway = () => {
    setShowColorPicker(false);
  };
  const classes = useStyles();
  const isSelected = color === currentColor;
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <RoundColor
          size={2}
          color={currentColor}
          disabled={disabled}
          isSelected={isSelected}
          onClick={() => !disabled && setShowColorPicker(prev => !prev)}
        />
        {/* <Box
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
        /> */}
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
