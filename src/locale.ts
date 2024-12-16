import th from '@/languages/messages_th.json';
import en from '@/languages/messages_en.json';
import ko from '@/languages/messages_ko.json';
import ja from '@/languages/messages_ja.json';
import zhTW from '@/languages/messages_zh_TW.json';
import { inject, reactive, type Plugin } from 'vue';

import { translatorKey } from '@/keys';

export type SupportLocale = 'en' | 'th' | 'ko' | 'ja' | 'zh_TW';

export type Translator = {
  locale: SupportLocale;
  messages: Record<string, Record<string, string>>
}

export type TranslatorPlugin = Plugin & {
  translator: Translator;
}

export function createTranslator(locale: SupportLocale): TranslatorPlugin {
  const translator: Translator = reactive({
    locale,
    messages: {
      en,
      th,
      ko,
      ja,
      zh_TW: zhTW,
    },
  });

  return {
    translator,
    install(app) {
      app.provide(translatorKey, translator);
    }
  };
}

export type UseTranslatorPayload = {
  translator: Translator;
  t: (key: string) => string;
  setLocale: (locale: SupportLocale) => void;
}

export function useTranslator(): UseTranslatorPayload {
  const translator = inject<Translator>(translatorKey);

  if (!translator) {
    throw new Error('please install plugin by using `createTranslator` before using this composition');
  }

  const setLocale = (locale: SupportLocale) => {
    translator.locale = locale;
  };

  const t = (key: string) => {
    return translator.messages[translator.locale][key];
  };

  return {
    translator,
    t,
    setLocale,
  };
}
