import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import Routes from 'Routes';
import theme from 'theme';

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
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes />
        </ThemeProvider>
      </StyledEngineProvider>
    </SnackbarProvider>
  );
}

export default App;
