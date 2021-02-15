import { css } from '@emotion/css';
import React from 'react';
import Box from '../../styles/Box';
import { baseColor, paperColor } from '../../styles/colors';

type AppLayoutProps = {
  children?: React.ReactElement;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <Box
      bg={paperColor}
      margin="auto"
      maxWidth={1000}
      minWidth={320}
      minHeight="100vh"
      className={css({
        borderLeft: `1px solid ${baseColor}`,
        borderRight: `1px solid ${baseColor}`,
        width: '100%',
        maxWidth: '1000px',
        minWidth: '320px',
      })}>
      {children}
    </Box>
  );
}
