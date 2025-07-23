import type { Meta, StoryObj } from '@storybook/react';
import { userEvent } from 'storybook/test';
import Cookies from 'js-cookie';

// Import React component.
import CookieBanner from './CookieBanner';

// Storybook Meta.
const meta: Meta<typeof CookieBanner> = {
  title: 'Components/CookieBanner',
  component: CookieBanner,
};

// Example client script to set cookies triggered by the prop 'cookieCallBack'.
const setCookies = () => {
  Cookies.set('ExampleCookie', 'true', { expires: 7 });
};

export default meta;
type Story = StoryObj<typeof CookieBanner>;

let ariaLabel = 'Cookies on GOV.WALES';

let cookiePreferenceMessageMarkup = (
  <>
    <p>
      We've saved some files called cookies on your device. These cookies are:
    </p>
    <ul>
      <li>essential for the site to work</li>
    </ul>
    <p>We would also like to save some cookies to help:</p>
    <ul>
      <li>
        improve our website by collecting and reporting information on how you
        use it
      </li>
      <li>tailor communications</li>
    </ul>
  </>
);

let cookieConfirmationMessageMarkup = (
  <p>
    Government services may set additional cookies and, if so, will have their
    own cookie policy and banner. You can{' '}
    <a href='#storybook-docs'>change your cookie settings</a> at any time.
  </p>
);

let cookiesDisabledMessageMarkup = (
  <p>
    Cookies are disabled in your browser settings. GOV.WALES may not operate
    correctly without essential cookies. To improve your experience,{' '}
    <a href='#storybook-docs'>change your web browser settings</a>.
  </p>
);

let nonJavascriptMessageMarkup = (
  <p>
    GOV.WALES uses cookies which are essential for the site to work.
    Non-essential cookies are also used to tailor and improve services. By
    continuing to use this site, you agree to our use of cookies.
  </p>
);

// Variants
export const Default: Story = {
  render: (_args: any, { globals: { locale } }) => {
    if (locale === 'cy') {
      cookiePreferenceMessageMarkup = (
        <>
          <p>
            Ry'n ni wedi cadw ffeiliau a elwir yn cwcis ar eich dyfais. Mae'r
            cwcis hyn:
          </p>
          <ul>
            <li>yn hanfodol i'r safle weithio</li>
          </ul>
          <p>Byddem hefyd yn hoffi cadw rhai cwcis i'n helpu ni:</p>
          <ul>
            <li>
              i wella'n gwefan drwy gasglu ac adrodd gwybodaeth ar sut yr ydych
              yn defnyddio'r safle
            </li>
            <li>i deilwra cyfathrebu</li>
          </ul>
        </>
      );
      cookieConfirmationMessageMarkup = (
        <p>
          Gall gwasanaethau llywodraeth osod cwcis ychwanegol, ac os felly, bydd
          ganddynt bolisi a baner cwcis ar wahân. Gallwch
          <a href='#storybook-docs'>newid eich gosodiadau cwci</a> ar unrhyw
          bryd.
        </p>
      );
      cookiesDisabledMessageMarkup = (
        <p>
          Mae cwcis wedi eu hanablu yng ngosodiadau eich porwr. Efallai na fydd
          LLYW.CYMRU yn gweithio'n gywir heb cwcis hanfodol. I wella eich
          profiad, <a href='#storybook-docs'>newidiwch osodiadau eich porwr</a>.
        </p>
      );
      nonJavascriptMessageMarkup = (
        <p>
          Mae LLYW.CYMRU yn defnyddio cwcis sy'n hanfodol i'r safle weithio.
          Defnyddir cwcis nad ydynt yn hanfodol hefyd i deilwra a gwella
          gwasanaethau. Trwy barhau i ddefnyddio'r safle, rydych yn cytuno ein
          bod ni'n defnyddio cwcis.
        </p>
      );
    }
    return (
      <CookieBanner
        locale={locale}
        ariaLabel={ariaLabel}
        cookieSettingsHref='#'
        cookieCallBack={setCookies}
        cookiePreferenceMessage={cookiePreferenceMessageMarkup}
        cookieConfirmationMessage={cookieConfirmationMessageMarkup}
        cookiesDisabledMessage={cookiesDisabledMessageMarkup}
        nonJavascriptMessage={nonJavascriptMessageMarkup}
      />
    );
  },
};

export const CookiesAccepted: Story = {
  parameters: {
    docs: {
      story: {
        autoplay: true,
      },
    },
  },
  play: async ({ mount }) => {
    await mount();

    const canvas = await mount(
      <CookieBanner
        locale={'en'}
        ariaLabel={ariaLabel}
        cookieSettingsHref='#'
        cookieCallBack={setCookies}
        cookiePreferenceMessage={cookiePreferenceMessageMarkup}
        cookieConfirmationMessage={cookieConfirmationMessageMarkup}
        cookiesDisabledMessage={cookiesDisabledMessageMarkup}
        nonJavascriptMessage={nonJavascriptMessageMarkup}
      />
    );
    const submitButton = canvas.getByRole('button', {
      name: 'Accept all cookies',
    });

    await userEvent.click(submitButton);
  },
};
