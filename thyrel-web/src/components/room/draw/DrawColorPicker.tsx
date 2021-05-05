import { Box } from '@material-ui/core';
import { colors } from 'utils/app-constant';

type DrawColorPickerProps = {
  currentColor: string;
  onColorChange?: (color: string) => void;
};

export default function DrawColorPicker({
  currentColor,
  onColorChange,
}: DrawColorPickerProps) {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      borderRadius={30}
      // to use adventage of flexWrap
      maxWidth={116}
      justifyContent="center"
      bgcolor="#272B31"
      padding={1}>
      {colors.map(color => {
        const isSelected = color === currentColor;
        const isRandomColor = color === randomColor;
        return isRandomColor ? (
          <Box
            component="button"
            key={randomColor}
            onClick={() => {
              onColorChange?.(color);
              onRandomColorClick?.();
            }}
            border={isSelected ? 2 : 0}
            m={0.5}
            bgcolor={randomColor}
            borderColor={isSelected ? '#FFF6F6' : '#000000'}
            width={42}
            height={42}
            borderRadius="50%"
            className="cursor-pointer">
            <ShuffleIcon></ShuffleIcon>
          </Box>
        ) : (
          <Box
            component="button"
            key={color}
            onClick={() => onColorChange?.(color)}
            border={2}
            m={0.5}
            p={0}
            bgcolor={color}
            boxShadow={isSelected ? 4 : 0}
            borderColor={isSelected ? '#ffffff' : color}
            width={42}
            height={42}
            borderRadius="50%"
            className="cursor-pointer"
          />
        );
      })}
    </Box>
  );
}
