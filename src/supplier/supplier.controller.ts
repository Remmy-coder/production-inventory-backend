import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { SETTINGS } from 'app.utils';

@ApiTags('supplier')
@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Public()
  @Post()
  async create(
    @Body(SETTINGS.VALIDATION_PIPE) createSupplierDto: CreateSupplierDto,
  ) {
    return this.supplierService.supplierRegistration(createSupplierDto);
  }

  @Get()
  findAll() {
    return this.supplierService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.supplierService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateSupplierDto: UpdateSupplierDto,
  // ) {
  //   return this.supplierService.update(+id, updateSupplierDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.supplierService.remove(+id);
  // }
}
