import { css } from '@emotion/css';
import React from 'react';
import Box from '../styles/Box';
import { baseColor, paperColor } from '../styles/colors';

type AppLayoutProps = {
  children?: React.ReactElement | React.ReactElement[];
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <Box
      bg={paperColor}
      display="block"
      margin="auto"
      width={100}
      maxWidth={1000}
      minWidth={320}
      minHeight="100vh"
      className={css({
        borderLeft: `1px solid ${baseColor}`,
        borderRight: `1px solid ${baseColor}`,
      })}>
      {children}
    </Box>
  );
}
