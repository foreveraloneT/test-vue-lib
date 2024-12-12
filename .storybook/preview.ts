import { setup } from "@storybook/vue3";
import { createPinia } from 'pinia'
import type { Preview } from "@storybook/vue3";

import '../src/assets/main.css';

setup((app) => {
  app.use(createPinia());
})

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
