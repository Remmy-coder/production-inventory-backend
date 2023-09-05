import { ApiProperty, PartialType } from '@nestjs/swagger';
import { MESSAGES, REGEX } from 'app.utils';
import { IsEmail, IsString, Length, Matches } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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
  gender: string;

  constructor(
    gender: string,
    email: string,
    lastName: string,
    firstName: string,
    id?: string,
  ) {
    super();
    this.gender = gender;
    this.email = email;
    this.lastName = lastName;
    this.firstName = firstName;
    this.id = id;
  }
}
