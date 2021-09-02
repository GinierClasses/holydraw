import { Box, Typography } from '@material-ui/core';

type ReactionEmojiProps = {
  emoji: string;
  onClick: () => void;
  isSelected?: boolean;
  count?: number;
};

export default function ReactionEmoji({
  emoji,
  count,
  isSelected = false,
  onClick,
}: ReactionEmojiProps) {
  return (
    <Box
      component="button"
      sx={{
        backgroundColor: 'transparent',
        outline: 'none',
        border: 'none',
        cursor: 'pointer',
      }}
      onClick={onClick}>
      <Box
        display="flex"
        px={1}
        borderRadius="16px"
        alignItems="space-between"
        justifyContent="center"
        flexDirection="row"
        sx={{
          backgroundColor: theme => theme.palette.background.default,
          borderWidth: isSelected ? '1px' : undefined,
          borderStyle: isSelected ? 'solid' : undefined,
          borderColor: theme =>
            isSelected ? theme.palette.primary.main : undefined,
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
        }}>
        <Typography variant="subtitle1" color="textSecondary">
          {emoji} {count}
        </Typography>
      </Box>
    </Box>
  );
}
