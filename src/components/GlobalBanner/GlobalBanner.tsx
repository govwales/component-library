import React, { useState, useEffect } from 'react';
import { SecondaryButton } from '../Button';
import './GlobalBanner.scss';

interface CookieConfig {
  name: string;
  expiryDays?: number;
  expiryHours?: number;
}

interface GlobalBannerProps {
  title: string;
  titleHref: string;
  description: string;
  cookieConfig: CookieConfig;
  type: 'default' | 'feedback';
}

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

const setCookie = (name: string, value: string, expiryDays?: number, expiryHours?: number) => {
  const date = new Date();
  const timeInMs = (expiryDays || 0) * 24 * 60 * 60 * 1000 + (expiryHours || 0) * 60 * 60 * 1000;
  date.setTime(date.getTime() + timeInMs);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
};

const GlobalBanner: React.FC<GlobalBannerProps> = ({
  title,
  titleHref,
  description,
  cookieConfig,
  type,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const cookie = getCookie(cookieConfig.name);
    if (cookie) {
      setIsVisible(false);
    }
  }, [cookieConfig.name]);

  const handleDismiss = () => {
    setCookie(cookieConfig.name, 'dismissed', cookieConfig.expiryDays, cookieConfig.expiryHours);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={`gw-global-banner gw-global-banner--${type}`} role="banner">
      <div className="gw-global-banner__content">
        <a href={titleHref} className="gw-global-banner__title">
          {title}
        </a>
        <p className="global-banner__description">{description}</p>
      </div>
      <SecondaryButton
        as="button"
        icon="close"
        iconOnly
        onClick={handleDismiss}
        aria-label="Dismiss banner"
      />
    </div>
  );
};

export default GlobalBanner;
