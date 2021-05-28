import { Box, Typography } from '@material-ui/core';

export type InfoModeProps = {
  title: string;
  description: string;
};

type ModeCardProps = InfoModeProps & {
  onClick: () => void;
};

export default function ModeCard({
  title,
  description,
  onClick,
}: ModeCardProps) {
  return (
    <Box
      component="button"
      bgcolor="custom.main"
      flexDirection="column"
      justifyContent="space-between"
      mr={1}
      borderRadius={32}
      width={133}
      height={155}
      border="none"
      className="cursor-pointer"
      onClick={onClick}>
      <Typography variant="h6" color="textPrimary">
        {title}
      </Typography>
      <Typography variant="body1" color="textPrimary" align="center">
        {description}
      </Typography>
    </Box>
  );
}
