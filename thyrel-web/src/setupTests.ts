import '@testing-library/jest-dom';
import { server } from './test/server';

const localStorageMockStarter = function () {
  let store: any = {};
  const items = {
    getItem: jest.fn(function (key: string): string {
      return store[key];
    }),
    setItem: jest.fn(function (key: string, value: string): void {
      if (!value) throw new Error('need `value` argument');
      store[key] = value.toString();
    }),
    clear: jest.fn(function (): void {
      store = {};
    }),
    removeItem: jest.fn(function (key: string): void {
      delete store[key];
    }),
  };

  return {
    ...items,
    clearMock: () => {
      items.getItem.mockClear();
      items.setItem.mockClear();
      items.clear.mockClear();
      items.removeItem.mockClear();
      store = {};
    },
  };
};

const localStorageMock = localStorageMockStarter();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  localStorageMock.clearMock();
});

afterAll(() => server.close());
