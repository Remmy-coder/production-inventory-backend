import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { companyConstants } from './company.constants';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CompanyService {
  constructor(
    @Inject(companyConstants.provide)
    private companyRepository: Repository<Company>,
  ) {}

  async companyRegistration(
    createCompanyDto: CreateCompanyDto,
  ): Promise<Company> {
    const generatedID = uuidv4();
    const company = new Company();
    company.id = generatedID;
    company.name = createCompanyDto.name;
    company.email = createCompanyDto.email;
    company.country = createCompanyDto.country;
    company.state = createCompanyDto.state;
    company.address = createCompanyDto.address;

    return await company.save();
  }

  async findAll(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  async findOne(id: string): Promise<Company> {
    const options: any = { id };
    const entity = await this.companyRepository.findOne({
      where: options,
    });

    return entity;
  }

  async updateCompany(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const options: any = { id };
    const entity = await this.companyRepository.findOne({
      where: options,
    });

    if (!entity) throw new NotFoundException('Company not found!');

    entity.name = updateCompanyDto.name || entity.name;
    entity.email = updateCompanyDto.email || entity.email;
    entity.country = updateCompanyDto.country || entity.country;
    entity.state = updateCompanyDto.state || entity.state;
    entity.address = updateCompanyDto.address || entity.address;

    return this.companyRepository.save(entity);
  }

  async remove(id: string): Promise<Company> {
    const options: any = { id };
    const entity = await this.companyRepository.findOne({
      where: options,
    });

    if (!entity) throw new NotFoundException('Company not found!');

    return this.companyRepository.remove(entity);
  }
}
