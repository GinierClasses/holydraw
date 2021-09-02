import { Avatar, Box, Typography } from '@material-ui/core';

type BookSentenceElementProps = {
  username?: string;
  children?: string;
  avatarUrl?: string;
};

export default function BookSentenceElement({
  username,
  children,
  avatarUrl,
}: BookSentenceElementProps) {
  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="subtitle1">{username}</Typography>
      <Box
        display="flex"
        flexDirection="row"
        p={0.5}
        width={320}
        sx={{
          backgroundColor: theme => theme.palette.default.main,
          borderRadius: 20,
          border: 'none',
        }}>
        <Avatar
          src={avatarUrl}
          sx={{
            width: 32,
            height: 32,
            backgroundColor: theme => theme.palette.primary.dark,
            overflow: 'visible',
            boxShadow: theme => theme.shadows[2],
            '&> img': {
              height: 26,
              width: 'auto',
              margin: 'auto',
              position: 'unset',
            },
          }}
        />
        <Box ml={1} mr={1} alignSelf="center">
          <Typography variant="body1">{children}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
