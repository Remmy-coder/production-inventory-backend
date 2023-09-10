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
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { ApiTags } from '@nestjs/swagger/dist';
import { SETTINGS } from 'app.utils';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { AddCurrencyCompanyDto } from './dto/addCurrency-company.dto';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Public()
  @Post()
  async create(
    @Body(SETTINGS.VALIDATION_PIPE) createCompanyDto: CreateCompanyDto,
  ) {
    try {
      const company = await this.companyService.companyRegistration(
        createCompanyDto,
      );
      return company;
    } catch (error) {
      if (error.code === '23505') {
        // PostgreSQL error code for unique constraint violation
        throw new ConflictException(
          'Duplicate entry. Please provide unique values.',
        );
      }
      // console.log(error);
    }
  }

  @Get()
  async paginatedUser(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    page = page || 1; // Default to page 1
    limit = limit || 10; // Default to 10 items per page

    return this.companyService.paginated(page, limit);
  }

  @Get('All')
  async findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const company = await this.companyService.findById(id);
    if (company) return company;
    else throw new HttpException('Company not found!', HttpStatus.BAD_REQUEST);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return await this.companyService.updateCompany(id, updateCompanyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.companyService.remove(id);
  }

  @Patch(':id/addCurrency')
  async addCurrency(
    @Param('id') id: string,
    @Body(SETTINGS.VALIDATION_PIPE)
    addCurrencyCompanyDto: AddCurrencyCompanyDto,
  ) {
    return await this.companyService.addCurrency(id, addCurrencyCompanyDto);
  }
}
