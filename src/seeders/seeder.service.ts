import { Inject, Injectable } from '@nestjs/common';
import dataSource from 'db/data-source';
import { currenciesConstants } from 'src/currencies/currencies.constants';
import { currenciesSeed } from 'src/currencies/currencies.seed';
import { Currencies } from 'src/currencies/entities/currencies.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeederService {
  constructor(
    @Inject(currenciesConstants.provide)
    private readonly currenciesRepository: Repository<Currencies>,
  ) {}

  async seedCurrencies() {
    const queryRunner = dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Perform the seeding logic using the Insert Query Builder
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('currencies')
        .values(currenciesSeed)
        .execute();

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async seedAll() {
    const currencies = await this.currenciesRepository.find();

    if (currencies.length > 0) {
      console.log('currency table is already populated');
    } else if (currencies.length === 0) {
      await this.seedCurrencies();
    }

    // Add more seed methods for other entities if needed
  }
}
