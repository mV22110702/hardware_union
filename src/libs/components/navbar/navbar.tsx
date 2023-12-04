import { Menu } from '../menu/menu';
import { NavbarLink } from '../navbar-link/navbar-link';
import React, { useCallback } from 'react';
import { AppRoute } from '~/libs/enums/enums';
import { getMenuItem } from '~/libs/helpers/helpers';
import styles from './styles.module.scss';
import { CurrencyNavbarDropdown } from '~/libs/components/currency-navbar-dropdown/currency-navbar-dropdown';
import { useHistoryModalContext } from '~/libs/hooks/use-history-modal-context.hook.tsx';
import { useSignInModalContext } from '~/libs/hooks/use-sign-in-modal-context.hook.tsx';
import { NavbarButton } from '~/libs/components/navbar-button/navbar-button.tsx';
import { useSignUpModalContext } from '~/libs/hooks/use-sign-up-modal-context.hook.tsx';
import { useAppDispatch, useAppSelector } from '~/libs/slices/store.ts';
import { logOut, selectToken } from '~/libs/slices/auth/authSlice.ts';

const Navbar: React.FC = () => {
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();
  const historyModalContext = useHistoryModalContext();

  const signInModalContext = useSignInModalContext();
  const signUpModalContext = useSignUpModalContext();

  const links = [{ to: AppRoute.ROOT, name: 'Home' }];

  const handlePressHistory = useCallback(() => {
    historyModalContext.setShowHistoryModal(true);
  }, [historyModalContext]);

  const handleClickSignInButton = useCallback(() => {
    signInModalContext.setIsSignInModalOpen(true);
  }, [signInModalContext.setIsSignInModalOpen]);

  const handleClickLogOutButton = useCallback(() => {
    dispatch(logOut());
  }, [dispatch]);

  const handleClickSignUpButton = useCallback(() => {
    signUpModalContext.setIsSignUpModalOpen(true);
  }, [signUpModalContext.setIsSignUpModalOpen]);

  const menuItems = [
    ...links.map(({ to, name }) =>
      getMenuItem({
        label: <NavbarLink to={to} name={name} />,
        key: name,
      }),
    ),
    getMenuItem({
      label: token ? (
        <NavbarButton onClick={handleClickLogOutButton}>
          {'Log out'}
        </NavbarButton>
      ) : (
        <NavbarButton onClick={handleClickSignInButton}>
          {'Sign in'}
        </NavbarButton>
      ),
      key: token ? 'log-out' : 'sign-in',
    }),

    getMenuItem({
      label: <NavbarButton onClick={handlePressHistory}>History</NavbarButton>,
      key: 'history',
    }),
    getMenuItem({
      label: <CurrencyNavbarDropdown />,
      key: 'currency',
      style: { marginLeft: 'auto' },
    }),
  ];

  if (!token) {
    menuItems.splice(
      links.length + 1,
      0,
      getMenuItem({
        label: (
          <NavbarButton onClick={handleClickSignUpButton}>
            {'Sign up'}
          </NavbarButton>
        ),
        key: 'sign-up',
      }),
    );
  }

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
