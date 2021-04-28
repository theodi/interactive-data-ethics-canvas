import i18next, { i18n, Resource } from 'i18next';
import translations from './translations';

const INITIAL_LANGUAGE = 'en';
let lang = INITIAL_LANGUAGE;

const params: URLSearchParams = (new URL(window.location.toString())).searchParams
if (params.has('lang')) {
  lang = params.get('lang')
} else {
  lang = navigator.language;
}

let debug = false;
if (params.has('debug_i18n'))
  debug = true;
}

export class I18nService {
  // expose i18next
  i18n: i18n;
  constructor() {
    this.i18n = i18next;
    this.initialize();
    this.changeLanguage(lang);
  }

  // Our translation function
  t(key: string, replacements?: Record<string, unknown>): string {
    return this.i18n.t(key, replacements);
  }

  // Initializing i18n
  initialize() {
    if (this.i18n.isInitialized) return;

    this.i18n.init({
      lng: INITIAL_LANGUAGE,
      fallbackLng: 'en',
      debug,
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
