import Box from '../styles/Box';
import Spinner from '../images/spinner.svg';

export default function Loading() {
  return (
    <Box justifyContent="center" alignItems="center">
      <img src={Spinner} alt="loading" />
    </Box>
  );
}
