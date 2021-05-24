import { useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react';

export default function useMobileHorizontal() {
  const [isHorizontal, setIsHorizontal] = React.useState(false);
  const theme = useTheme();
  const isValidForHorizontal = useMediaQuery(theme.breakpoints.down('sm'));

  React.useEffect(() => {
    function onOrientationChange() {
      const isSafari =
        navigator.vendor.match(/apple/i) &&
        !navigator.userAgent.match(/crios/i) &&
        !navigator.userAgent.match(/fxios/i);

      const angle = isSafari
        ? window.orientation
        : window.screen.orientation.angle;
      if (angle === 90 || angle === -90) {
        setIsHorizontal(true);
        return;
      }
      setIsHorizontal(false);
    }

    onOrientationChange();
    window.addEventListener('orientationchange', onOrientationChange);
    return () =>
      window.removeEventListener('orientationchange', onOrientationChange);
  }, []);

  return isHorizontal && isValidForHorizontal;
}
