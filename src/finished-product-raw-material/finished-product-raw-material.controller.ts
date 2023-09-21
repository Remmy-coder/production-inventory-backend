import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FinishedProductRawMaterialService } from './finished-product-raw-material.service';
import { CreateFinishedProductRawMaterialDto } from './dto/create-finished-product-raw-material.dto';
import { UpdateFinishedProductRawMaterialDto } from './dto/update-finished-product-raw-material.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller('finishedProductRawMaterial')
export class FinishedProductRawMaterialController {
  constructor(
    private readonly finishedProductRawMaterialService: FinishedProductRawMaterialService,
  ) {}

  // @Post()
  // create(
  //   @Body()
  //   createFinishedProductRawMaterialDto: CreateFinishedProductRawMaterialDto,
  // ) {
  //   return this.finishedProductRawMaterialService.create(
  //     createFinishedProductRawMaterialDto,
  //   );
  // }

  // @Get()
  // findAll() {
  //   return this.finishedProductRawMaterialService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.finishedProductRawMaterialService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body()
  //   updateFinishedProductRawMaterialDto: UpdateFinishedProductRawMaterialDto,
  // ) {
  //   return this.finishedProductRawMaterialService.update(
  //     +id,
  //     updateFinishedProductRawMaterialDto,
  //   );
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.finishedProductRawMaterialService.remove(+id);
  // }
}
