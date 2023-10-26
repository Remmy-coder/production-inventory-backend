import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { MaterialApprovalStatus } from 'src/utils/enums/material-approval-status.enum';
import { CreateRawMaterialDto } from './create-raw-material.dto';

export class RawMaterialApprovalStatusDto extends PartialType(
  CreateRawMaterialDto,
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
  //@IsString()
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
