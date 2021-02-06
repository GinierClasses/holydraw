import { css } from '@emotion/css';
import { baseColor } from '../../styles/colors';

export default function UserCard() {
  return (
    <div>
      <p
        className={css({
          fontFamily: 'Modak',
          fontSize: 50,
        })}>
        <span className={css({ color: '#FFFFFF' })}>Holy</span>
        <span className={css({ color: baseColor })}>Draw</span>
      </p>
    </div>
  );
}
