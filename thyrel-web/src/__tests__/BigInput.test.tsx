import { fade } from '@material-ui/core';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BigInput from '../components/BigInput';
import CreateIcon from '@material-ui/icons/Create';
import { TEST_MUI_SECONDARY } from 'test/mui-data';

describe('BigInput', () => {
  test('default input props work', () => {
    const testValue = 'testvalue';
    render(<BigInput value={testValue} readOnly />);
    expect(screen.getByDisplayValue(testValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(testValue)).toHaveAttribute('readonly', '');
  });

  test('icon is dispayed', () => {
    render(<BigInput startIcon={<CreateIcon />} />);
    expect(screen.getByTestId('biginput-icon')).toBeInTheDocument();
    // check if Icon is an Icon
    expect(screen.getByTestId('biginput-icon')).toHaveClass('MuiSvgIcon-root');
  });

  test('focus input will handle container class', () => {
    const testValue = 'testvalue';
    const { container } = render(<BigInput value={testValue} readOnly />);

    fireEvent.focus(screen.getByDisplayValue(testValue));

    const child = container.children;

    expect(child[0]).toHaveStyle({
      boxShadow: `0 0 2px 0.2rem ${fade(TEST_MUI_SECONDARY, 0.4)}`,
    });
  });

  test('disable will update parent and color', () => {
    const testValue = 'testvalue';
    const { container } = render(
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
    render(<BigInput value={testValue} onChange={onChange} />);

    userEvent.type(screen.getByDisplayValue(testValue), 'x');

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
