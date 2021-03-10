import Box from 'styles/Box';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { baseColor } from 'styles/colors';
import React from 'react';

type DrawColorPickerProps = {
  colors: string[];
  onColorChange?: (color: string) => void;
  currentColor: string;
};

const SquareButton = styled.button({
  outline: 'none',
  borderRadius: '4px',
  width: '32px',
  height: '32px',
  padding: '0',
});

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
      borderRadius={5}
      justifyContent="center"
      className={css({
        background: baseColor,
      })}>
      {coupleColors.map((couple, index) => {
        // let key = couple;
        return (
          <div
            key={index}
            className={css({
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: '4px',
              paddingBottom: '4px',
              top: '248px',
            })}>
            {couple.map((squareColor, index) => {
              const isSelected = squareColor === currentColor;

              return (
                <SquareButton
                  key={index}
                  onClick={() => onColorChange?.(squareColor)}
                  className={css({
                    border: isSelected ? '2px solid white' : '1px solid black',
                    background: squareColor,
                  })}
                />
              );
            })}
          </div>
        );
      })}
    </Box>
  );
}
