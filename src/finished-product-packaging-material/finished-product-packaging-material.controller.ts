import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FinishedProductPackagingMaterialService } from './finished-product-packaging-material.service';
import { CreateFinishedProductPackagingMaterialDto } from './dto/create-finished-product-packaging-material.dto';
import { UpdateFinishedProductPackagingMaterialDto } from './dto/update-finished-product-packaging-material.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('finishedProductPackagingMaterial')
export class FinishedProductPackagingMaterialController {
  constructor(
    private readonly finishedProductPackagingMaterialService: FinishedProductPackagingMaterialService,
  ) {}

  // @Post()
  // create(
  //   @Body()
  //   createFinishedProductPackagingMaterialDto: CreateFinishedProductPackagingMaterialDto,
  // ) {
  //   return this.finishedProductPackagingMaterialService.create(
  //     createFinishedProductPackagingMaterialDto,
  //   );
  // }

  // @Get()
  // findAll() {
  //   return this.finishedProductPackagingMaterialService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.finishedProductPackagingMaterialService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body()
  //   updateFinishedProductPackagingMaterialDto: UpdateFinishedProductPackagingMaterialDto,
  // ) {
  //   return this.finishedProductPackagingMaterialService.update(
  //     +id,
  //     updateFinishedProductPackagingMaterialDto,
  //   );
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.finishedProductPackagingMaterialService.remove(+id);
  // }
}
