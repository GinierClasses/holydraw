import React from 'react';
import { Box, useTheme } from '@material-ui/core';
import { colors } from 'utils/app-constant';
import RandomColor from '../RandomColor';
import PreciseColorPicker from '../PreciseColorPicker';

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
  const theme = useTheme();
  const disabledColor = theme.palette.action.disabled;
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
        const colorWithDisabled = disabled ? disabledColor : color;
        return (
          <Box
            component="button"
            key={color}
            onClick={() => {
              onColorChange?.(color);
            }}
            border={2}
            m={0.5}
            p={0}
            bgcolor={colorWithDisabled}
            boxShadow={isSelected ? 4 : 0}
            borderColor={isSelected ? '#ffffff' : colorWithDisabled}
            width={42}
            height={42}
            borderRadius="50%"
            className="cursor-pointer"
          />
        );
      })}
      <RandomColor
        currentColor={currentColor}
        disabledColor={disabled ? disabledColor : ''}
        onRandomClick={color => !disabled && onColorChange?.(color)}
      />
      <PreciseColorPicker
        currentColor={currentColor}
        disabledColor={disabled ? disabledColor : ''}
        onColorChange={color => !disabled && onColorChange?.(color)}
      />
    </Box>
  );
}
