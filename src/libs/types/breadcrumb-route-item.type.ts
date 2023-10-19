import { MouseEventHandler, ReactNode } from 'react';

type BreadcrumbRouteItem = {
  className?: string;
  href?: string;
  path?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
  title?: ReactNode;
};

export { type BreadcrumbRouteItem };
