import { css } from '@emotion/css';
import { CSSInterpolation } from '@emotion/serialize';
import { Theme, useTheme } from '@material-ui/system';

// To pass in material-ui v5
export default function useCss(callback: (theme: Theme) => CSSInterpolation) {
  const theme = useTheme();

  return css(callback(theme));
}
