import { SvgIconTypeMap } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

type DrawColorPickerProps = {
  color: string;
  isSelected: boolean;
  colorWithDisabled: string;
  onClick: () => void;
  Icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  width?: number;
};

export default function DesktopColorPicker({
  color,
  isSelected,
  colorWithDisabled,
  onClick,
  Icon,
  width,
}: DrawColorPickerProps) {
  !width ? (width = 42) : null;
  return (
    <Box
      component="button"
      key={color}
      border={2}
      m={0.5}
      p={0}
      bgcolor={colorWithDisabled}
      boxShadow={isSelected ? 4 : 0}
      borderColor={isSelected ? '#ffffff' : colorWithDisabled}
      width={width}
      height={42}
      borderRadius={width ? 21 : '50%'}
      className="cursor-pointer"
      onClick={onClick}>
      {Icon ? <Icon /> : null}
    </Box>
  );
}
