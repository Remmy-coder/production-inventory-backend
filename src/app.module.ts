import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CompanyModule } from './company/company.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { SeederService } from './seeders/seeder.service';
import { CurrenciesProviders } from './currencies/currencies.providers';
import { AuthModule } from './auth/auth.module';
import { SupplierModule } from './supplier/supplier.module';
import { SupplierContactModule } from './supplier-contact/supplier-contact.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    CompanyModule,
    UserModule,
    CurrenciesModule,
    AuthModule,
    SupplierModule,
    SupplierContactModule,
  ],
  controllers: [AppController],
  providers: [...CurrenciesProviders, AppService, SeederService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly seederService: SeederService) {}

  async onApplicationBootstrap() {
    await this.seederService.seedAll();
  }
}
