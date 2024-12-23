import { config } from '@vue/test-utils';
import { createI18n } from 'vue-i18n';

import {
  en as messagesEN,
  th as messagesTH,
  ja as messagesJA,
  ko as messagesKO,
  zh_TW as messagesZhTW,
} from '../src/locale';

function hasAllTranslation(key: string): boolean {
  return key in messagesEN
    && key in messagesTH
    && key in messagesJA
    && key in messagesKO
    && key in messagesZhTW;
}

const msg = Object.keys(messagesEN)
  .filter((key) => hasAllTranslation(key))
  .reduce((acc, key) => ({
    ...acc,
    [key]: key,
  }), {});

const i18n = createI18n({
  locale: 'en',
  messages: {
    en: msg,
  },
  legacy: false,
  globalInjection: true,
  missing(_, key) {
    throw new Error(`unable to find key: ${key} in some locale`);
  },
});

config.global.plugins.push(i18n);
