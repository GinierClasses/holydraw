import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { apiURL } from 'api/client';
import { rest } from 'msw';
import PlayerForm from '../components/home/PlayerForm';
import { server } from '../test/server';

function useServerWithMock() {
  const serverMock = jest.fn();

  server.use(
    rest.post(`${apiURL}/room`, async (req, res, ctx) => {
      serverMock(req.body);
      return res(ctx.json({ token: { tokenKey: 'mytoken' } }));
    }),

    rest.patch(`${apiURL}/room/join/:identifier`, async (req, res, ctx) => {
      serverMock(req.body, req.params);
      return res(ctx.json({ token: { tokenKey: 'mytoken' } }));
    }),
  );

  return serverMock;
}

describe('PlayerForm', () => {
  test('PlayerForm correctly render', () => {
    render(<PlayerForm />);
    expect(screen.getByText(/create/i)).toBeInTheDocument();
    expect(screen.getByText(/join/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('not display create if identifier was provided', () => {
    render(<PlayerForm identifier="blabla" />);
    expect(screen.queryByText(/create/i)).not.toBeInTheDocument();
  });

  test('oncreate add value on localStorage', async () => {
    const serverMock = useServerWithMock();
    render(<PlayerForm />);
    const playerUsername = 'Didier';
    userEvent.type(screen.getByRole('textbox'), playerUsername);
    userEvent.click(screen.getByText(/create/i));

    await waitFor(() => expect(serverMock).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(serverMock).toHaveBeenCalledWith({
        avatarUrl: '7',
        username: playerUsername,
      }),
    );
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  test('onjoin add value on localStorage', async () => {
    const serverMock = useServerWithMock();
    const playerUsername = 'Didier';
    const identifier = 'bullsit';
    render(<PlayerForm identifier={identifier} />);
    userEvent.type(screen.getByRole('textbox'), playerUsername);
    userEvent.click(screen.getByRole('button', { name: /join/i }));

    await waitFor(() => expect(serverMock).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(serverMock).toHaveBeenCalledWith(
        {
          avatarUrl: '7',
          username: playerUsername,
        },
        { identifier },
      ),
    );
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});
