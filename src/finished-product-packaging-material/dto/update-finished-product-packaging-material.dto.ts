import { PartialType } from '@nestjs/swagger';
import { CreateFinishedProductPackagingMaterialDto } from './create-finished-product-packaging-material.dto';

export class UpdateFinishedProductPackagingMaterialDto extends PartialType(CreateFinishedProductPackagingMaterialDto) {}
