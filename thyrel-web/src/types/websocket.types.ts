import { SessionState } from 'node:http2';
import Player from 'types/Player.type';

export enum WsStates {
  IDLE = 'Loading...',
  CONNECTING = 'You will be connected',
  CONNECTED = 'You are connected',
  CLOSED = "You're disconnected",
}

export enum WebsocketEvent {
  Invalid = -1,
  PlayerJoin = 1,
  PlayerLeft = 2,
  PlayerFinished = 3,
  NewOwnerPlayer = 4,
  PlayerKicked = 5,
  SessionStart = 11,
  SessionUpdate = 12,
  NextStep = 13, // on a step is finish
}

export enum SendMessageType {
  Authentication = 1,
}

export type WebsocketMessage = {
  websocketEvent: WebsocketEvent;
  player?: Player;
  playerId?: number;
  session?: Partial<SessionState>;
  error?: string;
};