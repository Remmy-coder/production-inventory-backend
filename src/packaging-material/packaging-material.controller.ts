import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PackagingMaterialService } from './packaging-material.service';
import { CreatePackagingMaterialDto } from './dto/create-packaging-material.dto';
import { UpdatePackagingMaterialDto } from './dto/update-packaging-material.dto';

@Controller('packaging-material')
export class PackagingMaterialController {
  constructor(private readonly packagingMaterialService: PackagingMaterialService) {}

  @Post()
  create(@Body() createPackagingMaterialDto: CreatePackagingMaterialDto) {
    return this.packagingMaterialService.create(createPackagingMaterialDto);
  }

  @Get()
  findAll() {
    return this.packagingMaterialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packagingMaterialService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePackagingMaterialDto: UpdatePackagingMaterialDto) {
    return this.packagingMaterialService.update(+id, updatePackagingMaterialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packagingMaterialService.remove(+id);
  }
}
