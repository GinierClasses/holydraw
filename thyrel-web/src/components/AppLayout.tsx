import { Box, Container, makeStyles } from '@material-ui/core';
import React from 'react';

type AppLayoutProps = {
  children?: React.ReactElement | React.ReactElement[];
};

const useStyles = makeStyles(theme => ({
  gameBox: {
    borderLeft: `1px solid ${theme.palette.primary.main}`,
    borderRight: `1px solid ${theme.palette.primary.main}`,
  },
  container: {
    padding: 0,
    minHeight: '100vh',
    maxWidth: `calc(${theme.breakpoints.values.lg}px - 128px)`,
  },
}));

export default function AppLayout({ children }: AppLayoutProps) {
  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth="lg">
      <Box
        bgcolor="background.default"
        display="block"
        margin="auto"
        height="100%"
        minHeight="100vh"
        width="100%"
        minWidth={320}
        className={classes.gameBox}>
        {children}
      </Box>
    </Container>
  );
}
