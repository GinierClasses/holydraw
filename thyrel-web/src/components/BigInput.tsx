import React, { InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { Icon, IconProps } from 'rsuite';
import {
  baseColor,
  bgColor,
  paperColor,
  disabledText,
  secondaryText,
  primaryFade,
} from '../styles/colors';
import Mq from '../styles/breakpoint';
import { css } from '@emotion/css';

type ContainerProps = {
  focus: boolean;
  disabled?: boolean;
};

const Container = styled.div<ContainerProps>(
  {
    display: 'flex',
    backgroundColor: bgColor,
    border: `1px solid ${baseColor}`,
    borderRadius: 4,
    alignItems: 'center',
    transition: 'box-shadow ease-in .2s',
    gap: 12,
    height: 40,
    padding: '4px 0 4px 8px',
    [Mq.SM]: {
      gap: 16,
      height: 48,
      padding: '8px 4px 8px 16px',
    },
  },
  ({ focus }) =>
    focus && {
      // this style is used in test
      boxShadow: `0 0 2px 0.2rem ${primaryFade(0.4)}`,
    },
  ({ disabled }) =>
    disabled && {
      backgroundColor: paperColor,
      cursor: 'not-allowed',
      borderColor: primaryFade(0.6),
    },
);

const Input = styled.input({
  backgroundColor: 'inherit',
  border: 'none',
  width: '100%',
  fontSize: 24,
  height: 34,
  fontFamily: 'Work Sans',
  color: secondaryText,
  [Mq.SM]: {
    fontSize: 32,
    height: 36,
  },
  '&:disabled': {
    color: disabledText,
  },
});

type BigInputProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: IconProps['icon'];
};

export default function BigInput({ icon, disabled, ...props }: BigInputProps) {
  const [focus, setFocus] = React.useState(false);

  return (
    <Container focus={focus} disabled={disabled}>
      {icon && (
        <Icon
          className={css({ color: disabled ? disabledText : secondaryText })}
          icon={icon}
          size="2x"
          data-testid="biginput-icon"
        />
      )}
      <Input
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        disabled={disabled}
        {...props}
      />
    </Container>
  );
}
