import {Menu} from '../menu/menu';
import {NavbarLink} from '../navbar-link/navbar-link';
import React from "react";
import {AppRoute} from "~/libs/enums/enums";
import {getMenuItem} from "~/libs/helpers/helpers";
import styles from './styles.module.scss';

const Navbar: React.FC = () => {
    const links = [{to: AppRoute.ROOT, name: 'Home'}];
    const menuItems = links.map(({to, name}) => (
            getMenuItem({
                label: (<NavbarLink to={to} name={name}/>),
                key: name,
            })
        )
    );

    return (
        <Menu className={styles.navbarMenu} items={menuItems} mode={'horizontal'}/>
    )
};

export {Navbar};