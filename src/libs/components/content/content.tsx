import styles from './styles.module.scss';
import {Layout as AntLayout} from 'antd';
import {PropsWithChildren} from "react";

const {Content: AntContent} = AntLayout;

type Properties = PropsWithChildren<{}>;

const Content: React.FC<Properties> = ({children}: Properties) => {
    return (
        <AntLayout className={styles.contentWrapper}>
            <AntContent className={styles.content}>{children}</AntContent>
        </AntLayout>
    )
};

export {Content};
