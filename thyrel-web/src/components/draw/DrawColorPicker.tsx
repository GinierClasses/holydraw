import Box from '../../styles/Box';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { baseColor } from '../../styles/colors';
import React from 'react';

type DrawColorPickerProps = {
  colors: Array<string>;
  onChange?: (color: string) => void;
  currentColor: string;
};

const SquareButton = styled.button({
  outline: 'none',
  borderRadius: '4px',
  width: '32px',
  height: '32px',
  padding: '8px',
});

function coupleColors(colors: Array<string>) {
  return colors.reduce(
    (accumulator: { index: number; result: Array<Array<string>> }, value) => {
      let colorCouples = accumulator.result[accumulator.index];
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
  onChange,
}: DrawColorPickerProps) {
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
      {coupleColors(colors).map(Couple => {
        return (
          <div
            className={css({
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: '4px',
              paddingBottom: '4px',
              top: '248px',
            })}>
            {Couple.map(squareColor => {
              const isSelected = squareColor === currentColor;

              return (
                <SquareButton
                  className={css({
                    border: isSelected ? '3px solid white' : undefined,
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
