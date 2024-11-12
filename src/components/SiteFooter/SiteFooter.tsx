import { Container, Row, Col } from '../Layout';
import { LinkProps } from '../Link/Link';
import SiteLogo from '../SiteLogo/SiteLogo';

// Component SCSS.
import './SiteFooter.scss';

// Component props.
export interface SiteFooterProps {
  locale?: string;
  primaryMenu?: LinkProps[];
  secondaryMenu?: LinkProps[];
  logoID?: string;
  logoHref?: string;
}

// Component render.
const SiteFooter = ({
  locale,
  primaryMenu = [],
  secondaryMenu = [],
  logoID,
  logoHref,
}: SiteFooterProps) => {
  let ariaLabel;

  if (locale === 'cy') {
    ariaLabel = 'Cysylltiadau Troedynnau';
  } else {
    ariaLabel = 'Footer links';
  }

  return (
    <footer className='gw-site-footer gw-none-print' id='gw-site-footer'>
      <Container>
        <Row>
          <Col>
            {primaryMenu.length > 0 || secondaryMenu.length > 0 ? (
              <div className='gw-site-footer__nav'>
                <nav aria-label={ariaLabel}>
                  {primaryMenu.length > 0 && (
                    <ul className='gw-site-footer__nav--primary'>
                      {primaryMenu.map((item, index) => (
                        <li key={index}>
                          <a {...item}>
                            {item.children}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                  {secondaryMenu.length > 0 && (
                    <ul className='gw-site-footer__nav--secondary'>
                      {secondaryMenu.map((item, index) => (
                        <li key={index}>
                          <a {...item}>
                            {item.children}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </nav>
              </div>
            ) : null}
            <div className='gw-site-footer__branding'>
              <SiteLogo locale={locale} id={logoID} href={logoHref} />
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

// Component export.
export default SiteFooter;
