import { Currency } from '~/libs/enums/enums';
import { ValueOf } from '~/libs/types/value-of.type';

type CurrencyValues = ValueOf<typeof Currency>;

export { type CurrencyValues };
