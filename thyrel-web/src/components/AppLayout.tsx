import { Box, Container, makeStyles } from '@material-ui/core';
import React from 'react';

type AppLayoutProps = {
  children?: React.ReactElement | React.ReactElement[];
};

const useStyles = makeStyles(theme => ({
  container: {
    borderLeft: `1px solid ${theme.palette.secondary.main}`,
    borderRight: `1px solid ${theme.palette.secondary.main}`,
  },
}));

export default function AppLayout({ children }: AppLayoutProps) {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Box
        bgcolor="background.paper"
        display="block"
        margin="auto"
        width="100%"
        minWidth={320}
        minHeight="100vh"
        className={classes.container}>
        {children}
      </Box>
    </Container>
  );
}
