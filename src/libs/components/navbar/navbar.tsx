import { Menu } from '../menu/menu';
import { NavbarLink } from '../navbar-link/navbar-link';
import React, { useContext } from 'react';
import { AppRoute } from '~/libs/enums/enums';
import { getMenuItem } from '~/libs/helpers/helpers';
import styles from './styles.module.scss';
import { AuthContext } from '~/libs/components/auth-context-provider/auth-context-provider';
import { CurrencyNavbarDropdown } from '~/libs/components/currency-navbar-dropdown/currency-navbar-dropdown';

const Navbar: React.FC = () => {
  const authContext = useContext(AuthContext);

  const links = [
    { to: AppRoute.ROOT, name: 'Home' },
    { to: AppRoute.ROOT, name: authContext?.auth ? 'Sign out' : 'Sign in' },
  ];

  const menuItems = [
    ...links.map(({ to, name }) =>
      getMenuItem({
        label: <NavbarLink to={to} name={name} />,
        key: name,
      }),
    ),
    getMenuItem({
      label: <CurrencyNavbarDropdown />,
      key: 'currency',
      style: { marginLeft: 'auto' },
    }),
  ];

  return (
    <div className={styles.navbarMenuContainer}>
      <Menu
        handleSelect={(key) => {
          if (key === 'Sign out') {
            return authContext?.setAuth?.(false);
          }
          if (key === 'Sign in') {
            return authContext?.setAuth?.(true);
          }
        }}
        className={styles.navbarMenu}
        items={menuItems}
        mode={'horizontal'}
      />
    </div>
  );
};

export { Navbar };
