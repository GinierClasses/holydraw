import { CssBaseline, ThemeProvider } from '@material-ui/core';
import theme from './theme';
import Routes from './Routes';
import { SnackbarProvider } from 'notistack';

/*
 * Entry point for our App
 * Do not add Logic here
 */
function App() {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      preventDuplicate
      maxSnack={3}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
