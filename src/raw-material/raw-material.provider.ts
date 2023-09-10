import { DataSource } from 'typeorm';
import { RawMaterial } from './entities/raw-material.entity';
import { rawMaterialConstants } from './raw-material.constants';

export const RawMaterialProviders = [
  {
    provide: rawMaterialConstants.provide,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RawMaterial),
    inject: [rawMaterialConstants.ds],
  },
];
