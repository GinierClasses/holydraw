import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Lobby from './pages/Lobby';

export default function Routes() {
  return (
    <Router>
      <Switch>
        {/* `:lobbyId` is params for the Lobby (https://reactrouter.com/web/example/url-params) */}
        <Route path="/lobby/:lobbyId" component={Lobby} />
        <Route path="/lobby" component={Lobby} />
        <Route path="/home" component={Home} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}
