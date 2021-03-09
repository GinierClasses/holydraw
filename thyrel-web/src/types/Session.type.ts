import Room from './Room.type';

type Session = {
  id: number;
  finishAt?: string;
  stepFinishAt?: string;
  createdAt: string;
  actualStep: number;
  roomId: number;
  room?: Room;
};

export default Session;
