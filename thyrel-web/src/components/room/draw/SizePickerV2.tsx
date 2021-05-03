import { Box, Slider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

type SizePickerV2Props = {
  defaultSize: number;
  onSizeChange?: (event: any, newValue: any) => void;
};

const SizeSlider = withStyles({
  root: {
    color: '#C6C6C6',
    borderRadius: 4,
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
})(Slider);

export default function SizePickerV2({
  defaultSize,
  onSizeChange,
}: SizePickerV2Props) {
  return (
    <Box
      width={377}
      height={46}
      bgcolor="#272B31"
      borderRadius={40}
      display="flex"
      flexDirection="row"
      justifyContent="space-around"
      alignItems="center">
      <Box bgcolor="#C6C6C6" borderRadius="50%" height={8} width={8} />
      <Box width="300px">
        <SizeSlider
          aria-labelledby="continuous-slider"
          defaultValue={defaultSize}
          onChange={onSizeChange}
        />
      </Box>
      <Box bgcolor="#C6C6C6" borderRadius="50%" height={24} width={24} />
    </Box>
  );
}
