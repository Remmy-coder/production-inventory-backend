import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFinishedProductPackagingMaterialDto {
  id: string;

  finishedProductId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  packagingMaterialId: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  usedQuantity: number;

  constructor(rawMaterialId: string, usedQuantity: number, id: string) {
    this.packagingMaterialId = rawMaterialId;
    this.usedQuantity = usedQuantity;
    this.id = id;
  }
}
