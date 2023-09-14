import { Module } from '@nestjs/common';
import { FinishedProductService } from './finished-product.service';
import { FinishedProductController } from './finished-product.controller';

@Module({
  controllers: [FinishedProductController],
  providers: [FinishedProductService]
})
export class FinishedProductModule {}
