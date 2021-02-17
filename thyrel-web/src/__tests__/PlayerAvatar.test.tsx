import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlayerAvatar from '../components/Home/PlayerAvatar';

describe('PlayerAvatar', () => {
  test('img is correctly display ', () => {
    const img = 'https://image.com';
    render(<PlayerAvatar image={img} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', img);
  });

  test('onShuffle is called on shuffle', () => {
    const onShuffle = jest.fn();
    render(<PlayerAvatar image="" onShuffle={onShuffle} />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    userEvent.click(screen.getByRole('button'));
    expect(onShuffle).toBeCalledTimes(1);
  });
});
