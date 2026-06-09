import { Preview } from '@storybook/react';
import govwalesTheme from './theme';

// Global SCSS.
import '../src/scss/_govwales-global.scss';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },

    options: {
      storySort: {
        method: 'alphabetic',
        order: [
          'Components',
          [
            'Breadcrumbs',
            'Buttons',
            ['Primary Button', 'Secondary Button', 'CTA Button'],
          ],
        ],
      },
    },

    docs: {
      theme: govwalesTheme,
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
  globalTypes: {
    locale: {
      description: 'Internationalization locale',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', right: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', title: 'English' },
          { value: 'cy', right: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', title: 'Cymraeg' },
        ],
      },
    },
  },
};

export default preview;
