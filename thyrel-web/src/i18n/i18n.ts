import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enLocale from './locale/en.json';

const resources = {
  en: {
    translation: enLocale,
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
