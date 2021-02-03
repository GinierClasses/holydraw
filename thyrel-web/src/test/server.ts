import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// fake server to test api request
export const server = setupServer(...handlers);
