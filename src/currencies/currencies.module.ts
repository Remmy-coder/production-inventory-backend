import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CurrenciesProviders } from './currencies.providers';
import { CompanyProviders } from 'src/company/company.providers';
import { CompanyService } from 'src/company/company.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CurrenciesController],
  providers: [...CurrenciesProviders, CurrenciesService],
})
export class CurrenciesModule {}
