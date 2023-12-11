import {
  BadRequestException,
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
import { CurrenciesService } from 'src/currencies/currencies.service';
import { SetCompanyCurrencyDto } from './dto/set-company-currency.dto';
import { AbstractService } from 'src/common/abstract/abstract.service';
import { CompanyActivationStatus } from 'src/utils/enums/company-activation-status.enum';
import { ICompanyActivationEmailPayload } from 'src/custom-mailer/interfaces/companyActivationEmail.interface';
import { CustomMailerService } from 'src/custom-mailer/custom-mailer.service';

@Injectable()
export class CompanyService extends AbstractService<Company> {
  constructor(
    @Inject(companyConstants.provide)
    private companyRepository: Repository<Company>,
    private readonly currenciesService: CurrenciesService,
    private readonly customMailerService: CustomMailerService,
  ) {
    super(companyRepository, ['currency']);
  }

  async companyRegistration(
    createCompanyDto: CreateCompanyDto,
  ): Promise<Company> {
    try {
      const generatedID = uuidv4();
      const company = new Company();
      company.id = generatedID;
      company.name = createCompanyDto.name;
      company.email = createCompanyDto.email;
      company.country = createCompanyDto.country;
      company.state = createCompanyDto.state;
      company.address = createCompanyDto.address;

      const newlyCreatedCompany = await company.save();

      const emailPayload: ICompanyActivationEmailPayload = {
        activationUrl: `http://localhost:3002/company/companyActivation/${newlyCreatedCompany.activationToken}`,
        email: newlyCreatedCompany.email,
      };

      this.customMailerService.companyActivationEmail(emailPayload);

      return newlyCreatedCompany;
    } catch (error) {
      //Promise.reject(error);
      throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
    }
  }

  async updateCompany(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    try {
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
    } catch (error) {
      throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
    }
  }

  async addCurrency(
    id: string,
    addCurrencyCompanyDto: SetCompanyCurrencyDto,
  ): Promise<Company> {
    try {
      const companyId: any = { id };

      const company = await this.companyRepository.findOne({
        where: companyId,
      });

      const currency = await this.currenciesService.findOneByCode(
        addCurrencyCompanyDto.cc,
      );

      if (!company) throw new NotFoundException('Company not found!');

      if (!currency) throw new NotFoundException('Currency not found!');

      company.currency = currency;

      return this.companyRepository.save(company);
    } catch (error) {
      throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string): Promise<Company> {
    try {
      const options: any = { id };
      const entity = await this.companyRepository.findOne({
        where: options,
      });

      if (!entity) throw new NotFoundException('Company not found!');

      return this.companyRepository.remove(entity);
    } catch (error) {
      throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
    }
  }

  async activateCompany(activationToken: string): Promise<Company> {
    try {
      const company = await this.companyRepository.findOne({
        where: { activationToken: activationToken },
      });

      if (!company) {
        throw new NotFoundException('Company not found');
      }
      company.activationStatus = CompanyActivationStatus.ACTIVATED;
      company.activationDate = new Date();

      return this.companyRepository.save(company);
    } catch (error) {
      throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
    }
  }
}
