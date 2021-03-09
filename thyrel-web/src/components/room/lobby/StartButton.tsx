import { css } from '@emotion/css';
import BigButton from 'components/BigButton';
import SpinnerIcon from 'components/SpinnerIcon';
import Box from 'styles/Box';
import { secondaryText } from 'styles/colors';
import Player from 'types/Player.type';

type StartButtonProps = {
  player?: Player;
  onStart: () => void;
};

export default function StartButton({ player, onStart }: StartButtonProps) {
  return (
    <Box m={24} flexDirection="column" alignItems="center">
      <p className={css({ textAlign: 'center', color: secondaryText })}>
        {!player?.isOwner && (
          <SpinnerIcon icon="spinner" className={css({ marginRight: 8 })} />
        )}
        {player?.isOwner
          ? "you're the owner, click here to start the party"
          : 'Waiting for the host to start the game.'}
      </p>
      {player?.isOwner && (
        <div>
          <BigButton
            onClick={onStart}
            className={css({ marginTop: 12 })}
            icon="angle-double-right">
            Start
          </BigButton>
        </div>
      )}
    </Box>
  );
}
