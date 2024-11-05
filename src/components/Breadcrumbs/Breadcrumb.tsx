export interface BreadcrumbProps {
  href: string;
  title: string;
  current?: boolean;
}

const Breadcrumb = ({ href, title, current }: BreadcrumbProps) => {
  let className = `gw-link-breadcrumb${current ? ' gw-link-breadcrumb--current' : ''}`;
  return (
    <>
      {current ? (
        <span className={className}>{title}</span>
      ) : (
        <a href={href} className={className}>
          {title}
        </a>
      )}
    </>
  );
};

export default Breadcrumb;
