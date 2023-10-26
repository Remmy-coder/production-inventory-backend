import { DataSource } from 'typeorm';
import { databaseConstants } from './database.constants';
import { configService } from 'src/config/config.service';

export const databaseProviders = [
  {
    provide: databaseConstants.ds,
    useFactory: async () => {
      return await new DataSource(
        configService.getTypeOrmConfig(),
      ).initialize();
    },
  },
];
