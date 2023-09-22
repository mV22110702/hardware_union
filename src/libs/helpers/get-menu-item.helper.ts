import {type MenuItem} from "~/libs/types/types";

type MenuItemConstructor = {
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
}
const getMenuItem = (
    {label, key, icon, children, type}: MenuItemConstructor
): MenuItem => {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
};

export {getMenuItem, type MenuItemConstructor};
