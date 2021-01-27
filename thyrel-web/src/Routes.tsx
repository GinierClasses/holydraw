import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Lobby from './pages/Lobby';
import TestAPI from './pages/TestAPI';

export default function Routes() {
  return (
    <Router>
      <Switch>
        {/* `:lobbyId` is params for the Lobby (https://reactrouter.com/web/example/url-params) */}
        <Route path="/lobby/:lobbyId" component={Lobby} />
        <Route path="/lobby" component={Lobby} />
        <Route path="/home" component={Home} />
        {/* Page to test the API 
        TODO : delete it */}
        <Route path="/test" component={TestAPI} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}
