import React from 'react';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { IconProps } from 'rsuite';
import { baseColor, bgColor } from '../../styles/colors';

type BigInputProps = {
  icon?: IconProps['icon'];
  placeholder?: string;
};

const Container = styled.div<{ focus: boolean }>(
  {
    display: 'flex',
    backgroundColor: bgColor,
    border: `1px solid ${baseColor}`,
    height: 48,
    borderRadius: 4,
    padding: 8,
    '&:focus': {
      background: 'red',
    },
  },
  ({ focus }) => focus && {},
);

const Input = styled.input({
  display: 'flex',
  backgroundColor: 'inherit',
  border: 'none',
  width: '100%',
  fontSize: 32,
  fontFamily: 'Work Sans',
});

export default function BigInput({ icon, ...props }: BigInputProps) {
  const [focus, setFocus] = React.useState(false);

  return (
    <Container focus={focus}>
      <Input onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} />
    </Container>
  );
}
