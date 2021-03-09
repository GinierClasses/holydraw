import React from 'react';
import { Button, Input, Modal } from 'rsuite';
import BigButton from '../BigButton';

type ModalJoinProps = {
  identifier?: string;
  onClick: (identifier: string) => void;
};

export default function ModalJoin({
  identifier: urlIdentifier,
  onClick,
}: ModalJoinProps) {
  const [open, setOpen] = React.useState(false);
  const [identifier, setIdentifier] = React.useState('');
  return (
    <>
      <BigButton
        icon="angle-double-up"
        size="lg"
        onClick={() =>
          urlIdentifier ? onClick(urlIdentifier) : setOpen(true)
        }>
        Join
      </BigButton>

      <Modal
        show={open}
        closeButton={true}
        backdrop={true}
        keyboard={true}
        onHide={() => setOpen(false)}>
        <Modal.Header>
          <Modal.Title>Join a game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            value={identifier}
            onChange={(value: string) => setIdentifier(value)}
            placeholder="Code of the room you're trying to join"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => onClick(identifier)} appearance="primary">
            Join the
          </Button>
          <Button onClick={() => setOpen(false)} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
