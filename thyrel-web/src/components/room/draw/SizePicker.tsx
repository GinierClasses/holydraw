import { Box, makeStyles, Theme } from '@material-ui/core';
import { bgFade, primaryFade } from 'styles/colors';

type SizePickerProps = {
  currentSize: number;
  onSizeChange: (size: number) => void;
};

const buttonSizes = [4, 8, 16, 20, 24, 30];

export default function SizePicker({
  currentSize,
  onSizeChange,
}: SizePickerProps) {
  return (
    <Box
      padding={1}
      gridGap={8}
      bgcolor={primaryFade(0.2)}
      display="flex"
      borderRadius={4}
      border={1}
      borderColor="#000000"
      alignItems="center"
      boxShadow={`0px 0px 4px ${bgFade(0.8)}`}>
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

const useStyles = makeStyles<Theme, { isCurrentSize: boolean }>(() => ({
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
      props.isCurrentSize ? `0 0 0 2px ${primaryFade(0.8)}` : 'none',
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
