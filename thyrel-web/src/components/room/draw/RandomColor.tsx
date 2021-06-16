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
