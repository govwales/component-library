import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from 'storybook/test';
import GlobalBanner from './GlobalBanner';

const clearCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const meta: Meta<typeof GlobalBanner> = {
  title: 'Components/Global Banner',
  component: GlobalBanner,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof GlobalBanner>;

export const Default: Story = {
  render: (_args: any, { globals: { locale } }) => {
    return (
      <GlobalBanner
        locale={locale}
        title="Important Notice"
        titleHref="#"
        description="This is an important announcement. Please read carefully."
        cookieConfig={{ name: 'globalBanner', expiryDays: 7 }}
      />
    );
  },
  beforeEach: async () => {
    clearCookie('globalBanner');
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that the banner is initially visible
    const banner = canvas.getByRole('banner');
    await expect(banner).toBeInTheDocument();
  },
};

export const DismissFunctionality: Story = {
  render: (_args: any, { globals: { locale } }) => {
    return (
      <GlobalBanner
        locale={locale}
        title="Important Notice"
        titleHref="#"
        description="This is an important announcement. Click dismiss to test cookie functionality."
        cookieConfig={{ name: 'globalBannerDismiss', expiryDays: 7 }}
      />
    );
  },
  beforeEach: async () => {
    clearCookie('globalBannerDismiss');
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that the banner is initially visible
    const banner = canvas.getByRole('banner');
    await expect(banner).toBeInTheDocument();

    // Find and click the dismiss button
    const dismissButton = canvas.getByRole('button', { name: /hide message/i });
    await userEvent.click(dismissButton);

    // Wait a moment for the component to update
    await sleep(100);

    // Check that the banner is no longer visible
    await expect(banner).not.toBeInTheDocument();
  },
};
