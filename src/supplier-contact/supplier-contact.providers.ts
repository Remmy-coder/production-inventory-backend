import { DataSource } from 'typeorm';
import { SupplierContact } from './entities/supplier-contact.entity';
import { supplierContactConstants } from './supplier-contact.constants';

export const SupplierContactProviders = [
  {
    provide: supplierContactConstants.provide,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SupplierContact),
    inject: [supplierContactConstants.ds],
  },
];
