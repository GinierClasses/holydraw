import { responsiveFontSizes, createMuiTheme, fade } from '@material-ui/core';
import createPalette, { Palette } from '@material-ui/core/styles/createPalette';

const PRIMARY = '#9c27b0';
const SECONDARY = '#880061';

function createBaseTheme(palette: Palette) {
  return createMuiTheme({
    palette: palette,
    typography: {
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
          padding: '4px 8px',
          borderRadius: 6,
        },
        contained: {
          height: 42,
          padding: '4px 8px',
          fontSize: 18,
          fontFamily: 'Work Sans',
          backgroundColor: palette.divider,
          boxShadow: `0px 8px 1px ${fade('#000000', 0.8)}`,
          position: 'relative',
          '&:hover': {
            backgroundColor: palette.action.hover,

            boxShadow: `0px 8px 1px ${fade('#000000', 0.8)}`,
          },
          '&:focus': {
            boxShadow: `0px 8px 1px ${fade('#000000', 0.8)}`,
          },
          '&:active': {
            top: 8,
            boxShadow: 'none',
          },
        },
        containedSizeLarge: {
          height: 58,
          padding: '8px 16px',
          fontSize: 32,
        },
      },
      MuiOutlinedInput: {
        root: {
          borderRadius: 4,
          backgroundColor: palette.background.default,
          '&:hover': {
            borderColor: palette.primary.dark,
          },
          '&:hover $notchedOutline': {
            borderColor: palette.primary.dark,
            boxShadow: `${fade(palette.primary.dark, 0.125)} 0 0 0 1px`,
          },
          '&:focus $notchedOutline': {
            borderColor: palette.primary.main,
            boxShadow: `${fade(palette.primary.main, 0.25)} 0 0 0 2px`,
          },
        },
        focused: {},
      },
      MuiSwitch: {
        root: {
          width: 54,
          height: 26,
          padding: 0,
          margin: 8,
        },
        switchBase: {
          padding: 1,
          '&$checked': {
            transform: 'translateX(28px)',
            '& + $track': {
              backgroundColor: fade(palette.primary.light, 0.4),
              opacity: 1,
              border: 'none',
            },
          },
        },
        colorPrimary: {
          '&$checked': {
            '& + $track': {
              backgroundColor: fade(palette.primary.light, 0.4),
              border: `none`,
              opacity: 1,
            },
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 26 / 2,
          border: `none`,
          backgroundColor: fade(palette.divider, 0.4),
          opacity: 1,
        },
        checked: {},
      },
    },

    props: {
      MuiButtonBase: {
        // The default props to change
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
    warning: {
      main: '#cd6133',
    },
    error: {
      light: '##ef9a9a',
      main: '#ce667a',
      dark: '#af0025',
      contrastText: '#7e7e7e',
    },
    background: {
      default: '#0f131a',
      paper: '#1a1d24',
    },
  }),
);

theme = responsiveFontSizes(theme);
export default theme;
