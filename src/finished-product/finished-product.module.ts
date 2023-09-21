import { Module } from '@nestjs/common';
import { FinishedProductService } from './finished-product.service';
import { FinishedProductController } from './finished-product.controller';
import { DatabaseModule } from 'src/database/database.module';
import { FinishedProductProviders } from './finished-product.provider';
import { FinishedProductPackagingMaterialProviders } from 'src/finished-product-packaging-material/finished-product-packaging-material.provider';
import { FinishedProductRawMaterialProviders } from 'src/finished-product-raw-material/finished-product-raw-material.provider';
import { FinishedProductRawMaterialService } from 'src/finished-product-raw-material/finished-product-raw-material.service';
import { RawMaterialProviders } from 'src/raw-material/raw-material.provider';
import { RawMaterialService } from 'src/raw-material/raw-material.service';
import { CompanyService } from 'src/company/company.service';
import { CurrenciesService } from 'src/currencies/currencies.service';
import { SupplierContactService } from 'src/supplier-contact/supplier-contact.service';
import { SupplierService } from 'src/supplier/supplier.service';
import { CompanyProviders } from 'src/company/company.providers';
import { CurrenciesProviders } from 'src/currencies/currencies.providers';
import { SupplierContactProviders } from 'src/supplier-contact/supplier-contact.providers';
import { SupplierProviders } from 'src/supplier/supplier.providers';
import { FinishedProductPackagingMaterialService } from 'src/finished-product-packaging-material/finished-product-packaging-material.service';
import { PackagingMaterialService } from 'src/packaging-material/packaging-material.service';
import { PackagingMaterialProviders } from 'src/packaging-material/packaging-material.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [FinishedProductController],
  providers: [
    ...FinishedProductProviders,
    ...FinishedProductPackagingMaterialProviders,
    ...FinishedProductRawMaterialProviders,
    ...RawMaterialProviders,
    ...PackagingMaterialProviders,
    ...CompanyProviders,
    ...SupplierProviders,
    ...SupplierContactProviders,
    ...CurrenciesProviders,
    FinishedProductService,
    FinishedProductRawMaterialService,
    FinishedProductPackagingMaterialService,
    RawMaterialService,
    PackagingMaterialService,
    CompanyService,
    SupplierService,
    SupplierContactService,
    CurrenciesService,
  ],
})
export class FinishedProductModule {}
