import { setup } from '@storybook/vue3';
import { createPinia } from 'pinia';
import type { Preview } from '@storybook/vue3';
import { createI18n } from 'vue-i18n';

import { createTestVueLib } from '../src';
import {
  th,
  en,
  ja,
  ko,
  zh_TW,
} from '../src/locale';
import '../src/assets/main.css';

const i18n = createI18n({
  locale: 'th',
  messages: {
    th,
    en,
    ja,
    ko,
    zh_TW,
  },
});

const testVueLibPlugin = createTestVueLib({
  counter: {
    initialValue: 10,
    step: 2,
  },
});

setup((app) => {
  app.use(createPinia());
  app.use(i18n);
  app.use(testVueLibPlugin);
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (story, context) => {
      const { locale } = context.globals;

      i18n.global.locale = locale;

      return {
        components: { story },
        template: '<story />',
      };
    }
  ],
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      defaultValue: 'th',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', right: '🇺🇸', title: 'English' },
          { value: 'th', right: '🇹🇭', title: 'ไทย' },
          { value: 'ja', right: '🇯🇵', title: '日本' },
          { value: 'ko', right: '🇰🇷', title: '한국어' },
          { value: 'zh_TW', right: '🇨🇳', title: '中文' },
        ],
      },
    },
  },
};

export default preview;
