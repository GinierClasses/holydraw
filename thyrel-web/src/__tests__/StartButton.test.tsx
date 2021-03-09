import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StartButton from 'components/room/lobby/StartButton';
import Player from 'types/Player.type';

describe('PlayerAvatar', () => {
  test('no admin see only the text without the button', () => {
    const player: Player = {
      id: 1,
      username: 'string',
      avatarUrl: 'string',
      isOwner: false,
      isPlaying: false,
      createdAt: 'string',
      roomId: 2,
    };
    render(<StartButton player={player} onStart={() => void 0} />);
    expect(screen.getByLabelText('spinner icon')).toBeInTheDocument();
    expect(screen.getByText(/waiting/i)).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Start/i }),
    ).not.toBeInTheDocument();
  });
  test(' admin can handle the button', () => {
    const player: Player = {
      id: 1,
      username: 'string',
      avatarUrl: 'string',
      isOwner: true,
      isPlaying: false,
      createdAt: 'string',
      roomId: 2,
    };
    const onStart = jest.fn();
    render(<StartButton player={player} onStart={onStart} />);
    expect(screen.queryByLabelText('spinner icon')).not.toBeInTheDocument();
    expect(screen.queryByText(/waiting/i)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Start/i })).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /Start/i }));

    expect(onStart).toHaveBeenCalledTimes(1);
  });
});
