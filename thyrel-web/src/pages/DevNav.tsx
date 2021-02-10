import { Link } from 'react-router-dom';
import { Nav } from 'rsuite';
import Box from '../styles/Box';

export default function DevNav() {
  return (
    <Box m={16} flexDirection="column" alignItems="center">
      <h1>You're in DevNav</h1>
      <Box justifyContent="space-between">
        <Nav appearance="tabs" activeKey="devnav">
          <Nav.Item eventKey="devnav">
            <Link to="/">Dev nav</Link>
          </Nav.Item>
          <Link to="/r/start">
            <Nav.Item>Go Room Start</Nav.Item>
          </Link>
          <Link to="/r/write">
            <Nav.Item>Go Room Write</Nav.Item>
          </Link>
          <Link to="/r/draw">
            <Nav.Item>Go Room Draw</Nav.Item>
          </Link>
          <Link to="/r/lobby">
            <Nav.Item>Go Room Lobby</Nav.Item>
          </Link>
          <Link to="/r">
            <Nav.Item>Go Room</Nav.Item>
          </Link>
          <Link to="/home">
            <Nav.Item>Go home</Nav.Item>
          </Link>
          <Link to="/test">
            <Nav.Item>Go Test the API</Nav.Item>
          </Link>
        </Nav>
      </Box>
    </Box>
  );
}
