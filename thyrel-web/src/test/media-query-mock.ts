export default function setMatchMedia(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    value: jest.fn(() => {
      return {
        matches: matches,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      };
    }),
  });
}
