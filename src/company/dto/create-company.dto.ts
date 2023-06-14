import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateCompanyDto {
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  constructor(address: string, email: string, name: string, id?: string) {
    this.address = address;
    this.email = email;
    this.name = name;
    this.id = id;
  }
}
