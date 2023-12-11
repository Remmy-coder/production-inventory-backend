import { Module } from '@nestjs/common';
import { PackagingMaterialService } from './packaging-material.service';
import { PackagingMaterialController } from './packaging-material.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PackagingMaterialProviders } from './packaging-material.provider';
import { CompanyProviders } from 'src/company/company.providers';
import { SupplierProviders } from 'src/supplier/supplier.providers';
import { SupplierContactProviders } from 'src/supplier-contact/supplier-contact.providers';
import { CurrenciesProviders } from 'src/currencies/currencies.providers';
import { CompanyService } from 'src/company/company.service';
import { SupplierService } from 'src/supplier/supplier.service';
import { SupplierContactService } from 'src/supplier-contact/supplier-contact.service';
import { CurrenciesService } from 'src/currencies/currencies.service';
import { CustomMailerService } from 'src/custom-mailer/custom-mailer.service';

@Module({
  imports: [DatabaseModule],
  controllers: [PackagingMaterialController],
  providers: [
    ...PackagingMaterialProviders,
    ...CompanyProviders,
    ...SupplierProviders,
    ...SupplierContactProviders,
    ...CurrenciesProviders,
    PackagingMaterialService,
    CompanyService,
    SupplierService,
    SupplierContactService,
    CurrenciesService,
    CustomMailerService,
  ],
})
export class PackagingMaterialModule {}
