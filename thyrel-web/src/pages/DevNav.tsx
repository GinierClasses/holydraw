import { Link } from 'react-router-dom';

export default function DevNav() {
  return (
    <div style={{ margin: 16 }}>
      You're in DevNav
      <div
        style={{
          width: 400,
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <Link to="/r/start">Go Room Start</Link>
        <Link to="/r/write">Go Room Write</Link>
        <Link to="/r/draw">Go Room Draw</Link>
        <Link to="/r/lobby">Go Room Lobby</Link>
        <Link to="/r">Go Room</Link>
        <Link to="/home">Go home</Link>
        <Link to="/test">Go Test the API</Link>
      </div>
    </div>
  );
}
