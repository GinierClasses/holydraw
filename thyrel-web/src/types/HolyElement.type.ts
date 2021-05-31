import Player from './Player.type';
import Reaction from './Reaction.type';

export type HolyElement = {
  id: number;
  step: number;
  type: 0 | 1;
  text: string;
  finishAt: string;
  createdAt: string;
  drawImage: string;
  initiatorId?: number;
  creator?: Player;
  reactions?: Array<Reaction>;
};

export enum ElementType {
  Sentence = 0,
  Drawing = 1,
}

type StepElement = HolyElement & {
  parent: HolyElement;
};

export default StepElement;
