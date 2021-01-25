import { Link } from 'react-router-dom';

// component when we aren't in a Lobby
export default function Home() {
  return (
    <div>
      You're in Home
      <div>
        <Link to="/lobby">Go lobby</Link>
        <Link to="/home">Go home</Link>
      </div>
    </div>
  );
}
