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
import { PackagingMaterialService } from './packaging-material.service';
import { CreatePackagingMaterialDto } from './dto/create-packaging-material.dto';
import { UpdatePackagingMaterialDto } from './dto/update-packaging-material.dto';
import { ApiTags } from '@nestjs/swagger';
import { SETTINGS } from 'app.utils';
import { Request } from 'express';

@ApiTags('packagingMaterial')
@Controller('packagingMaterial')
export class PackagingMaterialController {
  constructor(
    private readonly packagingMaterialService: PackagingMaterialService,
  ) {}

  @Post()
  async create(
    @Body(SETTINGS.VALIDATION_PIPE)
    createPackagingMaterialDto: CreatePackagingMaterialDto,
  ) {
    try {
      return await this.packagingMaterialService.createPackagingMaterial(
        createPackagingMaterialDto,
      );
    } catch (error) {
      if (error.code === '23505') {
        // PostgreSQL error code for unique constraint violation
        throw new ConflictException(
          'Duplicate entry. Please provide unique values.',
        );
      }
    }
  }

  @Get()
  async paginatedUser(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Req() req: Request,
  ) {
    page = page || 1; // Default to page 1
    limit = limit || 10; // Default to 10 items per page
    const companyId = req['user'].companyId;

    return await this.packagingMaterialService.paginatedByCompany(
      page,
      limit,
      companyId,
    );
  }

  @Get('All')
  async findAll(@Req() req: Request) {
    const companyId = req['user'].companyId;
    return await this.packagingMaterialService.findAllByCompany(companyId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.packagingMaterialService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePackagingMaterialDto: UpdatePackagingMaterialDto,
  ) {
    return this.packagingMaterialService.updatePackagingMaterial(
      id,
      updatePackagingMaterialDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packagingMaterialService.remove(id);
  }
}
