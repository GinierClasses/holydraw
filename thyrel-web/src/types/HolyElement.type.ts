export type HolyElement = {
  id: number;
  step: number;
  type: 0 | 1;
  text: string;
  finishAt: string;
  createdAt: string;
  drawImage: string;
};

type StepElement = HolyElement & {
  parent: HolyElement;
};

export default StepElement;
