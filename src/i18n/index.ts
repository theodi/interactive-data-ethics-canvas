import { getContext, setContext } from 'svelte';
import type { Readable, Writable } from 'svelte/store';
import { I18nService } from './i18n-service';
import { I18NextTranslationService, TType } from './translation-service';

const CONTEXT_KEY = 't';

export type I18nContext = {
  t: Readable<TType>;
  currentLanguage: Writable<string>;
};

export const setLocalization = (context: I18nContext) => {
  return setContext<I18nContext>(CONTEXT_KEY, context);
};

// To make retrieving the t function easier.
export const getLocalization = () => {
  return getContext<I18nContext>(CONTEXT_KEY);
};

export const initLocalizationContext = () => {
  // Initialize our services
  const i18n = new I18nService();
  const tranlator = new I18NextTranslationService(i18n);
  console.log("INITIALIZING");
  // Setting the Svelte context
  setLocalization({
    t: tranlator.translate,
    currentLanguage: tranlator.locale,
  });

  return {
    i18n,
  };
};
