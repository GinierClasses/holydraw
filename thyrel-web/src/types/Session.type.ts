import Room from './Room.type';

type Session = {
  id: number;
  finishAt?: string;
  stepFinishAt?: string;
  createdAt: string;
  actualStep: number;
  timeDuration: number;
  roomId: number;
  room?: Room;
  stepType: SessionStepType;
  totalPlayers: number;
  playerFinished: number;
};

export enum SessionStepType {
  Start = 0,
  Draw = 1,
  Write = 2,
  Book = 3,
}

export default Session;
