import { css } from '@emotion/css';
import Box from '../../styles/Box';

type PlayerCountProps = {
  count: number;
  max: number;
};

export default function PlayerCount({ count, max }: PlayerCountProps) {
  return (
    <Box padding={8}>
      <p
        className={css({
          fontFamily: 'Work Sans',
          fontWeight: 'bold',
          fontSize: 16,
        })}>
        {count}/{max}
      </p>
    </Box>
  );
}
