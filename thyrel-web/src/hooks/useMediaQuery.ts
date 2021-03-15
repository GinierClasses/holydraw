import React from 'react';
import { MediaQuery } from './../styles/breakpoint';

const Mq: Record<MediaQuery, string> = {
  XS: '(min-width: 0px)',
  SM: '(min-width: 600px)',
  MD: '(min-width: 960px)',
  LG: '(min-width: 1280px)',
  XL: '(min-width: 1920px)',
};

/*
  return true if query match and false else
*/
export function useMediaQuery(query: MediaQuery) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(Mq[query]);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}
