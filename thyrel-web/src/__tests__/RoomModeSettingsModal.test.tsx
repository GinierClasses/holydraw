import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RoomModeSettingsModal from 'components/room/lobby/room-mode/RoomModeSettingsModal';
import { RoomMode, roomModeInformations } from 'types/Room.type';

describe('RoomModeSettingsModal', () => {
  test('title and desc. is show', () => {
    const onClose = jest.fn();
    render(
      <RoomModeSettingsModal
        open={true}
        onClose={onClose}
        onSelect={() => void 0}
      />,
    );

    const buttons = screen.getAllByRole('button');
    const btn = buttons.find(b => b.classList.contains('MuiIconButton-root'));

    if (!btn) throw new Error('NO BTN');

    userEvent.click(btn);

    expect(onClose).toBeCalledTimes(1);
  });

  test('select one work', () => {
    const onSelect = jest.fn();
    render(
      <RoomModeSettingsModal
        open={true}
        onSelect={onSelect}
        onClose={() => void 0}
      />,
    );

    const id = RoomMode.OneWord;

    const info = roomModeInformations[id];

    userEvent.click(screen.getByText(info.title));

    expect(onSelect).toBeCalledTimes(1);
    expect(onSelect).toBeCalledWith(id);
  });
});
