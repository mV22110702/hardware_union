import styles from './styles.module.scss';
import {PropsWithChildren} from "react";
import { Layout as AntLayout } from 'antd';
const { Header:AntHeader } = AntLayout;

type Properties = PropsWithChildren<{}>;

const Header: React.FC<Properties> = ({children}) => {
    return (
        <AntHeader className={styles.header}>{children}</AntHeader>
    )
};

export { Header };