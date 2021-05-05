import { primaryFade } from 'styles/colors';
import React from 'react';
import { Box } from '@material-ui/core';

type DrawColorPickerProps = {
  colors: string[];
  onColorChange?: (color: string) => void;
  currentColor: string;
  flexDirection?: 'row' | 'column';
};

export default function DrawColorPicker({
  colors,
  currentColor,
  onColorChange,
  flexDirection = 'column',
}: DrawColorPickerProps) {
  return (
    <Box
      display="flex"
      flexDirection={'row'}
      borderRadius={4}
      border={1}
      width={flexDirection === 'row' ? '100%' : 88}
      flexWrap="wrap"
      borderColor="#000000"
      justifyContent="center"
      bgcolor={primaryFade(0.2)}>
      {colors.map(color => {
        const isSelected = color === currentColor;
        return (
          <Box
            component="button"
            key={color}
            onClick={() => onColorChange?.(color)}
            border={1.5}
            m={0.5}
            bgcolor={color}
            borderColor={isSelected ? '#FFFFFF' : '#000000'}
            width={32}
            height={32}
            borderRadius={16}
            className="cursor-pointer"
          />
        );
      })}
    </Box>
  );
}
