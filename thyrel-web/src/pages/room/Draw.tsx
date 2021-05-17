import { useMediaQuery } from '@material-ui/core';
import theme from 'theme';
import DrawDesktop from 'components/room/draw/desktop/DrawDesktop';
import useMobileHorizontal from 'hooks/useMobileHorizontal';
import DrawMobileHorizontal from 'components/room/draw/DrawMobileHorizontal';
import DrawMobileVertical from 'components/room/draw/DrawMobileVertical';
import { useDisableBodyOverflow } from 'components/room/draw/useDisableBodyOverflow';

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
