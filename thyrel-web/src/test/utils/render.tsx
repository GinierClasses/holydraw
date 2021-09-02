import { StyledEngineProvider, ThemeProvider } from '@material-ui/core';
import { render, RenderResult } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import theme from 'theme';

const mockEnqueue = jest.fn();

const WrapperApp = ({ children }: PropsWithChildren<{}>) => (
  // <SnackbarProvider
  //   anchorOrigin={{
  //     vertical: 'top',
  //     horizontal: 'right',
  //   }}
  //   preventDuplicate
  //   maxSnack={3}>
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </StyledEngineProvider>
  // </SnackbarProvider>
);

const renderWithApp = (
  ui: React.ReactElement,
  { route, ...options }: { route?: string } = {},
) => {
  mockEnqueue.mockClear();
  if (route) window.history.pushState({}, 'Test page', route);

  // const Wrapper = ({ children }: PropsWithChildren<{}>) => (
  //   <WrapperApp>{children}</WrapperApp>
  // );

  const renderReturn: RenderResult = render(ui, {
    wrapper: WrapperApp,
    ...options,
  });

  return { ...renderReturn, mockEnqueue };
};

export { renderWithApp };
