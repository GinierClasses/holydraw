import { render, screen } from '@testing-library/react';
import Box from '../styles/Box';

/*
 * test of Flex
 * <Box flexDirection="column" margin={2} padding={4}>
 *   <span>1</span>
 *   <span>2</span>
 * </Box>
 */
describe('Box', () => {
  test('Flex is a default props', () => {
    render(<Box>BOXID</Box>);
    const box = screen.getByText('BOXID');

    expect(box).toHaveStyle('display: flex');
  });

  test('width and height', () => {
    const test = { width: 222, height: 333 };
    render(
      <Box width={222} height={333}>
        BOXID
      </Box>,
    );
    const box = screen.getByText('BOXID');

    expect(box).toHaveStyle(`width: ${test.width}px`);
    expect(box).toHaveStyle(`height: ${test.height}px`);
  });

  test('justifyContent and alignItems', () => {
    const test = { justifyContent: 'center', alignItems: 'center' };
    render(
      <Box justifyContent="center" alignItems="center">
        BOXID
      </Box>,
    );
    const box = screen.getByText('BOXID');

    expect(box).toHaveStyle(`justify-content: ${test.justifyContent}`);
    expect(box).toHaveStyle(`align-items: ${test.alignItems}`);
  });

  test('margin and padding', () => {
    const test = { margin: 2, padding: 3 };
    render(
      <Box margin={2} p={3}>
        BOXID
      </Box>,
    );
    const box = screen.getByText('BOXID');

    expect(box).toHaveStyle(`padding-top: ${test.padding}px`);
    expect(box).toHaveStyle(`padding-right: ${test.padding}px`);
    expect(box).toHaveStyle(`margin-left: ${test.margin}px`);
    expect(box).toHaveStyle(`margin-bottom: ${test.margin}px`);
  });

  test('mt and pb', () => {
    const test = { margin: 2, padding: 3 };
    render(
      <Box mt={2} pb={3}>
        BOXID
      </Box>,
    );
    const box = screen.getByText('BOXID');

    expect(box).toHaveStyle(`margin-top: ${test.margin}px`);
    expect(box).toHaveStyle(`padding-bottom: ${test.padding}px`);
  });

  test('flexWrap and flexDirection', () => {
    const test = { flexWrap: 'nowrap', flexDirection: 'column' };
    render(
      <Box flexWrap="nowrap" flexDirection="column">
        BOXID
      </Box>,
    );
    const box = screen.getByText('BOXID');

    expect(box).toHaveStyle(`flex-wrap: ${test.flexWrap}`);
    expect(box).toHaveStyle(`flex-direction: ${test.flexDirection}`);
  });
});
