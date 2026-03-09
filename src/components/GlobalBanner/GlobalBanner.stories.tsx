import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within, expect } from 'storybook/test';
import GlobalBanner from './GlobalBanner';

const clearCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const meta: Meta<typeof GlobalBanner> = {
  title: 'Components/GlobalBanner',
  component: GlobalBanner,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['default', 'feedback'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof GlobalBanner>;

export const Default: Story = {
  args: {
    title: 'Important Notice',
    titleHref: '#',
    description: 'This is an important announcement. Please read carefully.',
    cookieConfig: { name: 'globalBanner', expiryDays: 7 },
    type: 'default',
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

export const Feedback: Story = {
  args: {
    title: 'Feedback Requested',
    titleHref: '#',
    description: 'We would love to hear your thoughts on our new features.',
    cookieConfig: { name: 'globalBannerFeedback', expiryDays: 7 },
    type: 'feedback',
  },
  beforeEach: async () => {
    clearCookie('globalBannerFeedback');
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check that the banner is initially visible
    const banner = canvas.getByRole('banner');
    await expect(banner).toBeInTheDocument();
  },
};

export const DismissFunctionality: Story = {
  args: {
    title: 'Important Notice',
    titleHref: '#',
    description: 'This is an important announcement. Click dismiss to test cookie functionality.',
    cookieConfig: { name: 'globalBannerDismiss', expiryDays: 7 },
    type: 'default',
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
    const dismissButton = canvas.getByRole('button', { name: /dismiss banner/i });
    await userEvent.click(dismissButton);

    // Wait a moment for the component to update
    await sleep(100);

    // Check that the banner is no longer visible
    await expect(banner).not.toBeInTheDocument();
  },
};
