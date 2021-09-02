import { Box } from '@material-ui/core';
import Popper from '@material-ui/core/Popper';
import { EmojiMapping, EmojiMappingKeyType } from 'types/Reaction.type';
import ReactionEmoji from './ReactionEmoji';

type BookPopperProps = {
  anchorEl: null;
  onClick: (emj: EmojiMappingKeyType) => void;
};

export default function BookPopper({ onClick, anchorEl }: BookPopperProps) {
  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;
  return (
    <Popper
      id={id}
      open={open}
      anchorEl={anchorEl}
      placement="top"
      disablePortal={false}
      modifiers={[
        {
          name: 'flip',
          enabled: false,
        },
        {
          name: 'preventOverflow',
          enabled: false,
        },
        {
          name: 'arrow',
          enabled: false,
        },
      ]}>
      <Box
        display="flex"
        p={0.5}
        borderRadius="16px"
        alignItems="space-between"
        justifyContent="center"
        flexDirection="row"
        bgcolor="background.default">
        {Object.keys(EmojiMapping).map(emjKey => {
          const MappingKey = Number(emjKey) as keyof typeof EmojiMapping;
          return (
            <ReactionEmoji
              emoji={EmojiMapping[MappingKey]}
              onClick={() => onClick(MappingKey)}
            />
          );
        })}
      </Box>
    </Popper>
  );
}
