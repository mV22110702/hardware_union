import { Menu as AntMenu } from 'antd';
import { type MenuItem, type MenuMode} from "~/libs/types/types";

type Properties = {
    items: MenuItem[];
    className?: string;
    mode?: MenuMode;
};

const Menu: React.FC<Properties> = ({items, className, mode}) => {
    return (
        <AntMenu mode={mode} className={className} theme={'light'} items={items}/>
    )
};

export { Menu };