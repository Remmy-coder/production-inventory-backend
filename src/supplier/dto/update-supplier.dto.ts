import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSupplierDto } from './create-supplier.dto';
import { CreateSupplierContactDto } from 'src/supplier-contact/dto/create-supplier-contact.dto';
import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateSupplierContactDto } from 'src/supplier-contact/dto/update-supplier-contact.dto';
import { SupplierContact } from 'src/supplier-contact/entities/supplier-contact.entity';

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  website: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => UpdateSupplierContactDto)
  supplierContact: UpdateSupplierContactDto;

  constructor(
    name: string,
    country: string,
    state: string,
    address: string,
    supplierContact: UpdateSupplierContactDto,
    website?: string,
    id?: string,
  ) {
    super();
    this.name = name;
    this.country = country;
    this.state = state;
    this.address = address;
    this.supplierContact = supplierContact;
    this.website = website;
    this.id = id;
  }
}
