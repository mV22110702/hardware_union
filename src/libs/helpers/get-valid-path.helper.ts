import {ParametersOptions} from "~/libs/types/parameters-options.type";

const getValidPath = <T extends keyof ParametersOptions>(path:T, options:ParametersOptions[T]):string => {
    let validPath:string = path;
    Object.entries(options).forEach(([parameter,value])=>{
        console.log(`key:${parameter}`)
        console.log(`value:${value}`)
        validPath = validPath.replace(`:${parameter}`,value);
    });
        console.log(validPath)
    return validPath;
};

export { getValidPath };
