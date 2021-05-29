import React from 'react';
import Popper from '@material-ui/core/Popper';
import { Box, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ReactionEmoji from './ReactionEmoji';
import { EmojiMapping } from 'types/Reaction.type';

type Reaction = {
  emoji: string;
  count: number;
  isSelected: boolean;
};

type ReactionPickerProps = {
  reactions: Reaction[];
  onClick?: (emoji: string) => void;
};

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    backgroundColor: 'transparent',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
  },
}));

const reactionsExample: Reaction[] = [
  { emoji: '😓', count: 6, isSelected: false },
];

export default function ReactionPicker({
  onClick,
  reactions,
}: ReactionPickerProps) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;

  return (
    <Box>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="top"
        disablePortal={false}
        modifiers={{
          flip: {
            enabled: false,
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: 'window',
          },
          arrow: {
            enabled: false,
          },
        }}>
        <Box
          display="flex"
          p={0.5}
          borderRadius={16}
          alignItems="space-between"
          justifyContent="center"
          flexDirection="row"
          className={classes.container}>
          {Object.keys(EmojiMapping).map(emjNum => {
            return (
              <button
                className={classes.button}
                onClick={() => onClick?.(emjNum)}>
                <ReactionEmoji emoji={EmojiMapping[1]} />
              </button>
            );
          })}
        </Box>
      </Popper>
      <Box
        display="flex"
        p={0.5}
        borderRadius={16}
        alignItems="space-between"
        justifyContent="center"
        flexDirection="row"
        className={classes.container}>
        <Box display="flex" flexDirection="column">
          <button className={classes.button} onClick={handleClick}>
            <Box
              display="flex"
              maxWidth={24}
              borderRadius="50%"
              alignItems="center"
              justifyContent="center"
              bgcolor="background.default">
              <AddIcon />
            </Box>
          </button>
        </Box>
        {reactions.map(reaction => {
          if (reaction.count > 0) {
            return (
              <button
                className={classes.button}
                onClick={() => onClick?.(reaction.emoji)}>
                <ReactionEmoji emoji={reaction.emoji} count={reaction.count} />
              </button>
            );
          }
        })}
      </Box>
    </Box>
  );
}
