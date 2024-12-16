import { setup } from '@storybook/vue3';
import { createPinia } from 'pinia';
import type { Preview } from '@storybook/vue3';

import { createTestVueLib } from '../src';

import '../src/assets/main.css';

setup((app) => {
  app.use(createPinia());
  app.use(createTestVueLib({
    counter: {
      initialValue: 10,
      step: 2,
    },
  }));
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
};

export default preview;
