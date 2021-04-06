import { primaryFade } from 'styles/colors';
import React from 'react';
import { Box } from '@material-ui/core';

type DrawColorPickerProps = {
  colors: string[];
  onColorChange?: (color: string) => void;
  currentColor: string;
};

function getCoupleColors(colors: string[]) {
  return colors.reduce(
    (accumulator: { index: number; result: string[][] }, value) => {
      const colorCouples = accumulator.result[accumulator.index];
      switch (colorCouples?.length) {
        case undefined:
          accumulator.result[accumulator.index] = [value];
          break;
        case 1:
          accumulator.result[accumulator.index].push(value);
          break;
        default:
          accumulator.index++;
          accumulator.result[accumulator.index] = [value];
      }
      return accumulator;
    },
    { index: 0, result: [] },
  ).result;
}

export default function DrawColorPicker({
  colors,
  currentColor,
  onColorChange,
}: DrawColorPickerProps) {
  const coupleColors: string[][] = React.useMemo(
    () => getCoupleColors(colors),
    [colors],
  );

  return (
    <Box
      width={88}
      display="flex"
      flexDirection="column"
      padding="8px"
      borderRadius={4}
      gridGap={8}
      border={1}
      borderColor="#000000"
      justifyContent="center"
      bgcolor={primaryFade(0.2)}>
      {coupleColors.map((couple, index) => (
        <Box
          key={index}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          top={248}>
          {couple.map((squareColor, index) => {
            const isSelected = squareColor === currentColor;

            return (
              <Box
                component="button"
                key={index}
                onClick={() => onColorChange?.(squareColor)}
                border={isSelected ? 2 : 1}
                bgcolor={squareColor}
                borderColor={isSelected ? '#FFFFFF' : '#000000'}
                width={32}
                height={32}
                borderRadius={4}
                className="cursor-pointer"
              />
            );
          })}
        </Box>
      ))}
    </Box>
  );
}
