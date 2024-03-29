import { client } from 'api/client';
import { getToken } from 'api/player-provider';
import { usePlayerContext } from 'hooks/PlayerProvider';
import { useRoomContext } from 'hooks/RoomProvider';
import React from 'react';
import 'styles/roboto-mono-font.css';
import { RoomMode, roomModeInformations } from 'types/Room.type';
import { loadingText } from 'utils/utils';
import RoomSettingsSelector from '../RoomSettingsButton';
import RoomModeSettingsModal from './RoomModeSettingsModal';

export default function RoomModeSelector() {
  const { room } = useRoomContext();
  const { player } = usePlayerContext();
  const [open, setOpen] = React.useState(false);

  const onSelect = (mode: RoomMode) => {
    if (room?.mode === mode) {
      setOpen(false);
      return;
    }

    client(`room/${room?.id}`, {
      method: 'PATCH',
      token: getToken(),
      data: { mode },
    }).then(() => setOpen(false));
  };

  const handleOpen = () => {
    if (!player?.isOwner) return;
    setOpen(true);
  };
  return (
    <>
      <RoomSettingsSelector
        title="Mode"
        description={
          room?.mode != null
            ? roomModeInformations[room?.mode].description
            : loadingText
        }
        value={
          room?.mode != null
            ? roomModeInformations[room?.mode].title
            : loadingText
        }
        onClick={handleOpen}
      />
      <RoomModeSettingsModal
        open={open}
        onClose={() => setOpen(false)}
        onSelect={mode => onSelect(mode)}
      />
    </>
  );
}
