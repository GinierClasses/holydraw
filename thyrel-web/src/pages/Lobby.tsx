import { Button, Divider, Popover, Whisper } from 'rsuite';

const speaker = (
  <Popover title="Title">
    <p>This is a default Popover </p>
    <p>Content</p>
    <p>
      <a href="#ddd">link</a>
    </p>
  </Popover>
);
// component when we are in a Lobby (in waiting of game start)
export default function Lobby() {
  return (
    <div>
      You're in Lobby
      <p>salut</p>
      <Button appearance="ghost">Yo button</Button>
      <Button appearance="primary">Yo button</Button>
      <Divider />
      <Divider />
      <Divider />
      <Divider />
      <Whisper placement="right" trigger="hover" speaker={speaker} enterable>
        <Button>Hover</Button>
      </Whisper>
    </div>
  );
}
