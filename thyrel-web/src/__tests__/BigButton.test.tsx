import CreateIcon from '@material-ui/icons/Create';
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
    render(
      <BigButton startIcon={<CreateIcon data-testid="create-icon" />}>
        Yo
      </BigButton>,
    );
    expect(screen.getByTestId('create-icon')).toBeInTheDocument();
    expect(screen.getByTestId('create-icon')).toHaveClass('MuiSvgIcon-root');
  });

  test('onClick on click', () => {
    const onClick = jest.fn();
    render(<BigButton onClick={onClick}>Yo</BigButton>);
    userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
