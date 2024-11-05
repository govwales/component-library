export interface BreadcrumbProps {
  href: string;
  title: string;
  current?: boolean;
}

const Breadcrumb = ({ href, title, current }: BreadcrumbProps) => {
  let className = 'gw-link-breadcrumb';
  if (current) {
    className += ' gw-link-breadcrumb--current';
  }
  return (
    <>
      {current ? (
        <span className={className}>{title}</span>
      ) : (
        <a href={href} aria-current={false} className={className}>
          {title}
        </a>
      )}
    </>
  );
};

export default Breadcrumb;
