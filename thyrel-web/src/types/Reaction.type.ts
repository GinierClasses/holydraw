import HolyElement from './HolyElement.type';
import Player from './Player.type';

export const EmojiMapping = {
  0: '😓',
  1: '😅',
  2: '😐',
  3: '😂',
  4: '🤣',
};

export type EmojiMappingKeyType = keyof typeof EmojiMapping;

enum Emojis {
  Horrible = 0,
  Bad = 1,
  Normal = 2,
  Great = 3,
  Perfect = 4,
}

type Reaction = {
  id: number;
  playerId?: number;
  elementId?: number;
  emoji?: Emojis;
  player?: Player;
  element?: HolyElement;
};

export function getEmoji(number: EmojiMappingKeyType) {
  return EmojiMapping[number];
}

export default Reaction;
