import { Box } from '@material-ui/core';
import { SxProps, Theme } from '@material-ui/system';

type CurrentDrawImageProps = {
  sx?: SxProps<Theme>;
  src?: string;
};

export default function CurrentDrawImage({ sx, src }: CurrentDrawImageProps) {
  return (
    <Box
      bgcolor="common.white"
      borderColor="default.main"
      borderRadius="32px"
      boxShadow={1}
      border={4}
      sx={sx}
      display="flex">
      <img src={src} alt="" />
    </Box>
  );
}
