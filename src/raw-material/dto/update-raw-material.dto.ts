import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRawMaterialDto } from './create-raw-material.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateRawMaterialDto extends PartialType(CreateRawMaterialDto) {
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  barcode: string;

  @ApiProperty()
  @IsString()
  sku: string;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsString()
  unit: string;

  @ApiProperty()
  @IsNumber()
  basePrice: number;

  @ApiProperty()
  @IsNumber()
  reserve: number;

  @ApiProperty()
  @IsString()
  supplierId: string;

  constructor(
    supplierId: string,
    name: string,
    barcode: string,
    sku: string,
    quantity: number,
    unit: string,
    basePrice: number,
    reserve: number,
    id?: string,
  ) {
    super();
    this.supplierId = supplierId;
    this.name = name;
    this.barcode = barcode;
    this.sku = sku;
    this.quantity = quantity;
    this.unit = unit;
    this.basePrice = basePrice;
    this.reserve = reserve;
    this.id = id;
  }
}
