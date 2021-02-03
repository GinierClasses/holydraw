import { WSAEACCES } from 'constants';
import { send } from 'process';
import React from 'react';
import { Button, Input, List } from 'rsuite';
import Box from '../styles/Box';

enum WsStates {
  IDLE = 'IDLE TIME',
  CONNECTING = 'CONNECTION STARTED',
  CONNECTED = 'CONNECTION SUCCESSFUL',
  SENDING = 'MESSAGE IS SENDING',
  CLOSED = 'CONNECTION IS CLOSE',
}

const api = 'localhost:5001/api';

export default function TestWebsocket() {
  const [websocket, setWebsocket] = React.useState<WebSocket>();
  const [wsState, setWsState] = React.useState<WsStates>(WsStates.IDLE);
  const [messages, setMessages] = React.useState<string[]>(['---------------']);
  const [roomId, setRoomId] = React.useState<number>(0);
  const [sendedRoomId, setSendedRoomId] = React.useState<number>(0);

  console.log('WSSTATE:', wsState);

  function getTestData() {
    fetch('https://localhost:5001/api/test', {
      method: 'POST',
      body: JSON.stringify(String(sendedRoomId)),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  function sendMessage(message: string) {
    if (!websocket) {
      console.error('No websocket');
      return;
    }
    websocket.send(message);
  }

  function connect() {
    const url = `${'wss'}://${api}/stream`;
    const socket = new WebSocket(url);

    socket.onopen = function (event) {
      socket.send(JSON.stringify({ PlayerId: 12, RoomId: roomId }));

      setWsState(WsStates.CONNECTED);
      setMessages(prev => {
        const result = [...prev];
        result.push(JSON.stringify({ event, eventData: event }));
        return result;
      });
    };

    socket.onmessage = function (event) {
      setMessages(prev => {
        const result = [...prev];
        result.push(JSON.stringify(event.data));
        return result;
      });
    };

    socket.onclose = function (event) {
      setWsState(WsStates.CLOSED);
      setMessages(prev => {
        const result = [...prev];
        result.push(JSON.stringify(event));
        return result;
      });
    };
    setWsState(WsStates.CONNECTING);
    setWebsocket(socket);
  }

  return (
    <Box m={32} borderWidth={1} p={16} flexDirection="column">
      <h2>{wsState}</h2>
      <p>current room id</p>
      <Input
        value={String(roomId)}
        disabled={wsState !== WsStates.IDLE}
        onChange={v => setRoomId(Number(v))}
      />
      <p>sended room id</p>
      <Input
        value={String(sendedRoomId)}
        onChange={v => setSendedRoomId(Number(v))}
      />
      <Box mb={16}>
        <Button onClick={connect} appearance="primary">
          Start connection
        </Button>
        <Button onClick={getTestData} appearance="ghost">
          Test data
        </Button>
        <Button
          onClick={() => sendMessage('I like Macdo but no too much')}
          appearance="primary">
          Send Message
        </Button>
      </Box>
      <List bordered>
        {messages.map((message, index) => (
          <List.Item key={index} index={index}>
            {message}
          </List.Item>
        ))}
      </List>
    </Box>
  );
}
