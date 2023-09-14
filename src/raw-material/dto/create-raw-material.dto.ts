import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRawMaterialDto {
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  barcode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  unit: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  basePrice: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  reserve: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
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
