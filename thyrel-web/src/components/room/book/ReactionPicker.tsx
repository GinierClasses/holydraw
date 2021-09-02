import { Box } from '@material-ui/core';
import React from 'react';
import { EmojiMapping, getEmoji } from 'types/Reaction.type';
import BookAddReaction from './BookAddReaction';
import BookPopper from './BookPopper';
import ReactionEmoji from './ReactionEmoji';

type Reaction = {
  emojiId: number;
  count: number;
  isSelected: boolean;
};

type ReactionPickerProps = {
  reactions: Reaction[];
  onClick: (emj: number) => void;
};

export default function ReactionPicker({
  onClick,
  reactions,
}: ReactionPickerProps) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event: any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  return (
    <>
      <BookPopper anchorEl={anchorEl} onClick={onClick} />
      <Box
        display="flex"
        p={0.5}
        borderRadius="24px"
        alignItems="space-between"
        justifyContent="center"
        flexDirection="row"
        bgcolor="background.paper">
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
