import { Box } from '@material-ui/core';
import Shuffle from '@material-ui/icons/Shuffle';
import { useState } from 'react';
import { getRandomColor } from 'utils/utils';
import RoundColor from './RoundColor';

type RandomColorProps = {
  currentColor: string;
  onRandomClick?: (color: string) => void;
  disabledColor?: string;
};

export default function RandomColor({
  currentColor,
  onRandomClick,
  disabledColor,
}: RandomColorProps) {
  const [randomColor, setRandomColor] = useState(getRandomColor());
  const isSelected = currentColor === randomColor;

  const colorWithDisabled = disabledColor ? disabledColor : currentColor;

  return (
    // <Box
    //   component="button"
    //   key={currentColor}
    //   onClick={() => {
    //     const newRandomColor = getRandomColor();
    //     setRandomColor(newRandomColor);
    //     onRandomClick?.(newRandomColor);
    //   }}
    //   border={2}
    //   m={0.5}
    //   pt={0.5}
    //   bgcolor={colorWithDisabled}
    //   boxShadow={isSelected ? 4 : 0}
    //   borderColor={isSelected ? '#ffffff' : colorWithDisabled}
    //   width={42}
    //   height={42}
    //   borderRadius="50%"
    //   className="cursor-pointer">
    //   <Shuffle />
    // </Box>
    <RoundColor
      color={currentColor}
      colorWithDisabled={colorWithDisabled}
      isSelected={isSelected}
      Icon={Shuffle}
      onClick={() => {
        const newRandomColor = getRandomColor();
        setRandomColor(newRandomColor);
        onRandomClick?.(newRandomColor);
      }}
    />
  );
}
