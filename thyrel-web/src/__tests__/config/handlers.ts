import { rest } from 'msw';
import { testApiUrl } from './data';
import clientData from './data/client.json';

const baseUrl = process.env.REACT_APP_API_URL || testApiUrl;

// handlers if fake api endpoint for test
// when using `window.fetch` with this endpoint, this handlers will be called
export const handlers = [
  // FOR `client.test.tsx` TEST
  rest.get(`${baseUrl}/client`, async (req, res, ctx) => {
    return res(ctx.json(clientData.TEST));
  }),

  rest.get(`${baseUrl}/client/token`, async (req, res, ctx) => {
    const AuthorizationHeader = req.headers.get('Authorization');
    return res(ctx.json({ AuthorizationHeader }));
  }),

  rest.post(`${baseUrl}/client`, async (req, res, ctx) => {
    const body: any = req.body;
    if (body.fail) {
      return res(ctx.status(400), ctx.json(req.body));
    }
    if (body.unauthorized) {
      return res(ctx.status(401), ctx.json(req.body));
    }
    return res(ctx.json(req.body));
  }),

  rest.delete(`${baseUrl}/client`, async (req, res, ctx) => {
    return res(ctx.json(clientData.TEST));
  }),

  rest.put(`${baseUrl}/client`, async (req, res, ctx) => {
    return res(ctx.json(clientData.TEST));
  }),

  rest.patch(`${baseUrl}/client`, async (req, res, ctx) => {
    return res(ctx.json(clientData.TEST));
  }),
  // HolyDraw API :
];
