import { Nav } from 'rsuite';
import Box from '../styles/Box';

export default function DevNav() {
  return (
    <Box m={16} flexDirection="column" alignItems="center">
      <h1>You're in DevNav</h1>
      <Box justifyContent="space-between">
        <Nav appearance="tabs" activeKey="devnav">
          {/* With react-router-dom it's not a good practive do don't use
          <Link /> but Rsuits alredy render a link */}
          <Nav.Item href="/" eventKey="devnav">
            Dev nav
          </Nav.Item>
          <Nav.Item href="/r/start">Go Room Start</Nav.Item>
          <Nav.Item href="/r/write">Go Room Write</Nav.Item>
          <Nav.Item href="/r/draw">Go Room Draw</Nav.Item>
          <Nav.Item href="/r/lobby">Go Room Lobby</Nav.Item>
          <Nav.Item href="/r">Go Room</Nav.Item>
          <Nav.Item href="/home">Go home</Nav.Item>
          <Nav.Item href="/test">Go Test the API</Nav.Item>
          <Nav.Item href="/t">Go to TESTS pages</Nav.Item>
        </Nav>
      </Box>
    </Box>
  );
}
