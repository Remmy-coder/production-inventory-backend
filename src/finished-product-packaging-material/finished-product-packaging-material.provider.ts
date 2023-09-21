import { DataSource } from 'typeorm';
import { finishedProductPackagingMaterialConstants } from './finished-product-packaging-material.constants';
import { FinishedProductPackagingMaterial } from './entities/finished-product-packaging-material.entity';

export const FinishedProductPackagingMaterialProviders = [
  {
    provide: finishedProductPackagingMaterialConstants.provide,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(FinishedProductPackagingMaterial),
    inject: [finishedProductPackagingMaterialConstants.ds],
  },
];
