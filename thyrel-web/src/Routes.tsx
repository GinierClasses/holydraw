import AppLayout from 'components/AppLayout';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { PlayerContextProvider } from 'hooks/PlayerProvider';
import { RoomContextProvider } from 'hooks/RoomProvider';
import ComponentTest from 'pages/ComponentTest';
import DevNav from 'pages/DevNav';
import Home from 'pages/Home';
import Book from 'pages/room/Book';
import Draw from 'pages/room/Draw';
import Lobby from 'pages/room/Lobby';
import Start from 'pages/room/Start';
import Write from 'pages/room/Write';
import { WebsocketProvider } from 'hooks/WebsocketProvider';
import { SessionContextProvider } from 'hooks/SessionProvider';

export default function Routes() {
  return (
    <AppLayout>
      <BrowserRouter>
        <Switch>
          {/* Test component */}
          {process.env.NODE_ENV === 'development' && (
            <>
              <Route path="/t" component={ComponentTest} />
              <Route path="/t" component={DevNav} />
              <Route path="/start" component={Start} />
              <Route path="/draw" component={Draw} />
            </>
          )}

          {/* Game component */}
          <Route path="/join/:identifier" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/room" component={RoomRoutes} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </AppLayout>
  );
}

function RoomRoutes() {
  return (
    <WebsocketProvider>
      <PlayerContextProvider>
        <RoomContextProvider>
          <Switch>
            <Route path="/room/lobby" component={Lobby} />
            <Route path="/room" component={SessionRoutes} />
          </Switch>
        </RoomContextProvider>
      </PlayerContextProvider>
    </WebsocketProvider>
  );
}

function SessionRoutes() {
  return (
    <SessionContextProvider>
      <Switch>
        <Route path="/room/start" component={Start} />
        <Route path="/room/draw" component={Draw} />
        <Route path="/room/write" component={Write} />
        <Route path="/room/book" component={Book} />
        <Route path="/room/lobby" component={Lobby} />
      </Switch>
    </SessionContextProvider>
  );
}
