import { Theme } from '@material-ui/core';
import { SxProps } from '@material-ui/system';

/*
  File for the migration
  Many feathure was removed so I search a way to get the previous feathure back
*/
export const defaultColorSx: SxProps<Theme> = {
  color: theme => theme.palette.text.primary,
  bgcolor: theme => theme.palette.default.main,
  '&:hover': {
    bgcolor: theme => theme.palette.default.hover,
  },
};
