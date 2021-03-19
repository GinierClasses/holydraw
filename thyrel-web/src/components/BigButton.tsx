import styled from '@emotion/styled';
import { Button, ButtonProps, Icon, IconProps } from 'rsuite';
import { baseColor, bgFade } from '../styles/colors';
import { css } from '@emotion/css';
import React from 'react';
import Box from '../styles/Box';

type BigButtonProps = ButtonProps & {
  children?: React.ReactNode;
  icon?: IconProps['icon'];
  size?: 'md' | 'lg';
  loading?: boolean;
  onClick?: () => void;
};

const StyledButton = styled(Button)(({ size }) => ({
  height: size === 'md' ? 42 : 58,
  fontSize: size === 'md' ? 18 : 32,
  padding: '0px 16px',
  minWidth: size === 'md' ? 128 : 192,
  boxShadow: `0px 8px 1px ${bgFade(0.8)}`,
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
  loading,
  onClick,
  ...props
}: BigButtonProps) {
  return (
    <StyledButton
      onClick={onClick}
      appearance="primary"
      bg={baseColor}
      size={size}
      loading={loading}
      {...props}>
      <Box alignItems="center">
        {icon ? (
          <Icon
            icon={icon}
            size={size === 'md' ? '2x' : '3x'}
            data-testid="bigbutton-icon"
          />
        ) : null}
        <span
          className={css({
            marginLeft: icon ? 16 : undefined,
            fontWeight: 'bold',
            width: '100%',
          })}>
          {children}
        </span>
      </Box>
    </StyledButton>
  );
}
