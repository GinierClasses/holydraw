import React from 'react';
import { Box } from '@material-ui/core';
import { colors } from 'utils/app-constant';
import RandomColor from '../RandomColor';
import PreciseColorPicker from '../PreciseColorPicker';
import RoundColor from '../RoundColor';

type DrawColorPickerProps = {
  currentColor: string;
  onColorChange?: (color: string) => void;
  disabled?: boolean;
};

export default function DesktopColorPicker({
  currentColor,
  disabled,
  onColorChange,
}: DrawColorPickerProps) {
  // const theme = useTheme();
  // const disabledColor = theme.palette.action.disabled;
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      borderRadius={30}
      maxWidth={116}
      justifyContent="center"
      bgcolor="#272B31"
      padding={1}>
      {colors.map(color => {
        const isSelected = color === currentColor;
        return (
          <RoundColor
            size={1}
            color={color}
            isSelected={isSelected}
            disabled={disabled}
            onClick={() => {
              onColorChange?.(color);
            }}
          />
        );
      })}
      <RandomColor
        currentColor={currentColor}
        // disabledColor={disabled ? disabledColor : ''}
        disabled={disabled}
        onRandomClick={color => !disabled && onColorChange?.(color)}
      />
      <PreciseColorPicker
        currentColor={currentColor}
        // disabledColor={disabled ? disabledColor : ''}
        disabled={disabled}
        onColorChange={color => !disabled && onColorChange?.(color)}
      />
    </Box>
  );
}
