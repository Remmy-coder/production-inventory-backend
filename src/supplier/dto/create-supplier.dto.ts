import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateSupplierContactDto } from 'src/supplier-contact/dto/create-supplier-contact.dto';

export class CreateSupplierDto {
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  website: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  companyId: string;

  @ApiProperty()
  @IsDefined()
  @ValidateNested()
  @Type(() => CreateSupplierContactDto)
  supplierContact: CreateSupplierContactDto;
}
