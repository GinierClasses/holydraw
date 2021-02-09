import Player from "./Player.type";

type Token = {
  id: number,
  tokenKey: string,
  discardAt: string,
  createdAt: string,
  players?: Player[]
}

export default Token