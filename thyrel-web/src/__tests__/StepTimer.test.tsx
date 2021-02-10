import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import StepTimer from '../components/StepTimer';

describe('BigButton', () => {
  test('style change all second', async () => {
    const { container } = render(
      <StepTimer
        finishAt={new Date(new Date().getTime() + 10000)}
        timeDuration={3}
      />,
    );

    const child = container.children[0].children[0].children[1];
    const style: any = getComputedStyle(child);
    const strokeBeforeUpdate = style['stroke-dasharray'];

    await act(async () => {
      await new Promise(r => setTimeout(r, 1000));
    });

    const style2: any = getComputedStyle(child);
    const strokeAfterUpdate = style2['stroke-dasharray'];

    expect(strokeBeforeUpdate).not.toEqual(strokeAfterUpdate);
  });

  test('style do not change all second if time is raised', async () => {
    const { container } = render(
      <StepTimer finishAt={new Date()} timeDuration={3} />,
    );

    const child = container.children[0].children[1].children[1];

    const style: any = getComputedStyle(child);
    const strokeBeforeUpdate = style['stroke-dasharray'];

    await act(async () => {
      await new Promise(r => setTimeout(r, 1000));
    });

    const style2: any = getComputedStyle(child);
    const strokeAfterUpdate = style2['stroke-dasharray'];

    expect(strokeBeforeUpdate).toEqual(strokeAfterUpdate);
  });

  test('finish icon is display on finish', async () => {
    const { container } = render(
      <StepTimer finishAt={new Date()} timeDuration={3} />,
    );
    const child = container.children[0].children[0].children[0];
    expect(child).toHaveClass('rs-progress-icon-success');
  });
});
