import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyProviders } from './company.providers';
import { DatabaseModule } from 'src/database/database.module';
import { CurrenciesProviders } from 'src/currencies/currencies.providers';
import { CurrenciesService } from 'src/currencies/currencies.service';
import { UserProviders } from 'src/user/user.providers';
import { CustomMailerService } from 'src/custom-mailer/custom-mailer.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CompanyController],
  providers: [
    ...UserProviders,
    ...CompanyProviders,
    ...CurrenciesProviders,
    CompanyService,
    CurrenciesService,
    CustomMailerService,
  ],
})
export class CompanyModule {}
