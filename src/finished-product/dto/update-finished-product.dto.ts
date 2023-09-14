import { PartialType } from '@nestjs/swagger';
import { CreateFinishedProductDto } from './create-finished-product.dto';

export class UpdateFinishedProductDto extends PartialType(CreateFinishedProductDto) {}
