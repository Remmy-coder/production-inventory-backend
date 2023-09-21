import { Module } from '@nestjs/common';
import { FinishedProductRawMaterialService } from './finished-product-raw-material.service';
import { FinishedProductRawMaterialController } from './finished-product-raw-material.controller';
import { DatabaseModule } from 'src/database/database.module';
import { FinishedProductRawMaterialProviders } from './finished-product-raw-material.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [FinishedProductRawMaterialController],
  providers: [
    ...FinishedProductRawMaterialProviders,
    FinishedProductRawMaterialService,
  ],
})
export class FinishedProductRawMaterialModule {}
