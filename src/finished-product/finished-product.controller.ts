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
import { FinishedProductService } from './finished-product.service';
import { CreateFinishedProductDto } from './dto/create-finished-product.dto';
import { UpdateFinishedProductDto } from './dto/update-finished-product.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { SETTINGS } from 'app.utils';
import { Request } from 'express';
import { FinishedProductApprovalStatusDto } from './dto/finished-product-approval-status.dto';
import { MaterialApprovalStatus } from 'src/utils/enums/material-approval-status.enum';

@ApiTags('finishedProduct')
@Controller('finishedProduct')
export class FinishedProductController {
  constructor(
    private readonly finishedProductService: FinishedProductService,
  ) {}

  @Post()
  async create(
    @Body(SETTINGS.VALIDATION_PIPE)
    createFinishedProductDto: CreateFinishedProductDto,
  ) {
    try {
      return await this.finishedProductService.createProduct(
        createFinishedProductDto,
      );
    } catch (error) {
      if (error.code === '23505') {
        // PostgreSQL error code for unique constraint violation
        throw new ConflictException(
          'Duplicate entry. Please provide unique values.',
        );
      }
      if (error.status === 409) {
        throw new ConflictException(error.response.message);
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
    return this.finishedProductService.paginatedByCompany(
      page,
      limit,
      companyId,
    );
  }

  @Get('All')
  async findAll(@Req() req: Request) {
    const companyId = req['user'].companyId;
    return await this.finishedProductService.findAllByCompany(companyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.finishedProductService.findById(id);
  }

  @Patch(':id/approvalStatus')
  async finishedProductApprovalStatus(
    @Param('id') id: string,
    @Body(SETTINGS.VALIDATION_PIPE)
    productApprovalStatus: FinishedProductApprovalStatusDto,
  ) {
    try {
      return await this.finishedProductService.finishedProductApprovalStatus(
        id,
        productApprovalStatus,
      );
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':approvalStatus')
  async filterByApprovalStatus(
    @Param('approvalStatus') approvalStatus: MaterialApprovalStatus,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Req() req: Request,
  ) {
    page = page || 1; // Default to page 1
    limit = limit || 10; // Default to 10 items per page
    const companyId = req['user'].companyId;
    return await this.finishedProductService.findByApprovalStatus(
      approvalStatus,
      page,
      limit,
      companyId,
    );
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateFinishedProductDto: UpdateFinishedProductDto,
  // ) {
  //   return this.finishedProductService.update(+id, updateFinishedProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.finishedProductService.remove(+id);
  // }
}
