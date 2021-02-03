import { client } from '../api/client';
import clientData from './config/data/client.json';

describe('client', () => {
  test('no option (get)', async () => {
    const data = await client('client');
    expect(data).toStrictEqual(clientData.TEST);
  });

  test('option get', async () => {
    const data = await client('client', { method: 'GET' });
    expect(data).toStrictEqual(clientData.TEST);
  });

  test('if data is provided, default POST', async () => {
    const test = { x: 2 };

    const data = await client('client', { data: test });
    expect(data).toStrictEqual(test);
  });

  test('if data and post was provided', async () => {
    const test = { x: 2 };

    const data = await client('client', { data: test, method: 'POST' });
    expect(data).toStrictEqual(test);
  });

  test('reject promise if status is 400', async () => {
    const test = { fail: true };

    const promise = client('client', { data: test, method: 'POST' });
    expect(promise).rejects.toEqual(test);
  });

  test('reject promise if status is 401', async () => {
    const test = { unauthorized: true };

    const promise = client('client', { data: test, method: 'POST' });
    // `toMatchInlineSnapshot` will be updated automaticlly if the error message is changed
    expect(promise).rejects.toMatchInlineSnapshot(`
      Object {
        "message": "Please re-authenticate.",
      }
    `);
  });

  test('option PUT', async () => {
    const data = await client('client', { method: 'PUT' });
    expect(data).toStrictEqual(clientData.TEST);
  });

  test('option PATCH', async () => {
    const data = await client('client', { method: 'PATCH' });
    expect(data).toStrictEqual(clientData.TEST);
  });

  test('option DELETE', async () => {
    const data = await client('client', { method: 'DELETE' });
    expect(data).toStrictEqual(clientData.TEST);
  });

  test('option TOKEN', async () => {
    const testToken = 'blabla';
    const data = await client('client/token', {
      method: 'GET',
      token: testToken,
    });
    expect(data).toStrictEqual({ AuthorizationHeader: `Bearer ${testToken}` });
  });

  test('custom header override header', async () => {
    const testToken = 'blabla';
    const data = await client('client/token', {
      method: 'GET',
      // this token is default set in Headers in Authorization
      token: 'nullToken',
      headers: {
        // but I override Authorization props will my new custom token
        Authorization: testToken,
      },
    });
    // I want my custom token here
    expect(data).toStrictEqual({ AuthorizationHeader: testToken });
  });

  test('custom config override all header', async () => {
    const data = await client('client', {
      method: 'POST',
      customConfig: { method: 'GET' },
    });
    expect(data).toStrictEqual(clientData.TEST);
  });
});
