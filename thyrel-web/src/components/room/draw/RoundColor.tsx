import React from 'react';
import { Box, useTheme } from '@material-ui/core';
import { Shuffle } from '@material-ui/icons';

type RoundColorProps = {
  size: number;
  color: string;
  isSelected?: boolean;
  disabled?: boolean;
  isRandom?: boolean;
  onClick: () => void;
};

export default function RoundColor({
  size,
  color,
  isSelected,
  disabled,
  isRandom,
  onClick,
}: RoundColorProps) {
  const theme = useTheme();
  const disabledColor = theme.palette.action.disabled;
  const colorWithDisabled = disabled ? disabledColor : color;

  return (
    <Box
      component="button"
      key={color}
      onClick={onClick}
      border={2}
      m={0.5}
      p={0}
      bgcolor={colorWithDisabled}
      boxShadow={isSelected ? 4 : 0}
      borderColor={isSelected ? '#ffffff' : colorWithDisabled}
      width={size === 1 ? 42 : 92}
      height={42}
      borderRadius={size === 1 ? 50 : 21}
      className="cursor-pointer">
      {isRandom ? <Shuffle /> : ''}
    </Box>
  );
}
