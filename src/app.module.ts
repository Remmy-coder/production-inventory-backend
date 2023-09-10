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
import { RawMaterialModule } from './raw-material/raw-material.module';
import { PackagingMaterialModule } from './packaging-material/packaging-material.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './utils/exceptionFilters/http-exception.filter';

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
    RawMaterialModule,
    PackagingMaterialModule,
  ],
  controllers: [AppController],
  providers: [
    ...CurrenciesProviders,
    AppService,
    SeederService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly seederService: SeederService) {}

  async onApplicationBootstrap() {
    await this.seederService.seedAll();
  }
}
