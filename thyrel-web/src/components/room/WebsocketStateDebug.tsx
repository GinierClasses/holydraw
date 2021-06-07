import { Box } from '@material-ui/core';
import { Color } from '@material-ui/lab';
import { useWebsocketContext } from 'hooks/WebsocketProvider';
import React from 'react';
import { WsStates } from 'types/websocket.types';
import Alert from '@material-ui/lab/Alert';

function getSeverity(state: WsStates): Color {
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
