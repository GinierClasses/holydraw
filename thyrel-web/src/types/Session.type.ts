import Room, { RoomMode } from './Room.type';

type Session = {
  id: number;
  finishAt?: string;
  stepFinishAt?: string;
  createdAt: string;
  actualStep: number;
  timeDuration: number;
  roomId: number;
  albumInitiatorId?: number;
  bookState?: BookState;
  room?: Room;
  stepType: SessionStepType;
  totalPlayers: number;
  playerFinished: number;
  mode: RoomMode;
};

export enum SessionStepType {
  Start = 0,
  Draw = 1,
  Write = 2,
  Book = 3,
}

export enum BookState {
  IDLE = 0, // when album page is not show
  PENDING = 1, // when album page is show but the owner didn't start
  STARTED = 2, // when album is started
  FINISHED = 3, // when album is finished
}

export default Session;
