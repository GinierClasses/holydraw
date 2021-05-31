import { Box, makeStyles } from '@material-ui/core';
import Popper from '@material-ui/core/Popper';
import ReactionEmoji from './ReactionEmoji';
import { EmojiMapping } from 'types/Reaction.type';

type BookPopperProps = {
  anchorEl: null;
  onClick: (emj: number) => void;
};

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function BookPopper({ onClick, anchorEl }: BookPopperProps) {
  const classes = useStyles();
  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;
  return (
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
        {Object.keys(EmojiMapping).map(emjKey => {
          const x = Number(emjKey) as keyof typeof EmojiMapping;
          return (
            <ReactionEmoji
              emoji={EmojiMapping[x]}
              onClick={() => onClick(Number(emjKey))}
            />
          );
        })}
      </Box>
    </Popper>
  );
}
