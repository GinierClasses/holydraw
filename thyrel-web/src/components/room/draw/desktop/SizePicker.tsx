import { alpha, Box, useTheme } from '@material-ui/core';

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
      gap={8}
      bgcolor={alpha(theme.palette.primary.main, 0.2)}
      display="flex"
      borderRadius="4px"
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

function SizePickerPoint({
  onSizeChange,
  size,
  isCurrentSize,
}: {
  onSizeChange: (size: number) => void;
  size: number;
  isCurrentSize: boolean;
}) {
  return (
    <Box
      component="button"
      onClick={() => onSizeChange(size)}
      sx={{
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
        boxShadow: theme =>
          isCurrentSize
            ? `0 0 .2px 2px ${alpha(theme.palette.primary.main, 0.8)}`
            : 'none',
      }}>
      <Box
        borderRadius="50%"
        border="1px solid #000000"
        bgcolor="#000000"
        width={size}
        height={size}
      />
    </Box>
  );
}
