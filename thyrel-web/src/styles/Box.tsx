import styled from '@emotion/styled';
import { baseColor } from './colors';

// TODO : add multi
// const multi: number = 8;

/* 
Flex component
All CSS props can be applicate to this component.
List is below.
*/
type BoxType = {
  display?: 'flex' | 'none' | 'block';
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  width?: number | string;
  gap?: number;
  boxSizing?: string;
  minHeight?: number | string;
  maxHeight?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  height?: number | string;
  borderColor?: string | 'baseColor';
  className?: string;
  bg?: string;
  overflowY?: string;
  overflowX?: string;
  overflow?: string;
  boxShadow?: string;
  borderRadius?: number | string;
  borderWidth?: number;
  border?: string;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'start'
    | 'end'
    | 'left'
    | 'right';
  alignItems?:
    | 'stretch'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'baseline'
    | 'first baseline'
    | 'last baseline'
    | 'start'
    | 'end'
    | 'self-start'
    | 'self-end'
    | 'safe'
    | 'unsafe';
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch'
    | 'start'
    | 'end'
    | 'baseline'
    | 'first baseline'
    | 'last baseline'
    | 'safe'
    | 'unsafe';
  margin?: number | string;
  m?: number | string;
  mb?: number | string;
  ml?: number | string;
  mt?: number | string;
  mr?: number | string;
  padding?: number | string;
  p?: number | string;
  // padding-bottom
  pb?: number | string;
  // padding-left
  pl?: number | string;
  // padding-top
  pt?: number | string;
  // padding-right
  pr?: number | string;
};

const Box = styled.div<BoxType>(
  ({
    margin,
    m,
    mb,
    ml,
    mt,
    mr,
    padding,
    p,
    boxSizing,
    overflowY,
    overflowX,
    overflow,
    pb,
    pl,
    pt,
    pr,
    display,
    flexDirection,
    flexWrap,
    width,
    gap,
    boxShadow,
    height,
    borderColor,
    bg,
    borderRadius,
    borderWidth,
    border,
    alignContent,
    alignItems,
    maxWidth,
    minWidth,
    maxHeight,
    minHeight,
    justifyContent,
  }) => {
    const styles: any = {
      alignContent,
      maxWidth,
      minWidth,
      maxHeight,
      minHeight,
      alignItems,
      boxSizing,
      justifyContent,
      flexWrap,
      flexDirection,
      width,
      gap,
      boxShadow,
      overflowY,
      overflowX,
      overflow,
      height,
      background: bg,
      borderRadius,
      marginTop: mt,
      marginBottom: mb,
      marginRight: mr,
      marginLeft: ml,
      paddingLeft: pl,
      paddingRight: pr,
      paddingTop: pt,
      paddingBottom: pb,
    };

    // margin styles
    if (margin || m) styles.margin = margin || m;

    if (padding || p) styles.padding = padding || p;

    // border styles
    if (border) {
      styles.border = border;
    } else {
      if (borderWidth || borderColor) {
        styles.border = `${borderWidth || 1}px solid ${
          borderColor || baseColor
        }`;
      }
    }

    // display style
    styles.display = display || 'flex';

    return styles;
  },
);

Box.displayName = 'Box';

export default Box;
