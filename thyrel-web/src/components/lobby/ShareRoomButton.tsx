import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { Button, Icon } from 'rsuite';
import Box from '../../styles/Box';
import { bgFade } from '../../styles/colors';
import { Notification } from 'rsuite';

type ShareRoomButtonProps = {
  identifier: string;
};

const StyledButton = styled(Button)(() => ({
  height: 58,
  fontSize: 24,
  padding: '8px 16px',
  minWidth: 192,
  boxShadow: `0px 8px 1px ${bgFade(0.8)}`,
  position: 'relative',
  '&:active': {
    top: 8,
    boxShadow: 'none',
  },
}));

function copyIdentifierLink(identifier: string) {
  const tempInput = document.createElement('input');
  tempInput.value = identifier;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  Notification.success({
    title: 'URL successfully copied 😎',
  });
}

export default function ShareRoomButton({ identifier }: ShareRoomButtonProps) {
  return (
    <StyledButton
      onClick={event =>
        copyIdentifierLink(`${window.location.origin}/join/${identifier}`)
      }>
      <Box alignItems="center">
        <Icon icon={'key'} size={'2x'} />
        <span
          className={css({
            marginLeft: 16,
            fontWeight: 'bold',
            width: '100%',
            color: '#BDBDBD',
          })}>
          {identifier}
        </span>
      </Box>
    </StyledButton>
  );
}
