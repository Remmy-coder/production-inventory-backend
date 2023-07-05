import { MESSAGES, REGEX } from 'app.utils';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Length,
  Matches,
} from 'class-validator';
export class CreateUserDto {
  id: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  password: string;

  @IsString()
  @IsNotEmpty()
  companyId: string;

  constructor(
    companyId: string,
    password: string,
    gender: string,
    email: string,
    lastName: string,
    firstName: string,
    id?: string,
  ) {
    this.companyId = companyId;
    this.password = password;
    this.gender = gender;
    this.email = email;
    this.lastName = lastName;
    this.firstName = firstName;
    this.id = id;
  }
}
