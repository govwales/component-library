import { useEffect, useState } from 'react';
import { SocialMediaLink } from '../Link';
import './ShareThisPage.scss';

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

export interface ShareThisPageProps {
  locale?: 'en' | 'cy';
  shareLinks: ShareLink[];
}

const ShareThisPage = ({ locale, shareLinks }: ShareThisPageProps) => {
  const [expanded, setExpanded] = useState(false);
  const [jsEnabled, setJsEnabled] = useState(false);

  const handleToggle = () => {
    setExpanded(current => !current);
  };

  let headerLabel = 'Share this page';

  if (locale === 'cy') {
    headerLabel = "Rhannu'r dudalen hon";
  }

  useEffect(() => {
    setJsEnabled(true);
  });

  return (
    <div id='gw-share-this-page' className='gw-share-this-page'>
      {jsEnabled ? (
        <>
          <h2>
            <button
              id='sharePage'
              aria-controls='sharePageLinks'
              aria-expanded={expanded}
              className='gw-share-this-page__toggle'
              onClick={handleToggle}
            >
              {headerLabel}
            </button>
          </h2>
          <ul
            id='sharePageLinks'
            aria-labelledby='sharePage'
            className={expanded ? '' : 'gw-visually-hidden'}
          >
            {shareLinks.map((link, index) => (
              <li key={index}>
                <SocialMediaLink
                  locale={locale}
                  href={link.href}
                  title={link.title}
                  platform={link.method}
                  size='sm'
                />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <h2 className='gw-share-this-page__toggle'>{headerLabel}</h2>
          <ul>
            {shareLinks.map((link, index) => (
              <li key={index}>
                <SocialMediaLink
                  locale={locale}
                  href={link.href}
                  title={link.title}
                  platform={link.method}
                  size='sm'
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ShareThisPage;
