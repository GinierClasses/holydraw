import { apiURL } from 'api/client';
import { rest } from 'msw';
import clientData from './data/client.json';

// handlers if fake api endpoint for test
// when using `window.fetch` with this endpoint, this handlers will be called
const handlers = [
  // FOR `client.test.tsx` TEST
  rest.get(`${apiURL}/client`, async (req, res, ctx) => {
    return res(ctx.json(clientData.TEST));
  }),

  rest.get(`${apiURL}/client/token`, async (req, res, ctx) => {
    const AuthorizationHeader = req.headers.get('Authorization');
    return res(ctx.json({ AuthorizationHeader }));
  }),

  rest.post(`${apiURL}/client`, async (req, res, ctx) => {
    const body: any = req.body;
    if (body.fail) {
      return res(ctx.status(400), ctx.json(req.body));
    }
    if (body.unauthorized) {
      return res(ctx.status(401), ctx.json(req.body));
    }
    return res(ctx.json(req.body));
  }),

  rest.delete(`${apiURL}/client`, async (req, res, ctx) => {
    return res(ctx.json(clientData.TEST));
  }),

  rest.put(`${apiURL}/client`, async (req, res, ctx) => {
    return res(ctx.json(clientData.TEST));
  }),

  rest.patch(`${apiURL}/client`, async (req, res, ctx) => {
    return res(ctx.json(clientData.TEST));
  }),

  rest.post(`${apiURL}/room`, async (req, res, ctx) => {
    return res(ctx.json({ token: { tokenKey: 'mytoken' } }));
  }),

  rest.patch(`${apiURL}/room/join/:identifier`, async (req, res, ctx) => {
    return res(ctx.json({ token: { tokenKey: 'mytoken' } }));
  }),

  // HolyDraw API :
];

export { handlers, apiURL as testBaseUrl };
