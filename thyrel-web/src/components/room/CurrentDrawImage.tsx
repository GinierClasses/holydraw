import { Box } from '@material-ui/core';
import { useSessionContext } from 'hooks/SessionProvider';

type CurrentDrawImageProps = {
  className?: string;
};

export default function CurrentDrawImage({ className }: CurrentDrawImageProps) {
  const { currentElement } = useSessionContext();
  return (
    <Box
      bgcolor="common.white"
      border={4}
      borderColor="secondary.main"
      boxShadow={1}>
      <img
        src={currentElement?.parent.drawImage}
        alt=""
        className={className}
      />
    </Box>
  );
}
