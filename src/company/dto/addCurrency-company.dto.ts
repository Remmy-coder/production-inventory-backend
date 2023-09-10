import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddCurrencyCompanyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cc: string;

  constructor(cc: string) {
    this.cc = cc;
  }
}
