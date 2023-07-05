import { DataSource } from 'typeorm';
import { currenciesConstants } from './currencies.constants';
import { Currencies } from './entities/currencies.entity';

export const currenciesProviders = [
  {
    provide: currenciesConstants.provide,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Currencies),
    inject: [currenciesConstants.ds],
  },
];
