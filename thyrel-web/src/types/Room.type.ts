import Player from './Player.type';

type Room = {
  id: number;
  identifier: string;
  finishAt: string;
  createdAt: string;
  sessions: any;
  players?: Player[];
};

export default Room;
