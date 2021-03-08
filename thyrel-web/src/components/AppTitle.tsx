import { css } from '@emotion/css';
import { baseColor } from '../styles/colors';

export default function AppTitle() {
  return (
    <h1
      className={css({
        fontFamily: 'Modak',
        fontSize: 64,
        fontWeight: 'normal',
        textAlign: 'center',
        color: '#FFFFFF',
        width: '100%',
      })}>
      Holy<span className={css({ color: baseColor })}>Draw</span>
    </h1>
  );
}
