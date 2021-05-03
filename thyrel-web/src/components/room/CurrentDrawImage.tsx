import { Box } from '@material-ui/core';

type CurrentDrawImageProps = {
  className?: string;
  src?: string;
};

export default function CurrentDrawImage({
  className,
  src,
}: CurrentDrawImageProps) {
  return (
    <Box
      bgcolor="common.white"
      borderColor="custom.main"
      borderRadius={32}
      boxShadow={1}
      border={4}
      display="flex">
      <img src={src} alt="" className={className} />
    </Box>
  );
}
