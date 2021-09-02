import { Box, Typography } from '@material-ui/core';
import CurrentDrawImage from '../CurrentDrawImage';

type BookDrawingElementProps = {
  username?: string;
  src?: string;
};

export default function BookDrawingElement({
  username,
  src,
}: BookDrawingElementProps) {
  return (
    <Box
      display="flex"
      alignItems="flex-end"
      flexDirection="column"
      maxWidth={{ xs: '84%', sm: 'auto' }}>
      <Typography
        variant="subtitle1"
        sx={{
          textAlign: 'right',
          maxWidth: 256,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          marginRight: 2,
        }}>
        {username}
      </Typography>
      <CurrentDrawImage
        src={src}
        sx={{
          '&> img': {
            width: { xs: '100%', sm: 296 },
            height: 186,
          },
        }}
      />
    </Box>
  );
}
