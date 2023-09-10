import { Module } from '@nestjs/common';
import { PackagingMaterialService } from './packaging-material.service';
import { PackagingMaterialController } from './packaging-material.controller';

@Module({
  controllers: [PackagingMaterialController],
  providers: [PackagingMaterialService]
})
export class PackagingMaterialModule {}
