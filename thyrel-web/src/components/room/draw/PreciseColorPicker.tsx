import React from 'react';
import { Box, ClickAwayListener, makeStyles } from '@material-ui/core';
import { HexColorPicker } from 'react-colorful';

type PreciseColorPickerProps = {
  currentColor: string;
  onColorChange?: (color: string) => void;
};

const useStyles = makeStyles(theme => ({
  container: {
    '& .$react-colorful': {
      height: 100,
    },
  },
}));

export default function PreciseColorPicker({
  currentColor,
  onColorChange,
}: PreciseColorPickerProps) {
  const [showColorPicker, setShowColorPicker] = React.useState(false);

  const handleClickAway = () => {
    setShowColorPicker(false);
  };
  const classes = useStyles();
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box>
        <Box
          component="button"
          onClick={() => setShowColorPicker(prev => !prev)}
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
          <Box height={20} position="absolute" className={classes.container}>
            <HexColorPicker color={currentColor} onChange={onColorChange} />
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
}
