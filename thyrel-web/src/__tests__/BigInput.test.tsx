import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BigInput from '../components/BigInput';
import { primaryFade } from '../styles/colors';

describe('BigInput', () => {
  test('default input props work', () => {
    const testValue = 'testvalue';
    render(<BigInput value={testValue} readOnly />);
    expect(screen.getByDisplayValue(testValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(testValue)).toHaveAttribute('readonly', '');
  });

  test('icon is dispayed', () => {
    const icon: any = {
      name: 'apple',
      class: 'rs-icon-apple',
    };
    render(<BigInput icon={icon.name} />);
    expect(screen.getByTestId('biginput-icon')).toBeInTheDocument();
    expect(screen.getByTestId('biginput-icon')).toHaveClass(icon.class);
  });

  test('focus input will handle container class', () => {
    const testValue = 'testvalue';
    const { container } = render(<BigInput value={testValue} readOnly />);

    fireEvent.focus(screen.getByDisplayValue(testValue));

    const child = container.children;
    expect(child[0]).toHaveStyle({
      boxShadow: `0 0 2px 0.2rem ${primaryFade(0.4)}`,
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
