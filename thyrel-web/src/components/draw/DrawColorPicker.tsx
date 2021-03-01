import Box from '../../styles/Box';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { baseColor } from '../../styles/colors';
import React from 'react';

type DrawColorPickerProps = {
  colors: Array<string>;
  onChange?: (color: string) => void;
  color: string;
};

const SquareButton = styled.button({
  outline: 'none',
  borderRadius: '4px',
  width: '32px',
  height: '32px',
});

function coupleColors(colors: Array<string>) {
  let couples = new Array<Array<string>>();
  let index = 0;
  colors.forEach(color => {
    let colorCouples = couples[index];
    if (!colorCouples) {
      couples[index] = [color];
    } else if (colorCouples.length === 1) {
      couples[index].push(color);
    } else if (colorCouples.length === 2) {
      index++;
      couples[index] = [color];
    }
  });

  return couples;
}

export default function DrawColorPicker({
  colors,
  color,
  onChange,
}: DrawColorPickerProps) {
  return (
    <Box>
      <Box
        width={88}
        display="flex"
        flexDirection="column"
        padding="8px"
        height={288}
        borderRadius={5}
        justifyContent="center"
        className={css({
          position: 'static',
          background: baseColor,
        })}>
        {/* <div> */}
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
              {Couple.map(c => {
                const isSelected = c === color;

                return (
                  <SquareButton
                    className={css({
                      width: '32px',
                      height: '32px',
                      padding: '8px',
                      border: isSelected ? '3px solid white' : undefined,
                      background: c,
                    })}></SquareButton>
                );
              })}
            </div>
          );
        })}
      </Box>
    </Box>
  );
}
