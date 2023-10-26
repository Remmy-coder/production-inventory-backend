import { ApiProperty } from '@nestjs/swagger';
import { CreateFinishedProductDto } from './create-finished-product.dto';
import {
  IsNotEmpty,
  IsEnum,
  IsDate,
  IsString,
  IsDateString,
} from 'class-validator';
import { MaterialApprovalStatus } from 'src/utils/enums/material-approval-status.enum';
import { PartialType } from '@nestjs/mapped-types';

export class FinishedProductApprovalStatusDto extends PartialType(
  CreateFinishedProductDto,
) {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(MaterialApprovalStatus)
  approvalStatus: MaterialApprovalStatus;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  approvalDate: Date;

  @ApiProperty()
  reasonForDisapproval: string;

  constructor(
    approvalStatus: MaterialApprovalStatus,
    approvalDate: Date,
    reasonForDisapproval: string,
  ) {
    super();
    this.approvalStatus = approvalStatus;
    this.approvalDate = approvalDate;
    this.reasonForDisapproval = reasonForDisapproval;
  }
}
