import { ParametersOptions } from '~/libs/types/parameters-options.type';

const getValidPath = <T extends keyof ParametersOptions>(
  path: T,
  options: ParametersOptions[T],
): string => {
  let validPath: string = path;
  Object.entries(options).forEach(([parameter, value]) => {
    validPath = validPath.replace(`:${parameter}`, value);
  });
  return validPath;
};

export { getValidPath };
