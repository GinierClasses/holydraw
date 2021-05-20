import Player from './Player.type';

type Room = {
  id: number;
  identifier: string;
  finishAt: string;
  createdAt: string;
  sessions: any;
  players?: Player[];
  mode: RoomMode;
};

export enum RoomMode {
  Standard = 0,
  OneWord = 1,
}

export default Room;
