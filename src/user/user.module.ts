import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserProviders } from './user.providers';
import { CompanyService } from 'src/company/company.service';
import { CompanyProviders } from 'src/company/company.providers';
import { CurrenciesProviders } from 'src/currencies/currencies.providers';
import { CurrenciesService } from 'src/currencies/currencies.service';
import { CustomMailerService } from 'src/custom-mailer/custom-mailer.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    ...UserProviders,
    ...CompanyProviders,
    ...CurrenciesProviders,
    UserService,
    CompanyService,
    CurrenciesService,
    CustomMailerService,
  ],
})
export class UserModule {}
