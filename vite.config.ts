/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import copy from 'rollup-plugin-copy';
import autoprefixer from 'autoprefixer';
import { peerDependencies } from './package.json';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright'
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  css: {
    postcss: {
      plugins: [autoprefixer()]
    }
  },
  build: {
    lib: {
      entry: './src/index.ts',
      // Specifies the entry point for building the library.
      name: 'component-library',
      // Sets the name of the generated library.
      fileName: format => `index.${format}.js`,
      // Generates the output file name based on the format.
      formats: ['cjs', 'es'] // Specifies the output formats (CommonJS and ES modules).
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies)],
      output: {
        assetFileNames: assetInfo => {
          if (assetInfo.name == 'style.css') return 'css/govwales-styles.css';
          return assetInfo.name as string;
        }
      }
    },
    sourcemap: true,
    // Generates source maps for debugging.
    emptyOutDir: true // Clears the output directory before building.
  },
  publicDir: false,
  plugins: [dts(),
  // Uses the 'vite-plugin-dts' plugin for generating TypeScript declaration files (d.ts).
  copy({
    targets: [{
      src: ['src/**/*.scss'],
      dest: 'dist',
      expandDirectories: true,
      onlyFiles: true
    }],
    flatten: false,
    hook: 'writeBundle'
  })],
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright(),
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.ts']
      }
    }]
  }
});
