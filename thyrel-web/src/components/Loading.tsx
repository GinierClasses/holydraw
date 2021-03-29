import { Box } from '@material-ui/core';
import Spinner from '../images/spinner.svg';

export default function Loading() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <img src={Spinner} alt="loading" />
    </Box>
  );
}
