import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateFinishedProductPackagingMaterialDto } from 'src/finished-product-packaging-material/dto/create-finished-product-packaging-material.dto';
import { CreateFinishedProductRawMaterialDto } from 'src/finished-product-raw-material/dto/create-finished-product-raw-material.dto';

export class RawMaterialDTO {
  ids: string;
  quantity: number;
}

export class CreateFinishedProductDto {
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
  expectedQuantity: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  unit: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  basePrice: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  companyId: string;

  @ApiProperty({ isArray: true, type: CreateFinishedProductRawMaterialDto })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFinishedProductRawMaterialDto)
  finishedProductRawMaterial: CreateFinishedProductRawMaterialDto[];

  @ApiProperty({
    isArray: true,
    type: CreateFinishedProductPackagingMaterialDto,
  })
  @IsArray()
  @ValidateNested()
  @Type(() => CreateFinishedProductPackagingMaterialDto)
  finishedProductPackagingMaterial: CreateFinishedProductPackagingMaterialDto[];

  constructor(
    finishedProductPackagingMaterial: CreateFinishedProductPackagingMaterialDto[],
    finishedProductRawMaterial: CreateFinishedProductRawMaterialDto[],
    companyId: string,
    basePrice: number,
    unit: string,
    expectedQuantity: number,
    sku: string,
    barcode: string,
    name: string,
    id?: string,
  ) {
    this.finishedProductPackagingMaterial = finishedProductPackagingMaterial;
    this.finishedProductRawMaterial = finishedProductRawMaterial;
    this.companyId = companyId;
    this.basePrice = basePrice;
    this.unit = unit;
    this.expectedQuantity = expectedQuantity;
    this.sku = sku;
    this.barcode = barcode;
    this.name = name;
    this.id = id;
  }
}
