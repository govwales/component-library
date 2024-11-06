import type { Meta, StoryObj } from '@storybook/react';

// Import React component.
import GlobalSearchResultCard from './GlobalSearchResultCard';

// Storybook Meta.
const meta: Meta<typeof GlobalSearchResultCard> = {
  title: 'Components/Cards/GlobalSearchResultCard',
  component: GlobalSearchResultCard,
  argTypes: {
    locale: {
      options: ['en', 'cy'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof GlobalSearchResultCard>;

export const WithDay: Story = {
  render: (_args: any, { globals: { locale } }) => {
    return (
      <GlobalSearchResultCard
        locale={locale}
        title={'GlobalSearchResultCard title'}
        url={'#'}
        description={'Global search result description'}
        meta={[
          'Meta 1',
          'Meta 2',
          "<abbr title='HTML Test'>HTML</abbr> meta</>",
        ]}
        date='2023-06-22T08:15:00Z'
      />
    );
  },
};

export const WithoutDay: Story = {
  render: (_args: any, { globals: { locale } }) => {
    return (
      <GlobalSearchResultCard
        locale={locale}
        title={'GlobalSearchResultCard title'}
        url={'#'}
        description={'Global search result description'}
        meta={[
          'Meta 1',
          'Meta 2',
          "<abbr title='HTML Test'>HTML</abbr> meta</>",
        ]}
        date='2023-06-22T08:15:00Z'
        displayDay={false}
      />
    );
  },
};

export const WithTime: Story = {
  render: (_args: any, { globals: { locale } }) => {
    return (
      <GlobalSearchResultCard
        locale={locale}
        title={'GlobalSearchResultCard title'}
        url={'#'}
        description={'Global search result description'}
        meta={[
          'Meta 1',
          'Meta 2',
          "<abbr title='HTML Test'>HTML</abbr> meta</>",
        ]}
        date='2023-06-22T08:15:00Z'
        displayTime={true}
      />
    );
  },
};
