import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { SupplierProviders } from './supplier.providers';
import { DatabaseModule } from 'src/database/database.module';
import { SupplierContactService } from 'src/supplier-contact/supplier-contact.service';
import { SupplierContactProviders } from 'src/supplier-contact/supplier-contact.providers';
import { CompanyProviders } from 'src/company/company.providers';
import { CompanyService } from 'src/company/company.service';
import { CurrenciesProviders } from 'src/currencies/currencies.providers';
import { CurrenciesService } from 'src/currencies/currencies.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SupplierController],
  providers: [
    ...SupplierProviders,
    ...SupplierContactProviders,
    ...CurrenciesProviders,
    ...CompanyProviders,
    SupplierService,
    SupplierContactService,
    CompanyService,
    CurrenciesService,
  ],
})
export class SupplierModule {}
