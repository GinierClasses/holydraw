import Room from './Room.type';
import Token from './Token.type';

type NewReaction = {
  playerId: number;
  elementId: number;
  emojiReaction: Emojis;
};

export default NewReaction;
