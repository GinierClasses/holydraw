import { Box, ClickAwayListener } from '@material-ui/core';
import React from 'react';
import { HexColorPicker } from 'react-colorful';

type PreciseColorPickerProps = {
  currentColor: string;
  onColorChange: (color: string) => void;
  disabledColor?: string;
};

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
          borderRadius="21px"
          className="cursor-pointer"
        />
        {showColorPicker && (
          <Box
            height={20}
            position="absolute"
            sx={{
              '& .$react-colorful': {
                height: 100,
                zIndex: 5,
              },
            }}>
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
