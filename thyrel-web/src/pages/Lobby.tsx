import React from 'react';

import { Alert, Button, Modal } from 'rsuite';
import Box from '../components/styles/Box';

// component when we are in a Lobby (in waiting of game start)
export default function Lobby() {
  const [open, setOpen] = React.useState(false);
  function test() {
    Alert.warning('This is a warning notice.', 100000);
  }

  return (
    <>
      <div>
        You're in Lobby <Button onClick={test}>Display warning</Button>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Box
          width={300}
          height={200}
          justifyContent="center"
          pb={20}
          mt={10}
          alignItems="flex-end">
          <span>first element</span>
          <span>second element</span>
          <span>last element</span>
        </Box>
      </div>
      <Modal size="sm" show={open} onHide={() => setOpen(false)}>
        <Modal.Header>
          <Modal.Title>Mon Titre de Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Je suis le text de la modal</p>
          <p>Je peux mettre ce que je veux</p>
          <Button>C'est super</Button>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpen(false)} appearance="primary">
            Ok
          </Button>
          <Button onClick={() => setOpen(false)} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
