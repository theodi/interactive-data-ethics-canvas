import i18next, { i18n, Resource } from 'i18next';
import translations from './translations';

const INITIAL_LANGUAGE = 'en';

export class I18nService {
  // expose i18next
  i18n: i18n;
  constructor() {
    this.i18n = i18next;
    this.initialize();
    this.changeLanguage(INITIAL_LANGUAGE);
  }

  // Our translation function
  t(key: string, replacements?: Record<string, unknown>): string {
    return this.i18n.t(key, replacements);
  }

  // Initializing i18n
  initialize() {
    this.i18n.init({
      lng: INITIAL_LANGUAGE,
      fallbackLng: 'en',
      debug: true,
      defaultNS: 'common',
      fallbackNS: 'common',
      resources: translations as Resource,
      interpolation: {
        escapeValue: false,
      },
    });
  }

  changeLanguage(language: string) {
    this.i18n.changeLanguage(language);
  }
}
