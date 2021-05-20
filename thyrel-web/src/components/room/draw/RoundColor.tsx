import React from 'react';
import { Box } from '@material-ui/core';
import theme from 'theme';

type RoundColorProps = {
  width: number;
  color: string;
  isSelected: boolean;
  disabled?: boolean;
  onClick: () => void;
};

export default function RoundColor({
  width,
  color,
  isSelected,
  disabled,
  onClick,
}: RoundColorProps) {
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
      width={width}
      height={42}
      borderRadius="50%"
      className="cursor-pointer"
    />
  );
}
