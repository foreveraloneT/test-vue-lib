import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import { glob } from 'glob';
import dts from 'vite-plugin-dts';
import cp from 'vite-plugin-cp';

import config from './package.json';

const peerDeps = Object.keys(config.peerDependencies ?? {});
// TODO: also add "dependencies" to external if have
const external = [...peerDeps];
console.log('external: ', external);

function esmInput(pattern: string, prefix: string): Record<string, string> {
  return glob.sync(pattern).reduce((acc, filePath) => {
    const name = filePath.match(new RegExp(`.*${prefix}/(.*?)/.*`))?.at(1) ?? '';

    if (!name) {
      return {...acc};
    }

    return {
      ...acc,
      [`${prefix}/${name}`]: fileURLToPath(new URL(filePath, import.meta.url)),
    };
  }, {});
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    dts({
      entryRoot: fileURLToPath(new URL('./src', import.meta.url)),
      tsconfigPath: './tsconfig.app.json',
      exclude: [
        '**/__stories__/*',
        '**/__tests__/*',
      ],
    }),
    cp({
      targets: [
        { src: fileURLToPath(new URL('package.json', import.meta.url)), dest: 'dist' },
        { src: fileURLToPath(new URL('README.md', import.meta.url)), dest: 'dist' },
        { src: fileURLToPath(new URL('package-lock.json', import.meta.url)), dest: 'dist' },
        { src: fileURLToPath(new URL('.npmignore', import.meta.url)), dest: 'dist' },
      ]
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    outDir: 'dist',
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es'],
      fileName: (_, entryName) => {
        if (entryName.startsWith('locale')) {
          return `${entryName}.js`;
        }

        if (entryName.endsWith('index')) {
          return `${entryName}.js`;
        }

        return `${entryName}/index.js`;
      },
      cssFileName: 'style',
    },
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
        'components/index': fileURLToPath(new URL('./src/components/index.ts', import.meta.url)),
        'stores/index': fileURLToPath(new URL('./src/stores/index.ts', import.meta.url)),
        ...esmInput('./src/components/*/index.ts', 'components'),
        ...esmInput('./src/stores/*/index.ts', 'stores'),

        // locale
        'locale/index': fileURLToPath(new URL('./src/locale/index.ts', import.meta.url)),
        'locale/en': fileURLToPath(new URL('./src/locale/en.ts', import.meta.url)),
        'locale/ja': fileURLToPath(new URL('./src/locale/ja.ts', import.meta.url)),
        'locale/ko': fileURLToPath(new URL('./src/locale/ko.ts', import.meta.url)),
        'locale/th': fileURLToPath(new URL('./src/locale/th.ts', import.meta.url)),
        'locale/zh_TW': fileURLToPath(new URL('./src/locale/zh_TW.ts', import.meta.url)),
      },
      external,
    }
  }
});
