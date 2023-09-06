import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSupplierContactDto } from './create-supplier-contact.dto';
import { IsEmail, IsString } from 'class-validator';

export class UpdateSupplierContactDto extends PartialType(
  CreateSupplierContactDto,
) {
  id: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  dialcode: string;

  @ApiProperty()
  @IsString()
  phoneNumber: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    dialcode: string,
    phoneNumber: string,
    id?: string,
  ) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.dialcode = dialcode;
    this.phoneNumber = phoneNumber;
    this.id = id;
  }
}
