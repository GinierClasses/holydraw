import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlayerCard from '../components/lobby/PlayerCard';

describe('PlayerCard', () => {
  test('default props work', () => {
    const data = { id: 1, name: 'jean', avatar: 'AVATAR-URL.com' };
    render(<PlayerCard id={data.id} name={data.name} avatar={data.avatar} />);

    expect(screen.getByText(data.name)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', data.avatar);
  });

  test('display star if isOwner', () => {
    const data = { id: 1, name: 'jean', avatar: 'AVATAR-URL.com' };
    render(
      <PlayerCard id={data.id} name={data.name} avatar={data.avatar} isOwner />,
    );

    // testId it's useful when it's impossible to get the tag
    expect(screen.getByTestId('star-icon')).toBeInTheDocument();
  });

  test('display star if isOwner and isKickable', () => {
    const data = { id: 1, name: 'jean', avatar: 'AVATAR-URL.com' };
    render(
      <PlayerCard
        id={data.id}
        name={data.name}
        avatar={data.avatar}
        isOwner
        isKickable
      />,
    );

    // testId it's useful when it's impossible to get the tag
    expect(screen.getByTestId('star-icon')).toBeInTheDocument();
  });

  test('kick button is display and event work', () => {
    const data = { id: 1, name: 'jean', avatar: 'AVATAR-URL.com' };
    // `jest.fn` is a test function to know with what she has been called
    const onKick = jest.fn();
    render(
      <PlayerCard
        id={data.id}
        name={data.name}
        avatar={data.avatar}
        isKickable
        onKick={onKick}
      />,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button'));

    // with `jest.fn()` I can know if function is called 1 times
    expect(onKick).toHaveBeenCalledTimes(1);
    // and with which data
    expect(onKick).toHaveBeenCalledWith(data.id);
  });
});
