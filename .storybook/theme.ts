import { create } from 'storybook/theming/create';

export default create({
  base: 'light',

  // Typography
  fontBase: 'Arial,Helvetica,"Nimbus Sans L",sans-serif',
  fontCode: 'monospace',

  brandTitle: 'GOV.WALES component library',
  brandUrl: '/',
  brandImage: './wg-logo.svg',
  brandTarget: '_self',

  // Text colors
  textColor: '#1f1f1f',
  textInverseColor: '#ffffff',

  // Form colors
  inputBg: '#eeeeee',
  inputBorder: '#eeeeee',
  inputTextColor: '#1f1f1f',
  inputBorderRadius: 0,

  // UI
  appBorderRadius: 0,
});
