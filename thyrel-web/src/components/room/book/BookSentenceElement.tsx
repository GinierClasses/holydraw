import { Box, makeStyles, Avatar, Typography } from '@material-ui/core';

type BookSentenceElementProps = {
  username?: string;
  sentence?: string;
  avatarUrl?: string;
};

const useStyles = makeStyles(theme => ({
  avatar: {
    width: 32,
    height: 32,
    backgroundColor: theme.palette.primary.dark,
    border: `1px solid ${theme.palette.primary.dark}`,
    overflow: 'visible',
    '&> img': {
      height: 32,
      width: 'auto',
      margin: 'auto',
      position: 'unset',
    },
  },
}));

export default function BookSentenceElement({
  username,
  sentence,
  avatarUrl,
}: BookSentenceElementProps) {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="subtitle1">{username}</Typography>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        p={1}
        border={1}
        borderColor="primary.main"
        borderRadius={4}
        maxWidth={336}>
        <Avatar src={avatarUrl} className={classes.avatar} />
        <Box ml={1} mr={1}>
          <Typography variant="body1">{sentence}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
