import { Box, Container } from '@material-ui/core';
import React from 'react';

type AppLayoutProps = {
  children?: React.ReactElement | React.ReactElement[];
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <Container
      sx={{
        padding: 0,
        height: '100%',
        maxWidth: theme => `calc(${theme.breakpoints.values.lg}px - 128px)`,
      }}
      maxWidth="lg">
      <Box
        display="block"
        margin="auto"
        height="100%"
        pb={{ xs: 0, sm: 2 }}
        width="100%"
        minWidth={320}>
        {children}
      </Box>
    </Container>
  );
}
