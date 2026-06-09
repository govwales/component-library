import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-vitest'
  ],
  core: {
    builder: '@storybook/builder-vite',
  },
  framework: '@storybook/react-vite',
  async viteFinal(config) {
    // Merge custom configuration into the default config
    const { mergeConfig } = await import('vite');
    return mergeConfig(config, {});
  },
  typescript: {
    check: true,
    skipCompiler: false,
    reactDocgen: 'react-docgen-typescript',
  },
  docs: {
    defaultName: 'Documentation',
  },
  staticDirs: ['../public'],
};

export default config;
