import { inject, readonly, type Plugin } from 'vue';

import { testVueLibKey } from '@/keys';

export type CounterOptions = {
  initialValue?: number;
  step?: number;
}

export type PluginOptions = {
  counter?: CounterOptions;
}

const DEFAULT_OPTIONS: PluginOptions = {
  counter: {
    initialValue: 0,
    step: 1,
  },
};

export function createTestVueLib(options: PluginOptions): Plugin {
  return {
    install(app) {
      const finalOptions = {
        ...DEFAULT_OPTIONS,
        counter: {
          ...DEFAULT_OPTIONS.counter,
          ...options.counter,
        },
      };

      app.provide(testVueLibKey, readonly(finalOptions));
    },
  };
}

export const useTestVueLibOptions = (): PluginOptions => {
  const options = inject<PluginOptions>(testVueLibKey);

  if (!options) {
    throw new Error('please install plugin by using `createTestVueLib` before using this composition');
  }

  return options;
};
