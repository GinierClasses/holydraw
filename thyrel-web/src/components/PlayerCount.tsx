import { css } from '@emotion/css';
import Box from '../styles/Box';

type PayerCountProps = {
  countPlayer: number;
  maxPlayer: number;
};

export default function PayerCount({
  countPlayer,
  maxPlayer,
}: PayerCountProps) {
  return (
    <Box padding={8}>
      <p
        className={css({
          fontFamily: 'Work Sans',
          fontWeight: 'bold',
          fontSize: 16,
        })}>
        {countPlayer}/{maxPlayer}
      </p>
    </Box>
  );
}
