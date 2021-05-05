import { Box } from '@material-ui/core';
import Shuffle from '@material-ui/icons/Shuffle';

type RandomColorProps = {
  color?: string;
  isSelected: boolean;
  onColorChange?: () => void;
};

export default function RandomColor({
  color,
  isSelected,
  onColorChange,
}: RandomColorProps) {
  //   let isSelected = false;
  return (
    <Box
      component="button"
      key={color}
      onClick={() => {
        onColorChange?.();
      }}
      border={2}
      m={0.5}
      p={0}
      bgcolor={color}
      boxShadow={isSelected ? 4 : 0}
      borderColor={isSelected ? '#ffffff' : color}
      width={42}
      height={42}
      borderRadius="50%"
      className="cursor-pointer">
      <Shuffle></Shuffle>
    </Box>
  );
}
