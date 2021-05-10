import { Box } from '@material-ui/core';
import Shuffle from '@material-ui/icons/Shuffle';
import { useState } from 'react';
import { getRandomColor } from 'utils/utils';

type RandomColorProps = {
  currentColor: string;
  onRandomClick?: (color: string) => void;
};

export default function RandomColor({
  currentColor,
  onRandomClick,
}: RandomColorProps) {
  const [randomColor, setRandomColor] = useState(getRandomColor());
  const isSelected = currentColor === randomColor;

  return (
    <Box
      component="button"
      key={randomColor}
      onClick={() => {
        const newRandomColor = getRandomColor();
        setRandomColor(newRandomColor);
        onRandomClick?.(newRandomColor);
      }}
      border={2}
      m={0.5}
      p={0}
      bgcolor={randomColor}
      boxShadow={isSelected ? 4 : 0}
      borderColor={isSelected ? '#ffffff' : randomColor}
      width={42}
      height={42}
      borderRadius="50%"
      className="cursor-pointer">
      <Shuffle></Shuffle>
    </Box>
  );
}
