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
import { SetCompanyCurrencyDto } from './dto/set-company-currency.dto';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Public()
  @Post()
  async create(
    @Body(SETTINGS.VALIDATION_PIPE) createCompanyDto: CreateCompanyDto,
  ) {
    const company = await this.companyService.companyRegistration(
      createCompanyDto,
    );
    return company;
  }

  @Get()
  async paginatedData(
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
    @Body(SETTINGS.VALIDATION_PIPE) updateCompanyDto: UpdateCompanyDto,
  ) {
    return await this.companyService.updateCompany(id, updateCompanyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.companyService.remove(id);
  }

  @Patch(':id/addCurrency')
  async addCurrency(
    @Param('id') id: string,
    @Body(SETTINGS.VALIDATION_PIPE)
    addCurrencyCompanyDto: SetCompanyCurrencyDto,
  ) {
    return await this.companyService.addCurrency(id, addCurrencyCompanyDto);
  }

  @Public()
  @Get('companyActivation/:token')
  async activateCompany(@Param('token') token: string) {
    return await this.companyService.activateCompany(token);
  }
}
