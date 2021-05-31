import AppLayout from 'components/AppLayout';
import { BrowserRouter, HashRouter, Switch, Route } from 'react-router-dom';
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

const Router: any =
  process.env.NODE_ENV === 'production' ? HashRouter : BrowserRouter;

export default function Routes() {
  return (
    <AppLayout>
      <Router>
        <Switch>
          <Route path="/join/:identifier" component={Home} />
          <Route path="/start" component={Start} />
          <Route path="/r" component={RoomRoutes} />
          <Route path="/draw" component={Draw} />
          <Route path="/t/draw" component={Draw} />
          <Route path="/t" component={ComponentTest} />
          <Route path="/home" component={Home} />
          {/* For test, I add a special Nav
          TODO: replace it by `Home` */}
          <Route path="/" component={DevNav} />
        </Switch>
      </Router>
    </AppLayout>
  );
}

function RoomRoutes() {
  return (
    <WebsocketProvider>
      <PlayerContextProvider>
        <RoomContextProvider>
          <Switch>
            <Route path="/r/lobby" component={Lobby} />
            <Route path="/r" component={SessionRoutes} />
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
        <Route path="/r/start" component={Start} />
        <Route path="/r/draw" component={Draw} />
        <Route path="/r/write" component={Write} />
        <Route path="/r/book" component={Book} />
        <Route path="/r/lobby" component={Lobby} />
      </Switch>
    </SessionContextProvider>
  );
}
