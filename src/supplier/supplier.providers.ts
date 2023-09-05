import { DataSource } from 'typeorm';
import { supplierConstants } from './supplier.constants';
import { Supplier } from './entities/supplier.entity';

export const SupplierProviders = [
  {
    provide: supplierConstants.provide,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Supplier),
    inject: [supplierConstants.ds],
  },
];
