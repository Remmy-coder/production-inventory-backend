import { DataSource } from 'typeorm';
import { packagingMaterialConstants } from './packaging-material.constants';
import { PackagingMaterial } from './entities/packaging-material.entity';

export const PackagingMaterialProviders = [
  {
    provide: packagingMaterialConstants.provide,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PackagingMaterial),
    inject: [packagingMaterialConstants.ds],
  },
];
