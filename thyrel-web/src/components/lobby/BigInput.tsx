import React from 'react';
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { Icon, IconProps } from 'rsuite';
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
    alignItems: 'center',
    transition: 'box-shadow ease-in .2s',
    gap: 8,
  },
  ({ focus }) =>
    focus && {
      boxShadow: '0 0 2px 0.2rem rgba(136, 0, 97, 0.4)',
    },
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
  const [focus, setFocus] = React.useState(true);
  console.log(focus);
  return (
    <Container focus={focus}>
      {icon && <Icon icon={icon} size="2x" />}
      <Input onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} />
    </Container>
  );
}
