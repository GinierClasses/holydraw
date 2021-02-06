import styled from '@emotion/styled';
import { Button, Icon, IconProps } from 'rsuite';
import { baseColor } from '../styles/colors';
import { css } from '@emotion/css';
import React from 'react';
import Box from '../styles/Box';

type BigButtonProps = {
  children?: React.ReactNode;
  icon?: IconProps['icon'];
  size?: 'md' | 'lg';
  onClick?: () => void;
};

const StyledButton = styled(Button)(({ size }) => ({
  height: size === 'md' ? 32 : size === 'lg' ? 58 : undefined,
  fontSize: size === 'md' ? 16 : size === 'lg' ? 32 : undefined,
  padding: '8px 16px',
  minWidth: 196,
  boxShadow: '0px 8px 1px rgba(0, 0, 0, 0.5)',
  position: 'relative',
  '&:active': {
    top: 8,
    boxShadow: 'none',
  },
}));

export default function BigButton({
  children,
  icon,
  size,
  onClick,
}: BigButtonProps) {
  return (
    <StyledButton
      onClick={onClick}
      appearance="primary"
      bg={baseColor}
      size={size}>
      <Box alignItems="center">
        {icon ? <Icon icon={icon} size={size === 'md' ? '2x' : '3x'} /> : null}
        <span
          className={css({
            marginLeft: 8,
            fontWeight: 'bold',
            width: '100%',
          })}>
          {children}
        </span>
      </Box>
    </StyledButton>
  );
}
