import { PartialType } from '@nestjs/swagger';
import { CreatePackagingMaterialDto } from './create-packaging-material.dto';

export class UpdatePackagingMaterialDto extends PartialType(CreatePackagingMaterialDto) {}
