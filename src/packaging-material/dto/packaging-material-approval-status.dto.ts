import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePackagingMaterialDto } from './create-packaging-material.dto';
import {
  IsNotEmpty,
  IsEnum,
  IsDate,
  IsString,
  IsDateString,
} from 'class-validator';
import { MaterialApprovalStatus } from 'src/utils/enums/material-approval-status.enum';

export class PackagingMaterialApprovalStatusDto extends PartialType(
  CreatePackagingMaterialDto,
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
