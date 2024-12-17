import { inject, reactive, type Plugin } from 'vue';

import { translatorKey } from '@/keys';

import type { Translation } from './types';

export type Translator = {
  locale: string;
  messages: Record<string, Record<string, string>>
}

export type GlobalTranslator = {
  translator: Translator;
  t: (key: string) => string;
  setLocale: (locale: string) => void;
  addTranslations: (...translation: Translation[]) => void;
};

export type TranslatorPlugin = Plugin & {
  global: GlobalTranslator;
}

export function createTranslator(locale: string, ...translations: Translation[]): TranslatorPlugin {
  const messages: Record<string, Record<string, string>> = translations.reduce((acc, translation) => ({
    ...acc,
    [translation.locale]: translation.messages,
  }), {});

  const translator: Translator = reactive({
    locale,
    messages,
  });

  const setLocale = (locale: string) => {
    translator.locale = locale;
  };

  const t = (key: string) => {
    if (translator.locale === '') return '';

    if (!(translator.locale in translator.messages)) return '';

    if (!(key in translator.messages[translator.locale])) return '';

    return translator.messages[translator.locale][key];
  };

  const addTranslations = (...translations: Translation[]) => {
    const messages = translations.reduce((acc, translation) => ({
      ...acc,
      [translation.locale]: translation.messages,
    }), translator.messages);

    translator.messages = messages;
  };

  const global: GlobalTranslator = {
    translator,
    t,
    setLocale,
    addTranslations,
  };

  return {
    global,
    install(app) {
      app.provide(translatorKey, global);
    }
  };
}

export function useTranslator(): GlobalTranslator {
  const globalTranslator = inject<GlobalTranslator>(translatorKey);

  if (!globalTranslator) {
    throw new Error('please install plugin by using `createTranslator` before using this composition');
  }

  return globalTranslator;
}
