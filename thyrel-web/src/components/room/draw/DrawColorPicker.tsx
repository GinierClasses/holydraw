import React from 'react';
import { Box } from '@material-ui/core';
import { colors } from 'utils/app-constant';
import { HexColorPicker } from 'react-colorful';
import RandomColor from './RandomColor';

type DrawColorPickerProps = {
  currentColor: string;
  onColorChange?: (color: string) => void;
};

export default function DrawColorPicker({
  currentColor,
  onColorChange,
}: DrawColorPickerProps) {
  const [showColorPicker, setShowColorPicker] = React.useState(false);
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
        return (
          <Box
            component="button"
            key={color}
            onClick={() => {
              onColorChange?.(color);
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
            className="cursor-pointer"
          />
        );
      })}
      <RandomColor
        currentColor={currentColor}
        onRandomClick={color => {
          onColorChange?.(color);
      }}></RandomColor>
      <Box
        component="button"
        onClick={
          showColorPicker
            ? () => setShowColorPicker(false)
            : () => setShowColorPicker(true)
        }
        border={2}
        m={0.5}
        p={0}
        bgcolor={currentColor}
        boxShadow={showColorPicker ? 4 : 0}
        borderColor={showColorPicker ? '#ffffff' : currentColor}
        width={92}
        height={42}
        borderRadius={21}
        className="cursor-pointer"
      />
      {showColorPicker && (
        <Box height={20}>
          <HexColorPicker color={currentColor} onChange={onColorChange} />
        </Box>
      )}
    </Box>
  );
}
