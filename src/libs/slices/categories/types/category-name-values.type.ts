import { ValueOf } from '~/libs/types/value-of.type';
import { CategoryName } from '~/libs/slices/categories/enum/category-name.enum';

type CategoryNameValues = ValueOf<typeof CategoryName>;

export { type CategoryNameValues };
