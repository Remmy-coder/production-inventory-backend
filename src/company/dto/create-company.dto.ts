import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateCompanyDto {
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsNotEmpty()
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
    this.address = address;
    this.state = state;
    this.country = country;
    this.email = email;
    this.name = name;
    this.id = id;
  }
}
