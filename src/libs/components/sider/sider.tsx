import {Layout} from "antd";
import styles from './styles.module.scss';
import {getValidClassNames} from "~/libs/helpers/get-valid-class-names.helper";
import {Menu} from "~/libs/components/components";
import {MenuItem} from "~/libs/types/menu-item.type";

const {Sider: AntSider} = Layout;

type Properties = {
    className?: string;
    items: MenuItem[];
    handleSelect?: (key:string)=>void
};

const Sider: React.FC<Properties> = ({items,className, handleSelect}) => {
    return (
        <AntSider className={getValidClassNames(className, styles.sider)} theme={'light'}>
            <Menu handleSelect={handleSelect} items={items} className={styles.siderMenu}/>
        </AntSider>
    )
};

export {Sider};
