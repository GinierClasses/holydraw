import { Session } from 'inspector';
import Player from 'types/Player.type';
import { HolyElement } from './HolyElement.type';
import Room from './Room.type';

export enum WsStates {
  IDLE = 'loading...',
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
  Restart = 6,
  ReloadIdentifier = 7,
  RoomUpdate = 8,
  SessionStart = 11,
  SessionUpdate = 12,
  NextStep = 13, // on a step is finish
  NewAlbumElement = 14,
}

export enum SendMessageType {
  Authentication = 1,
}

export type WebsocketMessage = {
  websocketEvent: WebsocketEvent;
  player?: Player;
  playerId?: number;
  album?: HolyElement;
  session?: Partial<Session>;
  error?: string;
  room?: Partial<Room>;
};
