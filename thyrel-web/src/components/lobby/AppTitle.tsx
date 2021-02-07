import { css } from '@emotion/css';
import { baseColor } from '../../styles/colors';

export default function UserCard() {
  return (
    <div>
      <h1
        className={css({
          fontFamily: 'Modak',
          fontSize: 50,
          fontWeight: 'normal',
          color: '#FFFFFF',
        })}>
        Holy<span className={css({ color: baseColor })}>Draw</span>
      </h1>
    </div>
  );
}
