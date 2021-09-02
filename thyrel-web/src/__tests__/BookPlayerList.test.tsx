import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookPlayerList from 'components/room/book/BookPlayerList';
import setMatchMedia from 'test/media-query-mock';
import players from '../test/data/players.json';

describe('BookPlayerList', () => {
  test('if device is SM', () => {
    setMatchMedia(false);
    render(<BookPlayerList players={players} />);
    global.dispatchEvent(new Event('resize'));

    expect(screen.getAllByRole('img')).toHaveLength(players.length);

    expect(screen.getByText(players[0].username)).toBeInTheDocument();
    expect(
      screen.getByText(players[players.length - 1].username),
    ).toBeInTheDocument();

    expect(screen.getAllByTestId('star-icon')).toHaveLength(
      players.filter(p => p.isOwner).length,
    );

    expect(screen.queryAllByTestId('kick-icon')).toHaveLength(0);
  });

  test('if device is not SM', () => {
    setMatchMedia(true);
    render(<BookPlayerList players={players} />);
    global.dispatchEvent(new Event('resize'));

    expect(screen.getAllByRole('img')).toHaveLength(players.length);

    expect(screen.queryByText(players[0].username)).toBeInTheDocument();
    expect(
      screen.queryByText(players[players.length - 1].username),
    ).toBeInTheDocument();

    expect(screen.queryAllByTestId('star-icon')).toHaveLength(0);

    expect(screen.queryAllByTestId('kick-icon')).toHaveLength(0);
  });

  test('if device is SM and isKickable true', () => {
    setMatchMedia(false);
    const onClick = jest.fn();
    render(<BookPlayerList onClick={onClick} isKickable players={players} />);
    global.dispatchEvent(new Event('resize'));

    expect(screen.queryAllByTestId('kick-icon')).toHaveLength(
      players.filter(p => !p.isOwner).length,
    );

    userEvent.click(screen.queryAllByTestId('kick-icon')[4]);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(6, 'Alex');
  });
});
