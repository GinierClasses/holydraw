import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Lobby from './pages/Lobby';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/lobby" component={Lobby} />
        {/* `:lobbyId` is params for the Lobby (https://reactrouter.com/web/example/url-params) */}
        <Route path="/lobby/:lobbyId" component={Lobby} />
      </Switch>
    </Router>
  );
}
