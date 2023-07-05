import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { CreateCompanyDto } from './create-company.dto';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsString()
  address: string;

  constructor(
    address: string,
    state: string,
    country: string,
    email: string,
    name: string,
    id?: string,
  ) {
    super();
    this.address = address;
    this.state = state;
    this.country = country;
    this.email = email;
    this.name = name;
    this.id = id;
  }
}
