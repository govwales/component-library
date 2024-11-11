import type { Meta, StoryObj } from '@storybook/react';
import { LinkProps } from '../Link/Link';

// Import React component.
import SiteFooter from './SiteFooter';

// This data is used as an example.
const PrimaryMenuData: LinkProps[] = [
  {
    children: 'Primary Link 1',
    href: 'https://gov.wales',
    ['aria-label']: 'Test aria label',
    target: '_blank',
  },
  {
    children: 'Primary Link 2',
    href: 'https://gov.wales',
  },
  {
    children: 'Primary Link 3',
    href: 'https://gov.wales',
  },
];

const SecondaryMenuData: LinkProps[] = [
  {
    children: 'Secondary Link 1',
    href: 'https://gov.wales',
  },
  {
    children: 'Secondary Link 2',
    href: 'https://gov.wales',
  },
  {
    children: 'Secondary Link 3',
    href: 'https://gov.wales',
  },
];

// Storybook Meta.
const meta: Meta<typeof SiteFooter> = {
  title: 'Components/Site Footer',
  id: 'gw-site-footer',
  component: SiteFooter,
};

export default meta;
type Story = StoryObj<typeof SiteFooter>;

// Footer without links.
export const Footer: Story = {
  render: (_args: any, { globals: { locale } }) => {
    return <SiteFooter locale={locale} />;
  },
};

// Footer with secondary links.
export const FooterWithSecondaryNavigation: Story = {
  render: (_args: any, { globals: { locale } }) => {
    return (
      <SiteFooter
        locale={locale}
        secondaryMenu={SecondaryMenuData}
        logoID='gw-footer-logo'
      />
    );
  },
};

// Footer with primary and secondary links.
export const FooterWithPrimaryAndSecondaryNavigation: Story = {
  render: (_args: any, { globals: { locale } }) => {
    return (
      <SiteFooter
        locale={locale}
        primaryMenu={PrimaryMenuData}
        secondaryMenu={SecondaryMenuData}
        logoID='gw-footer-logo'
      />
    );
  },
};
