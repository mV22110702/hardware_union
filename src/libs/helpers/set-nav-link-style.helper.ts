import {clsx} from "clsx";

type NavLinkStyleCallback = (props: { isActive: boolean; isPending: boolean; }) => string;
type StyleParameters = { className: string, classNameActive?: string, classNamePending?: string };
type SetNavLinkStyleT = (styleParameters: StyleParameters) => NavLinkStyleCallback;

const setNavLinkClassName: SetNavLinkStyleT = ({className, classNameActive, classNamePending}) => ({isActive, isPending}) => {
    return isActive ? clsx(className,classNameActive) : isPending ? clsx(className,classNamePending) : className;
};

export {setNavLinkClassName};