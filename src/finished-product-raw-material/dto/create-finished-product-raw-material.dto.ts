import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFinishedProductRawMaterialDto {
  id: string;

  finishedProductId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  rawMaterialId: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  usedQuantity: number;

  constructor(rawMaterialId: string, usedQuantity: number, id: string) {
    this.rawMaterialId = rawMaterialId;
    this.usedQuantity = usedQuantity;
    this.id = id;
  }
}
