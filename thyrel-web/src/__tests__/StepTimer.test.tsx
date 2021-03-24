import { render, screen } from '@testing-library/react';
import useTimerInterval, {
  UseTimerIntervalProps,
} from 'hooks/useTimerInterval';
import { act } from 'react-dom/test-utils';

const TestComponent = (props: UseTimerIntervalProps) => {
  const { progress } = useTimerInterval(props);
  return <p data-testid="progress-info">{progress}</p>;
};

describe('StepTimer', () => {
  test('style change all second', async () => {
    render(
      <TestComponent
        finishAt={new Date(new Date().getTime() + 10000)}
        timeDuration={3}
      />,
    );

    const strokeBeforeUpdate = screen.getByTestId('progress-info').textContent;

    await act(async () => {
      await new Promise(r => setTimeout(r, 1000));
    });

    const strokeAfterUpdate = screen.getByTestId('progress-info').textContent;

    expect(strokeBeforeUpdate).not.toEqual(strokeAfterUpdate);
  });

  test('style do not change all second if time is raised', async () => {
    render(<TestComponent finishAt={new Date()} timeDuration={3} />);

    const strokeBeforeUpdate = screen.getByTestId('progress-info').textContent;

    await act(async () => {
      await new Promise(r => setTimeout(r, 1000));
    });

    const strokeAfterUpdate = screen.getByTestId('progress-info').textContent;

    expect(strokeBeforeUpdate).toEqual(strokeAfterUpdate);
  });
});
