import { Box, fade, makeStyles, Theme, useTheme } from '@material-ui/core';

type SizePickerProps = {
  currentSize: number;
  onSizeChange: (size: number) => void;
  flexDirection?: 'row' | 'column';
};

const buttonSizes = [4, 8, 16, 20, 24, 30];

export default function SizePicker({
  currentSize,
  onSizeChange,
  flexDirection = 'row',
}: SizePickerProps) {
  const theme = useTheme();
  return (
    <Box
      padding={1}
      gridGap={8}
      bgcolor={fade(theme.palette.primary.main, 0.2)}
      display="flex"
      borderRadius={4}
      border={1}
      flexDirection={flexDirection}
      borderColor="common.black"
      alignItems="center"
      boxShadow={2}>
      {buttonSizes.map((size, i) => {
        const isCurrentSize = currentSize === size;
        return (
          <SizePickerPoint
            key={size}
            onSizeChange={onSizeChange}
            size={size}
            isCurrentSize={isCurrentSize}
          />
        );
      })}
    </Box>
  );
}

const useStyles = makeStyles<Theme, { isCurrentSize: boolean }>(theme => ({
  button: {
    backgroundColor: 'transparent',
    outline: 'none',
    border: '2px solid #000000',
    borderRadius: '50%',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    boxShadow: props =>
      props.isCurrentSize
        ? `0 0 .2px 2px ${fade(theme.palette.primary.main, 0.8)}`
        : 'none',
  },
}));

function SizePickerPoint({
  onSizeChange,
  size,
  isCurrentSize,
}: {
  onSizeChange: (size: number) => void;
  size: number;
  isCurrentSize: boolean;
}) {
  const classes = useStyles({ isCurrentSize });
  return (
    <button onClick={() => onSizeChange(size)} className={classes.button}>
      <Box
        borderRadius="50%"
        border="1px solid #000000"
        bgcolor="#000000"
        width={size}
        height={size}
      />
    </button>
  );
}
