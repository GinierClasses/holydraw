import { Box } from '@material-ui/core';

type BookSentenceElementProps = {
  username?: string;
  sentence?: string;
  avatarUrl?: string;
};

export default function BookSentenceElement({
  username,
  sentence,
  avatarUrl,
}: BookSentenceElementProps) {
  return <Box>Hey</Box>;
}
