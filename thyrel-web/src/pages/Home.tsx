import { Link } from 'react-router-dom';

// component when we aren't in a Lobby
export default function Home() {
  return (
    <div style={{ margin: 16 }}>
      You're in Home
      <div style={{ width: 400, display: 'flex', justifyContent: 'space-between' }}>
        <Link to="/lobby">Go lobby</Link>
        <Link to="/home">Go home</Link>
        <Link to="/test">Go Test the API</Link>
      </div>
    </div>
  );
}
