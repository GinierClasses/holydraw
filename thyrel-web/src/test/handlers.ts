import { rest } from 'msw';
import { testApiUrl } from './data';
import clientData from './data/client.json';

const testBaseUrl = process.env.REACT_APP_API_URL || testApiUrl;

// handlers if fake api endpoint for test
// when using `window.fetch` with this endpoint, this handlers will be called
const handlers = [
  // FOR `client.test.tsx` TEST
  rest.get(`${testBaseUrl}/client`, async (req, res, ctx) => {
    return res(ctx.json(clientData.TEST));
  }),

  rest.get(`${testBaseUrl}/client/token`, async (req, res, ctx) => {
    const AuthorizationHeader = req.headers.get('Authorization');
    return res(ctx.json({ AuthorizationHeader }));
  }),

  rest.post(`${testBaseUrl}/client`, async (req, res, ctx) => {
    const body: any = req.body;
    if (body.fail) {
      return res(ctx.status(400), ctx.json(req.body));
    }
    if (body.unauthorized) {
      return res(ctx.status(401), ctx.json(req.body));
    }
    return res(ctx.json(req.body));
  }),

  rest.delete(`${testBaseUrl}/client`, async (req, res, ctx) => {
    return res(ctx.json(clientData.TEST));
  }),

  rest.put(`${testBaseUrl}/client`, async (req, res, ctx) => {
    return res(ctx.json(clientData.TEST));
  }),

  rest.patch(`${testBaseUrl}/client`, async (req, res, ctx) => {
    return res(ctx.json(clientData.TEST));
  }),

  rest.post(`${testBaseUrl}/room`, async (req, res, ctx) => {
    return res(ctx.json({ token: { tokenKey: 'mytoken' } }));
  }),

  rest.patch(`${testBaseUrl}/room/join/:identifier`, async (req, res, ctx) => {
    return res(ctx.json({ token: { tokenKey: 'mytoken' } }));
  }),

  // HolyDraw API :
];

export { handlers, testBaseUrl };
