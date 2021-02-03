import styled from '@emotion/styled';
import { baseColor } from './colors';

// TODO : add multi
// const multi: number = 8;

type BoxType = {
  display?: 'flex';
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  width?: number | string;
  height?: number | string;
  borderColor?: string | 'baseColor';
  className?: string;
  borderRadius?: number;
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
  pb?: number | string;
  pl?: number | string;
  pt?: number | string;
  pr?: number | string;
};

const Box = styled.div<BoxType>(
  ({ display, width, height }) => ({
    display: display || 'flex',
    width: width || 'auto',
    height: height || 'auto',
  }),
  ({ alignContent }) =>
    alignContent && {
      alignContent: alignContent,
    },
  ({ alignItems }) =>
    alignItems && {
      alignItems: alignItems,
    },
  ({ justifyContent }) =>
    justifyContent && {
      justifyContent: justifyContent,
    },
  ({ flexWrap }) =>
    flexWrap && {
      flexWrap: flexWrap,
    },
  ({ flexDirection }) =>
    flexDirection && {
      flexDirection: flexDirection,
    },
  ({ margin, m }) =>
    (margin || m) && {
      margin: margin || m || 0,
    },
  ({ padding, p }) =>
    (padding || p) && {
      padding: padding || p || 0,
    },
  ({ pl }) =>
    pl && {
      paddingLeft: pl,
    },
  ({ pr }) =>
    pr && {
      paddingRight: pr,
    },
  ({ pt }) =>
    pt && {
      paddingTop: pt,
    },
  ({ pb }) =>
    pb && {
      paddingBottom: pb,
    },
  ({ ml }) =>
    ml && {
      marginLeft: ml,
    },
  ({ mb }) =>
    mb && {
      marginBottom: mb,
    },
  ({ mt }) =>
    mt && {
      marginTop: mt,
    },
  ({ borderRadius }) =>
    borderRadius && {
      borderRadius: `${borderRadius}px`,
    },
  ({ border, borderWidth, borderColor }) =>
    border
      ? {
          border,
        }
      : (borderWidth || borderColor) && {
          border: `${borderWidth || 1}px solid ${borderColor || baseColor}`,
        },
  ({ mr }) =>
    mr && {
      marginRight: mr,
    },
);

export default Box;
