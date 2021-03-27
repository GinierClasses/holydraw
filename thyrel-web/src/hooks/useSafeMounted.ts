import React from 'react';

/*
 * return function will be only called if component is currently mounted
 */
function useSafeMounted(dispatch: (...args: any[]) => any) {
  const mounted = React.useRef(false);

  React.useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return React.useCallback(
    (...args: unknown[]) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch],
  );
}

export default useSafeMounted;
