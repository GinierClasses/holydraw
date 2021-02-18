import { css } from '@emotion/css';
import React from 'react';
import { SelectPicker } from 'rsuite';
import { useRoomContext } from '../../hooks/RoomProvider';
import Box from '../../styles/Box';
import { baseColor, bgColor, paperColor } from '../../styles/colors';
import BigInput from './BigInput';

export default function SettingsMenu() {
  const { room } = useRoomContext();
  return (
    <Box borderRadius={4} p={16} bg={baseColor} flexDirection="column" gap={24}>
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
      <SelectPicker
        data={[
          {
            label: 'Settings1',
            value: '2',
          },
        ]}
        searchable={false}
        menuClassName={css({ backgroundColor: 'red' })}
      />
    </Box>
  );
}
