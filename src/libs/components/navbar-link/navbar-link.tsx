import React from 'react';
import { AppRoute } from '~/libs/enums/enums';
import { NavLink } from 'react-router-dom';
import { ValueOf } from '~/libs/types/types';
import styles from './styles.module.scss';

type Properties = {
  to: ValueOf<typeof AppRoute>;
  name: string;
};
const NavbarLink: React.FC<Properties> = ({ to, name }) => {
  return (
    <NavLink
      to={to}
      className={styles.navLinkDefault}
    >
      {name}
    </NavLink>
  );
};

export { NavbarLink };
