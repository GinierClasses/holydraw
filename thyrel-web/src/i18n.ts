import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { RoomMode } from 'types/Room.type';

const resources = {
  en: {
    translation: {
      roomMode: {
        [RoomMode.Standard]: {
          title: 'Standard',
          description: 'A simple mode where you draw and guesstest.',
        },
        [RoomMode.OneWord]: {
          title: 'OneWord',
          description: 'As Standard Mode but with only one wordtest.',
        },
      },
      lobby: {
        kick: 'Do you really want to kick {{username}} ?',
        joinGame: 'Join a game 👨‍🎨',
        cancelButton: 'Cancel 👋',
        joinButton: 'Join 🥳',
        kickButton: 'Kick 🤫',
        settings: 'Settings',
        generateCode: 'Generate new code',
      },
      game: {
        clearAll:
          'This action is definitive. Are you sure you want to clear all ?',
        chooseColor: 'Choose a color',
        describe: 'Describe this scene',
        ownerStart: `you're the owner, click here to start the {{start}}`,
        playerWait: `Waiting for the host to start the {{start}}`,
        description: 'Your description here',
      },
      message: {
        gameStart: 'Game successfully started 💪',
        albumStart:
          'Album successfully started, wait 3 seconds before starting 💪',
        playerKicked: 'Player kicked 😎',
        error: 'Sorry, an error occured 😕 {{type}}',
        errorSave: 'Sorry, an error occured while saving 😕',
        succesJoin: `You've joined the room!`,
        useContextError:
          'use{{contextName}}Context should be used within a {{contextName}}ContextProvider',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
