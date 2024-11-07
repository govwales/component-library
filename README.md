# GOV.WALES Component Library

&nbsp;

**BETA** This library is in development and is subject to change.

&nbsp;

## About

This library contains GOV.WALES design system components built using Typescript React and SASS. Components and states are documented in Storybook.

&nbsp;

## Contact the team

This repository is maintained by the Welsh Government Corporate Digital Team. If you want to know more about GOV.WALES Design System, please email the [Corporate Digital Team](mailto:digital@gov.wales).

&nbsp;

## Quick start

### 1. Install with npm (recommended)

`npm install @govwales/component-library`

&nbsp;

### 2. Importing GOV.WALES react components into your project

Follow the GOV.WALES component library guidance on how to use import components properties and mark-up.

`import { ComponentName } from '@govwales/component-library';`

&nbsp;

### 3. Importing SCSS or CSS into your project

You can import the GOV.WALES global styles into your
project using SCSS or CSS.

Your project will require a SCSS complier such as 'Dart-sass'.
To import dart sass:

`npm -i --save-dev sass`

&nbsp;

To import global SCSS add the below to your app react file:

```scss
@import '@govwales/component-library/dist/scss/_govwales-global.scss';
```

To import component SCSS only add the below to app react file:

```scss
@import '@govwales/component-library/dist/scss/_govwales-components.scss';
```

To import global SCSS and components add the below to app react file:

```scss
@import '@govwales/component-library/dist/scss/govwales-styles.scss';
```

To import global CSS add the below to app react file:

```scss
@import '@govwales/component-library/dist/css/govwales-styles.css';
```
