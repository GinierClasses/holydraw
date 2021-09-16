import '@testing-library/jest-dom';
import i18n from 'i18n/i18n';
import { initReactI18next } from 'react-i18next';
import { server } from './test/server';

const localStorageMockInit = function () {
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

const mockEnqueue = jest.fn();

jest.mock('notistack', () => ({
  useSnackbar: () => ({
    enqueueSnackbar: mockEnqueue,
    closeSnackbar: () => {},
  }),
}));

const localStorageMock = localStorageMockInit();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: any) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {},
    },
  },
  lng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  localStorageMock.clearMock();
});

afterAll(() => server.close());
