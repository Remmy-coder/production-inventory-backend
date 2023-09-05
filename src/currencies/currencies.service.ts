import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { currenciesConstants } from './currencies.constants';
import { Repository } from 'typeorm';
import { Currencies } from './entities/currencies.entity';
import { CompanyService } from 'src/company/company.service';
import { Company } from 'src/company/entities/company.entity';

@Injectable()
export class CurrenciesService {
  constructor(
    @Inject(currenciesConstants.provide)
    private currencyRepository: Repository<Currencies>,
  ) {}

  // create(createCurrencyDto: CreateCurrencyDto) {
  //   return 'This action adds a new currency';
  // }

  async findAll(): Promise<Currencies[]> {
    return await this.currencyRepository.find();
  }

  async findOneByCode(cc: string): Promise<Currencies> {
    const options: any = { cc };
    const entity = await this.currencyRepository.findOne({
      where: {
        cc: cc,
      },
    });
    return entity;
  }

  update(id: number, updateCurrencyDto: UpdateCurrencyDto) {
    return `This action updates a #${id} currency`;
  }

  remove(id: number) {
    return `This action removes a #${id} currency`;
  }
}
