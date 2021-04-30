import { Button, ButtonProps } from '@material-ui/core';
import SpinnerIcon from './SpinnerIcon';

type BigButtonProps = ButtonProps & {
  children?: React.ReactNode;
  loading?: boolean;
  onClick?: () => void;
};

/*
  BigButton is an abstraction of `Button` from `Material-ui` using the theme.

  <BigButton>Label</BigButton>: Will create button with black background.
  <BigButton color="primary">Label</BigButton>: Will create button with the primary background.
  <BigButton size="large">Label</BigButton>: Only large and medium using on this button
*/
export default function BigButton({
  children,
  loading,
  color = 'default',
  ...props
}: BigButtonProps) {
  return (
    <Button variant="contained" color={color} {...props}>
      {loading ? (
        <SpinnerIcon style={{ fontSize: props.size === 'medium' ? 32 : 40 }} />
      ) : (
        children
      )}
    </Button>
  );
}
