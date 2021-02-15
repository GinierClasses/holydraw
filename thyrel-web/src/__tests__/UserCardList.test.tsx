import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserCardList from '../components/lobby/UserCardList';

const data = [
  {
    id: 7,
    username: 'Luca',
    avatarUrl: 'test',
    isOwner: false,
    isPlaying: true,
    createdAt: '',
    roomId: 1,
  },
  {
    id: 8,
    username: 'Norman',
    avatarUrl: 'test',
    isOwner: true,
    isPlaying: true,
    createdAt: '',
    roomId: 1,
  },
];

describe('UserCardList', () => {
  test('Check number of elements', () => {
    const { container } = render(
      <UserCardList players={data} isKickable={false} />,
    );
    const size = container.children[0].children.length;

    expect(size).toEqual(data.length);
  });

  test('OnKick works', () => {
    const onKick = jest.fn();

    render(<UserCardList players={data} isKickable={true} onKick={onKick} />);

    userEvent.click(screen.getByRole('button'));

    expect(onKick).toHaveBeenCalledTimes(1);
    expect(onKick).toHaveBeenCalledWith(data[0].id);
  });
});
