import { Box } from '@material-ui/core';
import { useSessionContext } from 'hooks/SessionProvider';

export default function CurrentDrawImage() {
  const { currentElement } = useSessionContext();
  return (
    <Box
      bgcolor="common.white"
      border={4}
      borderColor="secondary.main"
      boxShadow={1}>
      <img src={currentElement?.parent.drawImage} alt="" width={512} />
    </Box>
  );
}
