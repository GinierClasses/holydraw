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
      border={4}
      borderColor="secondary.main"
      boxShadow={1}
      display="flex">
      <img src={src} alt="" className={className} />
    </Box>
  );
}
