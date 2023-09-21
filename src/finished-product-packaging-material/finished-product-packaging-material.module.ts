import { Module } from '@nestjs/common';
import { FinishedProductPackagingMaterialService } from './finished-product-packaging-material.service';
import { FinishedProductPackagingMaterialController } from './finished-product-packaging-material.controller';
import { DatabaseModule } from 'src/database/database.module';
import { FinishedProductPackagingMaterialProviders } from './finished-product-packaging-material.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [FinishedProductPackagingMaterialController],
  providers: [
    ...FinishedProductPackagingMaterialProviders,
    FinishedProductPackagingMaterialService,
  ],
})
export class FinishedProductPackagingMaterialModule {}
