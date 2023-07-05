import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { userConstants } from './user.constants';

export const UserProviders = [
  {
    provide: userConstants.provide,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [userConstants.ds],
  },
];
