import { render, screen } from '@testing-library/react';
import PayerCount from '../components/PlayerCount';

describe('PayerCount', () => {
  test('Check if displays right number', () => {
    render(<PayerCount countPlayer={6} maxPlayer={9} />);

    expect(screen.getByText('6/9')).toBeInTheDocument();
  });
});
