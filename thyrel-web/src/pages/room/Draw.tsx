import { useMediaQuery } from '@material-ui/core';
import DrawDesktop from 'components/room/draw/desktop/DrawDesktop';
import DrawMobileHorizontal from 'components/room/draw/mobile/horizontal/DrawMobileHorizontal';
import DrawMobileVertical from 'components/room/draw/mobile/vertical/DrawMobileVertical';
import { useDisableBodyOverflow } from 'components/room/draw/useDisableBodyOverflow';
import useMobileHorizontal from 'hooks/useMobileHorizontal';
import theme from 'theme';

export default function Draw() {
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  useDisableBodyOverflow();

  if (isDesktop) {
    return <DrawDesktop />;
  }
  return <DrawMobile />;
}

function DrawMobile() {
  const isHorizontal = useMobileHorizontal();

  if (isHorizontal) {
    return <DrawMobileHorizontal />;
  }
  return <DrawMobileVertical />;
}
