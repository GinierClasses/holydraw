import React from 'react';
import Popper from '@material-ui/core/Popper';
import { Box, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ReactionEmoji from './ReactionEmoji';

type ReactionPickerProps = {
  emoji?: number;
  count?: number;
  onClick?: (emoji: number) => void;
};

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    backgroundColor: 'transparent',
    outline: 'none',
    border: 'none',
    paddingRight: 4,
  },
}));

const emojiList = ['😓', '😅', '😐', '😂', '🤣'];

export default function ReactionPicker({
  emoji,
  count,
  onClick,
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
          {emojiList.map((emj, index) => {
            return (
              <button
                className={classes.button}
                onClick={() => onClick?.(index)}>
                <ReactionEmoji emoji={index} />
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
        {/* <ReactionEmoji emoji={1} count={6} /> */}
      </Box>
    </Box>
  );
}
