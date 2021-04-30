import React from 'react';

/*
  This hook will add style with `overflow: hidden` and remove it on cleanup
*/
export function useDisableBodyOverflow() {
  const styleElement = React.useRef(document.createElement('style'));

  React.useEffect(() => {
    const currentStyle = styleElement.current;

    currentStyle.innerHTML = 'body { overflow: hidden; }';

    document.getElementsByTagName('head')[0].appendChild(currentStyle);
    return () => {
      document.getElementsByTagName('head')[0].removeChild(currentStyle);
    };
  }, []);
}
