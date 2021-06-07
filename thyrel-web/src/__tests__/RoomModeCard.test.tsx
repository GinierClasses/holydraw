import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RoomModeCard from 'components/room/lobby/room-mode/RoomModeCard';

describe('RoomModeCard', () => {
  test('title and desc. is show', () => {
    const data = { title: 'PROUT', description: 'JE SUIS FOU' };
    render(<RoomModeCard {...data} onClick={() => void 0} />);

    expect(screen.getByText(data.title)).toBeInTheDocument();
    expect(screen.getByText(data.description)).toBeInTheDocument();
  });

  test('on click is handle on click on card', () => {
    const data = { title: 'PROUT', description: 'JE SUIS FOU' };
    const onClick = jest.fn();
    render(<RoomModeCard {...data} onClick={onClick} />);

    userEvent.click(screen.getByText(data.title));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
