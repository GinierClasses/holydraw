import { AlertColor, Box } from '@material-ui/core';
import Alert from '@material-ui/core/Alert';
import { useWebsocketContext } from 'hooks/WebsocketProvider';
import React from 'react';
import { WsStates } from 'types/websocket.types';

function getSeverity(state: WsStates): AlertColor {
  switch (state) {
    case WsStates.CLOSED:
      return 'error';
    case WsStates.CONNECTING:
      return 'info';
    case WsStates.CONNECTED:
      return 'success';
    case WsStates.IDLE:
      return 'info';
  }
}

export default function WebsocketStateDebug() {
  const [show, setShow] = React.useState(true);
  const { wsState } = useWebsocketContext();

  if (!show) return null;

  return (
    <Box position="absolute" bottom={0} right={0}>
      <Alert
        onClose={() => setShow(false)}
        variant="filled"
        elevation={4}
        severity={getSeverity(wsState)}>
        WS: {wsState}
      </Alert>
    </Box>
  );
}
