import { PartialType } from '@nestjs/swagger';
import { CreateFinishedProductRawMaterialDto } from './create-finished-product-raw-material.dto';

export class UpdateFinishedProductRawMaterialDto extends PartialType(CreateFinishedProductRawMaterialDto) {}
