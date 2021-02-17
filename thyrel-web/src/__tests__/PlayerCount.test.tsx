import { render, screen } from '@testing-library/react';
import PlayerCount from '../components/PlayerCount';

describe('PayerCount', () => {
  test('Check if displays right number', () => {
    render(<PlayerCount count={6} max={9} />);

    expect(screen.getByText('6/9')).toBeInTheDocument();
  });
});
