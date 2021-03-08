import { css } from '@emotion/css';
import React from 'react';
import { usePlayerContext } from '../../hooks/PlayerProvider';
import Box from '../../styles/Box';
import { secondaryText } from '../../styles/colors';
import BigButton from '../BigButton';
import { Notification } from 'rsuite';
import SpinnerIcon from '../SpinnerIcon';
import { client } from '../../api/client';
import Session from '../../types/Session.type';
import { useRoomContext } from '../../hooks/RoomProvider';

export default function LobbyStartButton() {
  const { player } = usePlayerContext();
  const { room } = useRoomContext();

  function onStart() {
    client<Session>('session', {
      data: {
        roomId: room?.id,
      },
    }).then(() => {
      Notification['success']({
        title: 'Game successfully started',
        description: 'Begin to play !',
      });
    });
  }
  return (
    <Box m={24} flexDirection="column" alignItems="center">
      <p className={css({ textAlign: 'center', color: secondaryText })}>
        {!player?.isOwner && (
          <SpinnerIcon icon="spinner" className={css({ marginRight: 8 })} />
        )}
        {player?.isOwner
          ? "you're the owner, click here to start the party"
          : 'Waiting for the host to start the game.'}
      </p>
      {player?.isOwner && (
        <div>
          <BigButton
            onClick={onStart}
            className={css({ marginTop: 12 })}
            icon="angle-double-right">
            Start
          </BigButton>
        </div>
      )}
    </Box>
  );
}
