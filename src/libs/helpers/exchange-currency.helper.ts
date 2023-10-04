import { Currency } from '~/libs/enums/enums.ts';
import {
  UAH_TO_USD_RATE,
  USD_TO_UAH_RATE,
} from '~/libs/constants/usd-uah-rate.constant.ts';

const exchangeCurrency = ({
  have,
  want,
  amount,
}: {
  have: string;
  want: string;
  amount: number;
}) => {
  if (have === want) {
    return amount;
  }
  if (want === Currency.USD) {
    return Number.parseFloat((amount * UAH_TO_USD_RATE).toFixed(2));
  }
  if (want === Currency.UAH) {
    return Number.parseFloat((amount * USD_TO_UAH_RATE).toFixed(2));
  }
  return -1;
};

export { exchangeCurrency };
