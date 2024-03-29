import CreateIcon from '@material-ui/icons/Create';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithApp } from 'test/utils/render';
import BigInput from '../components/BigInput';

describe('BigInput', () => {
  test('default input props work', () => {
    const testValue = 'testvalue';
    renderWithApp(<BigInput value={testValue} readOnly />);
    expect(screen.getByDisplayValue(testValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(testValue)).toHaveAttribute('readonly', '');
  });

  test('icon is dispayed', () => {
    renderWithApp(<BigInput startIcon={<CreateIcon />} />);
    expect(screen.getByTestId('biginput-icon')).toBeInTheDocument();
    // check if Icon is an Icon
    expect(screen.getByTestId('biginput-icon')).toHaveClass('MuiSvgIcon-root');
  });

  test('disable will update parent and color', () => {
    const testValue = 'testvalue';
    const { container } = renderWithApp(
      <BigInput value={testValue} readOnly disabled />,
    );

    fireEvent.focus(screen.getByDisplayValue(testValue));

    const child = container.children;
    expect(child[0]).toHaveStyle({
      cursor: 'not-allowed',
    });
  });
  test('onChange is correctly call', () => {
    const testValue = 'testvalue';
    const onChange = jest.fn();
    renderWithApp(<BigInput value={testValue} onChange={onChange} />);

    userEvent.type(screen.getByDisplayValue(testValue), 'x');

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
