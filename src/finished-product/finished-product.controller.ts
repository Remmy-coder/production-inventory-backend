import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FinishedProductService } from './finished-product.service';
import { CreateFinishedProductDto } from './dto/create-finished-product.dto';
import { UpdateFinishedProductDto } from './dto/update-finished-product.dto';

@Controller('finished-product')
export class FinishedProductController {
  constructor(private readonly finishedProductService: FinishedProductService) {}

  @Post()
  create(@Body() createFinishedProductDto: CreateFinishedProductDto) {
    return this.finishedProductService.create(createFinishedProductDto);
  }

  @Get()
  findAll() {
    return this.finishedProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.finishedProductService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFinishedProductDto: UpdateFinishedProductDto) {
    return this.finishedProductService.update(+id, updateFinishedProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.finishedProductService.remove(+id);
  }
}
