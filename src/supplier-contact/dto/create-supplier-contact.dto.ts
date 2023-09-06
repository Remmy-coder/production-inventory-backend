import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSupplierContactDto {
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  dialcode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    dialcode: string,
    phoneNumber: string,
    id?: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.dialcode = dialcode;
    this.phoneNumber = phoneNumber;
    this.id = id;
  }
}
