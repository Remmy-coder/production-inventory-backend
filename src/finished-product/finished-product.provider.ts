import { DataSource } from 'typeorm';
import { finishedProductConstants } from './finished-product.constants';
import { FinishedProduct } from './entities/finished-product.entity';

export const FinishedProductProviders = [
  {
    provide: finishedProductConstants.provide,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(FinishedProduct),
    inject: [finishedProductConstants.ds],
  },
];
