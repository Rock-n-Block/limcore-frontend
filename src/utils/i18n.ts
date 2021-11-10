import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import Backend from 'i18next-http-backend';

import { defaultLanguage } from 'config';

const languageStorage = {
  key: 'pageLanguage',

  getLanguage() {
    return localStorage[this.key];
  },

  setLanguage(lang: string) {
    localStorage[this.key] = lang;
  },
};

i18n // load translation using http -> see /public/locales
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: defaultLanguage,
    lng: languageStorage.getLanguage(),
    debug: false,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

i18n.on('languageChanged', (lang: string) => {
  languageStorage.setLanguage(lang);
});

export default i18n;
