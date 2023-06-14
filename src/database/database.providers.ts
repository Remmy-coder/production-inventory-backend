import dataSource from 'db/data-source';
import { databaseConstants } from './database.constants';

export const databaseProviders = [
  {
    provide: databaseConstants.ds,
    useFactory: async () => {
      return dataSource.initialize();
    },
  },
];
