import { DataSource } from 'typeorm';
import { finishedProductRawMaterialConstants } from './finished-product-raw-material.constants';
import { FinishedProductRawMaterial } from './entities/finished-product-raw-material.entity';

export const FinishedProductRawMaterialProviders = [
  {
    provide: finishedProductRawMaterialConstants.provide,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(FinishedProductRawMaterial),
    inject: [finishedProductRawMaterialConstants.ds],
  },
];
