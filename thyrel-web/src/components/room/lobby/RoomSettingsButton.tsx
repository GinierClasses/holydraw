import { Box, Button, Tooltip, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { defaultColorSx } from 'utils/@material-ui-v5-migration';

type RoomSettingsSelectorProps = {
  value: string;
  title: string;
  description: string;
  onClick?: () => void;
};

export default function RoomSettingsSelector({
  value,
  title,
  description,
  onClick,
}: RoomSettingsSelectorProps) {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      width="100%">
      <Typography variant="body1">{title}:</Typography>
      <Button
        endIcon={
          <Tooltip title={description}>
            <InfoIcon />
          </Tooltip>
        }
        variant="contained"
        size="small"
        sx={defaultColorSx}
        onClick={onClick}>
        {value}
      </Button>
    </Box>
  );
}
