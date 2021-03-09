import Room from './Room.type';
import Token from './Token.type';

type Player = {
  id: number;
  username: string;
  avatarUrl: string;
  isOwner: boolean;
  isPlaying: boolean;
  disableAt?: string;
  createdAt: string;
  roomId?: number;
  room?: Room;
  token?: Token;
};

export default Player;
