import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { companyConstants } from './company.constants';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @Inject(companyConstants.provide)
    private companyRepository: Repository<Company>,
  ) {}

  async companyRegistration(
    createCompanyDto: CreateCompanyDto,
  ): Promise<Company> {
    const company = new Company();
    company.name = createCompanyDto.name;
    company.email = createCompanyDto.email;
    company.address = createCompanyDto.address;

    return await company.save();
  }

  findAll() {
    return `This action returns all company`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
