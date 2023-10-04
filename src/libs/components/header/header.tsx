import styles from './styles.module.scss';
import React from "react";
import {Layout as AntLayout} from 'antd';
import {AppLogo} from "~/libs/components/app-logo/app-logo";
import {Navbar} from "~/libs/components/navbar/navbar";

const {Header: AntHeader} = AntLayout;

const Header: React.FC = () => {
    return (
        <AntHeader className={styles.header}>
            <AppLogo/>
            <Navbar/>
        </AntHeader>
    )
};

export {Header};
