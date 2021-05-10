import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PaletteIcon from '@material-ui/icons/Palette';
import { Box, Typography } from '@material-ui/core';
import { colorsMobile } from 'utils/app-constant';

type ColorPickerMobileModalProps = {
  currentColor: string;
  onColorChange?: (color: string) => void;
};

const useStyles = makeStyles(theme => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    margin: 0,
  },
}));

export default function ColorPickerMobileModal({
  currentColor,
  onColorChange,
}: ColorPickerMobileModalProps) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  return (
    <Box>
      <Button onClick={() => setOpen(true)}>
        <PaletteIcon />
      </Button>
      <Dialog fullScreen onClose={() => setOpen(false)} open={open}>
        <Box
          display="flex"
          flexDirection="row"
          maxWidth="100%"
          justifyContent="center">
          <Box mt={2}>
            <Typography variant="h6">Choose a color</Typography>
            <IconButton
              className={classes.closeButton}
              onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
          mt={6}
          ml={12}
          mr={12}>
          {colorsMobile.map(color => {
            const isSelected = color === currentColor;
            return (
              <Box
                alignContent="center"
                component="button"
                key={color}
                onClick={() => onColorChange?.(color)}
                border={2}
                m={0.5}
                p={0}
                bgcolor={color}
                boxShadow={isSelected ? 4 : 0}
                borderColor={isSelected ? '#ffffff' : color}
                width={50}
                height={50}
                borderRadius="50%"
                className="cursor-pointer"
              />
            );
          })}
        </Box>
      </Dialog>
    </Box>
  );
}
