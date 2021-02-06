import React from 'react';
import {
  RoomSocketContextProvider,
  useWebsocket,
} from '../hooks/RoomSocketProvider';

// component when we are in a Lobby (in waiting of game start)
export default function Lobby() {
  return (
    <RoomSocketContextProvider>
      <Child />
    </RoomSocketContextProvider>
  );
}

function Child() {
  const { connect } = useWebsocket();

  return (
    <p>
      Bonsoir<button onClick={() => connect?.()}>Yoyoyoyoyoyoyoyoyoosss</button>
    </p>
  );
}
