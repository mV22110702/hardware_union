import { type MenuItem } from '~/libs/types/types';

type MenuItemConstructor = {
  label: React.ReactNode;
  key: React.Key;
  icon?: React.ReactNode;
  children?: MenuItem[];
  style?: React.CSSProperties;
  className?: string;
  type?: 'group';
};
const getMenuItem = ({
  label,
  key,
  icon,
  children,
  type,
  style,
  className,
}: MenuItemConstructor): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
    style,
    className,
  } as MenuItem;
};

export { getMenuItem, type MenuItemConstructor };
