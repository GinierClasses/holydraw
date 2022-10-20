import { DialogContent, DialogTitle, Grid } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';
import { RoomMode } from 'types/Room.type';
import RoomModeCard from './RoomModeCard';

type RoomModeSettingsModalProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (mode: RoomMode) => void;
};

export default function RoomModeSettingsModal({
  open,
  onClose,
  onSelect,
}: RoomModeSettingsModalProps) {
  const { t } = useTranslation();
  return (
    <Dialog onClose={() => onClose()} open={open}>
      <DialogTitle>{t('lobby.settings')}</DialogTitle>
      <IconButton
        sx={{
          position: 'absolute',
          right: theme => theme.spacing(1),
          top: theme => theme.spacing(1),
          margin: 0,
        }}
        onClick={() => onClose()}
        size="large">
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Grid container wrap="wrap" justifyContent="center" spacing={2}>
          {Object.keys(RoomMode)
            .filter((key: any) => !isNaN(Number(RoomMode[key])))
            .map((key: string) => {
              // @ts-ignore : We are sure the type will be find
              const id = RoomMode[key] as number;
              return (
                <Grid item key={key}>
                  <RoomModeCard
                    onClick={() => onSelect(id)}
                    title={t(`roomMode.${key}.title`)}
                    description={t(`roomMode.${key}.description`)}
                  />
                </Grid>
              );
            })}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
