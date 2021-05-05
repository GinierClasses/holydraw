import { Box, Slider, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

type SizePickerV2Props = {
  size: number;
  onSizeChange?: (event: any, newValue: any) => void;
  orientation?: 'vertical' | 'horizontal';
};

const SizeSlider = withStyles({
  root: {
    color: '#C6C6C6',
    borderRadius: 4,
    height: 8,
    width: 300,
  },
  thumb: {
    height: 16,
    width: 16,
    backgroundColor: '#C6C6C6',
    marginTop: -4,
    marginLeft: -8,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
  vertical: {
    // important because width is overide by default vertical class
    width: '8px !important',
    '& .$MuiSlider-rail': {
      width: 8,
    },
    '& .$MuiSlider-track': {
      width: 8,
    },
    '& .$MuiSlider-thumb': {
      marginLeft: '-4.15px',
    },
  },
})(Slider);

interface Props {
  children: React.ReactElement;
  open: boolean;
  value: number;
}

function ValueLabelComponent(props: Props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

export default function SizePickerV2({
  size,
  onSizeChange,
  orientation = 'vertical',
}: SizePickerV2Props) {
  const isVertical = orientation === 'vertical';
  return (
    <Box
      p={2}
      bgcolor="#272B31"
      borderRadius={40}
      display="flex"
      flexDirection={isVertical ? 'column' : 'row'}
      justifyContent={isVertical ? 'center' : 'space-around'}
      alignItems="center">
      <Box
        bgcolor="#C6C6C6"
        mr={isVertical ? 0 : 2}
        mb={isVertical ? 2 : 0}
        borderRadius="50%"
        height={8}
        width={8}
      />
      <SizeSlider
        step={2}
        min={2}
        style={isVertical ? { height: 300 } : { width: 300 }}
        max={60}
        aria-labelledby="size-picker-slider"
        orientation={orientation}
        value={size}
        onChange={onSizeChange}
        ValueLabelComponent={ValueLabelComponent}
      />
      <Box
        bgcolor="#C6C6C6"
        ml={isVertical ? 0 : 2}
        mt={isVertical ? 2 : 0}
        borderRadius="50%"
        height={24}
        width={24}
      />
    </Box>
  );
}
