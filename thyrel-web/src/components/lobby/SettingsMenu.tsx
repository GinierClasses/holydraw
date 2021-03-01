import { css } from '@emotion/css';
import React from 'react';
import { useRoomContext } from '../../hooks/RoomProvider';
import Box from '../../styles/Box';
import { baseColor, paperColor } from '../../styles/colors';

export default function SettingsMenu() {
  const { room, wsState } = useRoomContext();
  return (
    <Box
      borderRadius={4}
      minWidth={328}
      p={16}
      bg={baseColor}
      flexDirection="column"
      gap={24}>
      {wsState}
      <p
        className={css({
          background: paperColor,
          color: '#ffffff',
          fontSize: 16,
          padding: 16,
          borderRadius: 4,
        })}>
        {room?.identifier}
      </p>
    </Box>
  );
}
