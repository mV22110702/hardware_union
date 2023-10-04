import React from "react";
import {NavLink} from "react-router-dom";
import {setNavLinkClassName} from "~/libs/helpers/set-nav-link-style.helper";
import styles from './styles.module.scss';

const AppLogo: React.FC = () => {
    return (
        <NavLink to={'/'} className={setNavLinkClassName({
            className: styles.appLogo
        })}>
            Hardware Union
        </NavLink>
    );
};

export {AppLogo};
