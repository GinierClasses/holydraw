import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import BookPopper from './BookPopper';
import ReactionEmoji from './ReactionEmoji';
import BookAddReaction from './BookAddReaction';
import { EmojiMapping, getEmoji } from 'types/Reaction.type';

type Reaction = {
  emojiId: number;
  count: number;
  isSelected: boolean;
};

type ReactionPickerProps = {
  reactions: Reaction[];
  onClick: (emj: number) => void;
};

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ReactionPicker({
  onClick,
  reactions,
}: ReactionPickerProps) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event: any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  return (
    <>
      <BookPopper anchorEl={anchorEl} onClick={onClick} />
      <Box
        display="flex"
        borderRadius={24}
        alignItems="space-between"
        justifyContent="center"
        flexDirection="row"
        className={classes.container}>
        <BookAddReaction onClick={handleClick} />
        {reactions.map(reaction => {
          const MappingKey = reaction.emojiId as keyof typeof EmojiMapping;
          if (reaction.count === 0) return null;
          return (
            <ReactionEmoji
              emoji={getEmoji(MappingKey)}
              count={reaction.count}
              isSelected={reaction.isSelected}
              onClick={() => onClick(reaction.emojiId)}
            />
          );
        })}
      </Box>
    </>
  );
}
