import { Box, makeStyles } from '@material-ui/core';

type CurrentDrawImageProps = {
  className?: string;
  src?: string;
};

const useStyles = makeStyles(theme => ({
  box: {
    borderRadius: 32,
    borderColor: theme.palette.custom.main,
    boxShadow: theme.shadows[1],
  },
}));

export default function CurrentDrawImage({
  className,
  src,
}: CurrentDrawImageProps) {
  const classes = useStyles();
  return (
    <Box
      className={classes.box}
      bgcolor="common.white"
      border={4}
      display="flex">
      <img src={src} alt="" className={className} />
    </Box>
  );
}
