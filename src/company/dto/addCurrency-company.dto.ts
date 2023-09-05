import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddCurrencyCompanyDto {
  @ApiProperty()
  @IsString()
  cc: string;

  constructor(cc: string) {
    this.cc = cc;
  }
}
