import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { DatabaseModule } from 'src/database/database.module';
import { currenciesProviders } from './currencies.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CurrenciesController],
  providers: [...currenciesProviders, CurrenciesService],
})
export class CurrenciesModule {}
