import { Menu } from '../menu/menu';
import { NavbarLink } from '../navbar-link/navbar-link';
import React, { useCallback } from 'react';
import { AppRoute } from '~/libs/enums/enums';
import { getMenuItem } from '~/libs/helpers/helpers';
import styles from './styles.module.scss';
import { CurrencyNavbarDropdown } from '~/libs/components/currency-navbar-dropdown/currency-navbar-dropdown';
import { useAuthContext } from '~/libs/hooks/use-auth-context.hook.tsx';
import { useHistoryModalContext } from '~/libs/hooks/use-history-modal-context.hook.tsx';
import { useSignInModalContext } from '~/libs/hooks/use-sign-in-modal-context.hook.tsx';
import {NavbarButton} from "~/libs/components/navbar-button/navbar-button.tsx";

const Navbar: React.FC = () => {
  const authContext = useAuthContext();
  const historyModalContext = useHistoryModalContext();

  const signInModalContext = useSignInModalContext();

  const links = [{ to: AppRoute.ROOT, name: 'Home' }];

  const handlePressHistory = useCallback(() => {
    historyModalContext.setShowHistoryModal(true);
  }, [historyModalContext]);

  const handleClickAuthButton = useCallback(()=>{
      if(authContext.auth){
          return authContext.setAuth(false);
      }
      signInModalContext.setIsSignInModalOpen(true);
  },[authContext]);

  const menuItems = [
    ...links.map(({ to, name }) =>
      getMenuItem({
        label: <NavbarLink to={to} name={name} />,
        key: name,
      }),
    ),
    getMenuItem({
      label: (
        <NavbarButton onClick={handleClickAuthButton}>
            {authContext?.auth ? 'Sign out' : 'Sign in'}
        </NavbarButton>
      ),
      key: 'auth',
    }),
    getMenuItem({
      label: (
        <NavbarButton onClick={handlePressHistory}>
          History
        </NavbarButton>
      ),
      key: 'history',
    }),
    getMenuItem({
      label: <CurrencyNavbarDropdown />,
      key: 'currency',
      style: { marginLeft: 'auto' },
    }),
  ];

  return (
    <div className={styles.navbarMenuContainer}>
      <Menu
        className={styles.navbarMenu}
        items={menuItems}
        mode={'horizontal'}
      />
    </div>
  );
};

export { Navbar };
