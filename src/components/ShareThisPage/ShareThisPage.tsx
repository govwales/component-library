import { useState } from 'react';
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

  const handleToggle = () => {
    setExpanded(current => !current);
  };

  let headerLabel = 'Share this page';

  if (locale === 'cy') {
    headerLabel = "Rhannu'r dudalen hon";
  }

  return (
    <div id='gw-share-this-page' className='gw-share-this-page'>
      <button aria-expanded={expanded} onClick={handleToggle}>
        {headerLabel}
      </button>
      <ul className={expanded ? '' : 'gw-visually-hidden'}>
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
    </div>
  );
};

export default ShareThisPage;
