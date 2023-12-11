import { Module } from '@nestjs/common';
import { RawMaterialService } from './raw-material.service';
import { RawMaterialController } from './raw-material.controller';
import { DatabaseModule } from 'src/database/database.module';
import { RawMaterialProviders } from './raw-material.provider';
import { CompanyProviders } from 'src/company/company.providers';
import { CompanyService } from 'src/company/company.service';
import { SupplierProviders } from 'src/supplier/supplier.providers';
import { SupplierService } from 'src/supplier/supplier.service';
import { CurrenciesProviders } from 'src/currencies/currencies.providers';
import { CurrenciesService } from 'src/currencies/currencies.service';
import { SupplierContactProviders } from 'src/supplier-contact/supplier-contact.providers';
import { SupplierContactService } from 'src/supplier-contact/supplier-contact.service';
import { CustomMailerService } from 'src/custom-mailer/custom-mailer.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RawMaterialController],
  providers: [
    ...RawMaterialProviders,
    ...CompanyProviders,
    ...SupplierProviders,
    ...SupplierContactProviders,
    ...CurrenciesProviders,
    RawMaterialService,
    CompanyService,
    SupplierService,
    SupplierContactService,
    CurrenciesService,
    CustomMailerService,
  ],
})
export class RawMaterialModule {}
