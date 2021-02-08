import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RoomContextProvider } from './hooks/RoomProvider';
import DevNav from './pages/DevNav';
import Home from './pages/Home';
import Book from './pages/room/Book';
import Draw from './pages/room/Draw';
import Lobby from './pages/room/Lobby';
import Start from './pages/room/Start';
import Write from './pages/room/Write';
import TestAPI from './pages/TestAPI';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/r/:identifier" component={Lobby} />
        <Route path="/r" component={RoomRoutes} />
        <Route path="/home" component={Home} />
        {/* Page to test the API 
        TODO : delete it */}
        <Route path="/test" component={TestAPI} />
        {/* For test, I add a special Nav
        TODO: replace it by `Home` */}
        <Route path="/" component={DevNav} />
      </Switch>
    </Router>
  );
}

function RoomRoutes() {
  return (
    <RoomContextProvider>
      <Switch>
        <Route path="/r/start" component={Start} />
        <Route path="/r/draw" component={Draw} />
        <Route path="/r/write" component={Write} />
        <Route path="/r/book" component={Book} />

        <Route path="/r/lobby" component={Lobby} />
        <Route path="/r" component={Lobby} />
      </Switch>
    </RoomContextProvider>
  );
}
