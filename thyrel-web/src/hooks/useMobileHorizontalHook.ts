import React from 'react';

export default function useMobileHorizontalHook() {
  const [isHorizontal, setIsHorizontal] = React.useState(false);

  React.useEffect(() => {
    function onOrientationChange() {
      if (
        window.screen.orientation.angle === 90 ||
        window.screen.orientation.angle === -90
      ) {
        setIsHorizontal(true);
        return;
      }
      setIsHorizontal(false);
    }

    window.addEventListener('orientationchange', onOrientationChange);
    return () =>
      window.removeEventListener('orientationchange', onOrientationChange);
  }, []);

  return isHorizontal;
}
