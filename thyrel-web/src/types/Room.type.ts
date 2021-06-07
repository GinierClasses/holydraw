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

export type InfoRoomModeProps = {
  title: string;
  description: string;
};

export const roomModeInformations: Record<RoomMode, InfoRoomModeProps> = {
  [RoomMode.Standard]: {
    title: 'Standard',
    description: 'A simple mode where you draw and guess.',
  },
  [RoomMode.OneWord]: {
    title: 'OneWord',
    description: 'As Standard Mode but with only one word.',
  },
};

export default Room;
