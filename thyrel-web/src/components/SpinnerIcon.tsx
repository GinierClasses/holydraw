import { css } from '@emotion/css';
import { keyframes } from '@emotion/react';
import clsx from 'clsx';
import { Icon, IconProps } from 'rsuite';

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const loadingClass = css({
  animation: `${spin} 2s linear infinite`,
});

export default function SpinnerIcon(props: IconProps) {
  return (
    <Icon
      aria-label="spinner icon"
      {...props}
      className={clsx(props.className, loadingClass)}
    />
  );
}
