import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UserProviders } from './user.providers';
import { CompanyService } from 'src/company/company.service';
import { CompanyProviders } from 'src/company/company.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    ...UserProviders,
    ...CompanyProviders,
    UserService,
    CompanyService,
  ],
})
export class UserModule {}
