import { responsiveFontSizes, createMuiTheme } from '@material-ui/core';
import createPalette, { Palette } from '@material-ui/core/styles/createPalette';

export const PRIMARY = '#880061';
export const SECONDARY = '#9c27b0';

function createBaseTheme(palette: Palette) {
  return createMuiTheme({
    palette: palette,
    typography: {
      h1: {
        fontSize: 64,
        fontFamily: 'Modak',
      },
      h4: {
        fontFamily: 'Work Sans',
        fontWeight: 'bold',
        fontSize: 32,
      },
      h5: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, Segoe UI',
      },
      subtitle1: {
        fontFamily: 'Work Sans',
        fontWeight: 'bold',
        fontSize: 16,
      },
      subtitle2: {
        fontSize: 12,
      },
      body1: {
        fontSize: 16,
      },
      body2: {
        fontSize: 14,
      },
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Open Sans',
        'Helvetica Neue',
        'sans-serif',
      ].join(','),
    },
    spacing: 8,
    overrides: {
      MuiButton: {
        label: {
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        },
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
        contained: {
          height: 64,
          minWidth: 128,
          fontSize: 24,
          color: palette.common.white,
          padding: '18px 24px',
          borderRadius: 32,
          fontFamily: 'Work Sans',
          backgroundColor: palette.action.active,
          position: 'relative',
          '@media (min-width: 600px)': {
            fontSize: 28,
            height: 70,
            borderRadius: 35,
          },
          '&:hover': {
            backgroundColor: palette.action.hover,
          },
        },
        containedSizeLarge: {
          fontSize: 32,
          height: 78,
          borderRadius: 38,
          '@media (min-width: 600px)': {
            fontSize: 36,
            height: 82,
            borderRadius: 40,
          },
        },
        iconSizeLarge: {
          marginLeft: 0,
        },
      },
    },
  });
}

let theme = createBaseTheme(
  createPalette({
    type: 'dark',
    primary: {
      main: PRIMARY,
    },
    secondary: {
      main: SECONDARY,
    },
    background: {
      default: '#0f131a',
      paper: '#1a1d24',
    },
    action: {
      active: '#272B31',
    },
  }),
);

theme = responsiveFontSizes(theme);

export default theme;
