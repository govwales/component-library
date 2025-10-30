import React, { useState, useEffect } from 'react';
import { Container } from '../Layout';
import { ShareThisPage } from '../ShareThisPage';
import { SecondaryButton } from '../Button';

// Component SCSS.
import './SiteUtilities.scss';

interface ShareLink {
  href: string;
  title: string;
  method:
    | 'facebook'
    | 'instagram'
    | 'x'
    | 'linkedin'
    | 'pinterest'
    | 'youtube'
    | 'flickr'
    | 'email'
    | 'newsletter';
}

// Component props.
export interface SiteUtilitiesProps {
  locale?: 'en' | 'cy';
  elementId: string;
  shareLinks: ShareLink[];
  forceDisplay: boolean;
}

const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

// Component render.
const SiteUtilities = ({
  locale,
  elementId,
  shareLinks,
  forceDisplay = false,
}: SiteUtilitiesProps) => {
  const backToTopButtonOnClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.currentTarget.blur();
    const element = document.getElementById(elementId);
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section.
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Measure the height of window and target ID.
  const [windowHeight, setWindowHeight] = useState(0);
  const [targetHeight, setTargetHeight] = useState(0);
  const [visible, setVisible] = useState(false);

  // On page load toggle the button display if the content
  // is larger than the window height.
  useEffect(() => {
    // Get the scroll to element.
    const scrollToElement = document.getElementById(elementId);
    // Check whether the button should be displayed or not.
    const toggleDisplay = () => {
      setWindowHeight(window.innerHeight);
      if (scrollToElement !== null) {
        setTargetHeight(scrollToElement.offsetHeight);
      }
      windowHeight < targetHeight ? setVisible(true) : setVisible(false);
      if (forceDisplay) {
        setVisible(true);
      }
    };
    // Call handler right away so state gets updated with initial window size.
    toggleDisplay();
    // Add event listener.
    window.addEventListener(
      'resize',
      debounce(() => {
        toggleDisplay();
      })
    );
    // Remove event listener on cleanup.
    return () => window.removeEventListener('resize', toggleDisplay);
  }, [elementId, targetHeight, windowHeight, forceDisplay, visible]);

  let label = 'Back to top';

  // Label.
  if (locale === 'cy') {
    label = 'Nôl i dop y dudalen';
  }

  return (
    <div className='gw-site-utilities gw-none-print' id='gw-site-utilities'>
      <Container>
        <div className='gw-row'>
          <div className='gw-col-xs-12'>
            <div className='gw-site-utilities__share-this-page'>
              <ShareThisPage shareLinks={shareLinks} locale={locale} />
            </div>
            <div className='gw-site-utilities__back-to-top'>
              {visible ? (
                <SecondaryButton
                  as='link'
                  href={'#' + elementId}
                  role='button'
                  id='gw-back-to-top'
                  colour='black'
                  icon='chevron-up'
                  iconPosition='left'
                  onClick={e => {
                    backToTopButtonOnClick(e);
                  }}
                >
                  {label}
                </SecondaryButton>
              ) : (
                <noscript>
                  <SecondaryButton
                    as='link'
                    href={'#' + elementId}
                    role='button'
                    id='gw-back-to-top'
                    colour='black'
                    icon='chevron-up'
                    iconPosition='left'
                    onClick={e => {
                      backToTopButtonOnClick(e);
                    }}
                  >
                    {label}
                  </SecondaryButton>
                </noscript>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

// Component export.
export default SiteUtilities;
