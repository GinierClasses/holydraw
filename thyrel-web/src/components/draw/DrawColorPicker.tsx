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
    (acc: { index: number; result: Array<Array<string>> }, val) => {
      let colorCouples = acc.result[acc.index];
      if (!colorCouples) {
        acc.result[acc.index] = [val];
        return acc;
      }
      if (colorCouples.length === 1) {
        acc.result[acc.index].push(val);
        return acc;
      }
      if (colorCouples.length === 2) {
        acc.index++;
        acc.result[acc.index] = [val];
      }
      return acc;
    },
    { index: 0, result: [] },
  ).result;
}

export default function DrawColorPicker({
  colors,
  currentColor: color,
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
            const isSelected = squareColor === color;

            return (
                <SquareButton
                className={css({
                    border: isSelected ? '3px solid white' : undefined,
                    background: squareColor,
                })}/>
            );
            })}
        </div>
        );
    })}
    </Box>
  );
}
