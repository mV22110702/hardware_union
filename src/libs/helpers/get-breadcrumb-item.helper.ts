import { BreadcrumbRouteItem } from '~/libs/types/breadcrumb-route-item.type';

const getBreadcrumbItem = (
  data: Partial<BreadcrumbRouteItem> &
    Required<Pick<BreadcrumbRouteItem, 'title'>>,
): BreadcrumbRouteItem => ({
  className: data.className,
  href: data.href,
  path: data.path,
  onClick: data.onClick,
  title: data.title,
});

export { getBreadcrumbItem };
