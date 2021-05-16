import { Box, Container, makeStyles } from '@material-ui/core';
import React from 'react';

type AppLayoutProps = {
  children?: React.ReactElement | React.ReactElement[];
};

const useStyles = makeStyles(theme => ({
  container: {
    padding: 0,
    height: '100%',
    maxWidth: `calc(${theme.breakpoints.values.lg}px - 128px)`,
  },
}));

export default function AppLayout({ children }: AppLayoutProps) {
  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth="lg">
      <Box
        display="block"
        margin="auto"
        height="100%"
        pb={{ xs: 1, sm: 2, md: 3 }}
        width="100%"
        minWidth={320}>
        {children}
      </Box>
    </Container>
  );
}
