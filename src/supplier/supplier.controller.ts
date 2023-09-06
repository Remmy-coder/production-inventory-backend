import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
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

  @Post()
  async create(
    @Body(SETTINGS.VALIDATION_PIPE) createSupplierDto: CreateSupplierDto,
  ) {
    return this.supplierService.supplierRegistration(createSupplierDto);
  }

  @Public()
  @Get()
  async paginatedUser(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    page = page || 1; // Default to page 1
    limit = limit || 10; // Default to 10 items per page

    return await this.supplierService.paginated(page, limit);
  }

  @Get('All')
  async findAll() {
    return await this.supplierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return await this.supplierService.update(id, updateSupplierDto);
  }

  @Public()
  @Patch('contact/:id')
  async updateContact(
    @Param('id') id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.supplierService.updateSupplierContact(id, updateSupplierDto);
  }

  // @Public()
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.supplierService.remove(id);
  // }
}
