import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BigButton from '../components/BigButton';

describe('BigButton', () => {
  test('button show children', () => {
    const child = 'Bonsoir';
    render(<BigButton>{child}</BigButton>);
    expect(screen.getByText(child)).toBeInTheDocument();
  });

  test('icon props work', () => {
    const icon: any = {
      name: 'apple',
      class: 'rs-icon-apple',
    };
    render(<BigButton icon={icon.name}>Yo</BigButton>);
    expect(screen.getByTestId('bigbutton-icon')).toBeInTheDocument();
    expect(screen.getByTestId('bigbutton-icon')).toHaveClass(icon.class);
  });

  test('onClick on click', () => {
    const onClick = jest.fn();
    render(<BigButton onClick={onClick}>Yo</BigButton>);
    userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
