import { Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { styled } from '@material-ui/core/styles';

type BookAddReactionProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Button = styled('button')({
  backgroundColor: 'transparent',
  outline: 'none',
  border: 'none',
  cursor: 'pointer',
});

export default function BookAddReaction({ onClick }: BookAddReactionProps) {
  return (
    <Button onClick={onClick}>
      <Box
        display="flex"
        maxWidth={24}
        borderRadius="50%"
        alignItems="center"
        justifyContent="center"
        bgcolor="background.default">
        <AddIcon color="action" />
      </Box>
    </Button>
  );
}
