import React, { useState } from 'react';
import { getRandomColor } from 'utils/utils';
import RoundColor from './RoundColor';

type RandomColorProps = {
  currentColor: string;
  onRandomClick?: (color: string) => void;
  // disabledColor?: string;
  disabled?: boolean;
};

export default function RandomColor({
  currentColor,
  onRandomClick,
  // disabledColor,
  disabled,
}: RandomColorProps) {
  const [randomColor, setRandomColor] = useState(getRandomColor());
  const isSelected = currentColor === randomColor;

  // const colorWithDisabled = disabledColor ? disabledColor : currentColor;

  return (
    <RoundColor
      size={1}
      color={currentColor}
      isSelected={isSelected}
      disabled={disabled}
      isRandom={true}
      onClick={() => {
        const newRandomColor = getRandomColor();
        setRandomColor(newRandomColor);
        onRandomClick?.(newRandomColor);
      }}
    />
    /*{<Box
      component="button"
      key={currentColor}
      onClick={() => {
        const newRandomColor = getRandomColor();
        setRandomColor(newRandomColor);
        onRandomClick?.(newRandomColor);
      }}
      border={2}
      m={0.5}
      pt={0.5}
      bgcolor={colorWithDisabled}
      boxShadow={isSelected ? 4 : 0}
      borderColor={isSelected ? '#ffffff' : colorWithDisabled}
      width={42}
      height={42}
      borderRadius="50%"
      className="cursor-pointer">
      <Shuffle />
    </Box>}*/
  );
}
