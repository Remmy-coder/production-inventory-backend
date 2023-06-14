import { DataSource } from 'typeorm';
import { companyConstants } from './company.constants';
import { Company } from './entities/company.entity';

export const CompanyProviders = [
  {
    provide: companyConstants.provide,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Company),
    inject: [companyConstants.ds],
  },
];
