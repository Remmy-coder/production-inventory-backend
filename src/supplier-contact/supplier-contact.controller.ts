import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SupplierContactService } from './supplier-contact.service';
import { CreateSupplierContactDto } from './dto/create-supplier-contact.dto';
import { UpdateSupplierContactDto } from './dto/update-supplier-contact.dto';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { SupplierContact } from './entities/supplier-contact.entity';

@ApiExcludeController()
@Controller('supplier-contact')
export class SupplierContactController {
  constructor(
    private readonly supplierContactService: SupplierContactService,
  ) {}

  // @Post()
  // create(@Body() createSupplierContactDto: CreateSupplierContactDto) {
  //   return this.supplierContactService.create(
  //     createSupplierContactDto,
  //     SupplierContact,
  //   );
  // }

  // @Get()
  // findAll() {
  //   return this.supplierContactService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.supplierContactService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateSupplierContactDto: UpdateSupplierContactDto,
  // ) {
  //   return this.supplierContactService.update(+id, updateSupplierContactDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.supplierContactService.remove(+id);
  // }
}
