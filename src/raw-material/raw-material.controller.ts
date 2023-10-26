import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  Query,
  Req,
} from '@nestjs/common';
import { RawMaterialService } from './raw-material.service';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto';
import { UpdateRawMaterialDto } from './dto/update-raw-material.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { SETTINGS } from 'app.utils';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { RawMaterialApprovalStatusDto } from './dto/raw-material-approval-status.dto';
import { MaterialApprovalStatus } from 'src/utils/enums/material-approval-status.enum';

@ApiTags('rawMaterial')
@Controller('rawMaterial')
export class RawMaterialController {
  constructor(private readonly rawMaterialService: RawMaterialService) {}

  // private readonly relations = [
  //   {
  //     firstArg: 'entity.supplier',
  //     secondArg: 'supplier',
  //   },
  //   {
  //     firstArg: 'supplier.supplierContact',
  //     secondArg: 'supplierContact',
  //   },
  //   {
  //     firstArg: 'entity.company',
  //     secondArg: 'company',
  //   },
  //   {
  //     firstArg: 'company.currency',
  //     secondArg: 'currencies',
  //   },
  // ];

  @Post()
  async create(
    @Body(SETTINGS.VALIDATION_PIPE) createRawMaterialDto: CreateRawMaterialDto,
  ) {
    try {
      return await this.rawMaterialService.createRawMaterial(
        createRawMaterialDto,
      );
    } catch (error) {
      if (error.code === '23505') {
        // PostgreSQL error code for unique constraint violation
        throw new ConflictException(
          'Duplicate entry. Please provide unique values.',
        );
      }
      console.log(error);
    }
  }

  @Get()
  async paginatedData(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Req() req: Request,
  ) {
    page = page || 1; // Default to page 1
    limit = limit || 10; // Default to 10 items per page
    const companyId = req['user'].companyId;

    return await this.rawMaterialService.paginatedByCompany(
      page,
      limit,
      companyId,
    );
  }

  @Get('All')
  async findAll(@Req() req: Request) {
    const companyId = req['user'].companyId;
    return await this.rawMaterialService.findAllByCompany(companyId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.rawMaterialService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(SETTINGS.VALIDATION_PIPE) updateRawMaterialDto: UpdateRawMaterialDto,
  ) {
    return await this.rawMaterialService.update(id, updateRawMaterialDto);
  }

  @Patch(':id/approvalStatus')
  async rawMaterialApprovalStatus(
    @Param('id') id: string,
    @Body(SETTINGS.VALIDATION_PIPE)
    materialApprovalStatusDto: RawMaterialApprovalStatusDto,
  ) {
    try {
      return await this.rawMaterialService.rawMaterialApprovalStatus(
        id,
        materialApprovalStatusDto,
      );
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':approvalStatus/approvalStatus')
  async filterByApprovalStatus(
    @Param('approvalStatus') approvalStatus: MaterialApprovalStatus,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Req() req: Request,
  ) {
    page = page || 1; // Default to page 1
    limit = limit || 10; // Default to 10 items per page
    const companyId = req['user'].companyId;

    return await this.rawMaterialService.findByApprovalStatus(
      approvalStatus,
      page,
      limit,
      companyId,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.rawMaterialService.remove(id);
  }
}
