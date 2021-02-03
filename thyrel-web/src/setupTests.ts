import '@testing-library/jest-dom';
import { server } from './__tests__/config/server';

// before all test, I turn on the server
beforeAll(() => server.listen());

// after each test, I reset handlers (handlers.tsx)
afterEach(() => {
  server.resetHandlers();
});

// when test finish, I close the server
afterAll(() => server.close());
