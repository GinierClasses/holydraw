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
          height: 20,
        },
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
        contained: {
          height: 68,
          minWidth: 128,
          fontSize: 24,
          color: palette.common.white,
          padding: '18px 24px',
          borderRadius: 34,
          fontFamily: 'Work Sans',
          backgroundColor: palette.custom.main,
          position: 'relative',
          '@media (min-width: 600px)': {
            fontSize: 28,
            height: 72,
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

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    custom: {
      main: string;
    };
  }

  interface PaletteOptions {
    custom: {
      main: string;
    };
  }
}

const theme = responsiveFontSizes(
  createBaseTheme(
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
      custom: {
        main: '#272B31',
      },
    }),
  ),
);

export default theme;
