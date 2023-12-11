import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { SeederService } from './seeders/seeder.service';
import { CurrenciesProviders } from './currencies/currencies.providers';
import { AuthModule } from './auth/auth.module';
import { SupplierModule } from './supplier/supplier.module';
import { SupplierContactModule } from './supplier-contact/supplier-contact.module';
import { RawMaterialModule } from './raw-material/raw-material.module';
import { PackagingMaterialModule } from './packaging-material/packaging-material.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './utils/exceptionFilters/http-exception.filter';
import { FinishedProductModule } from './finished-product/finished-product.module';
import { FinishedProductRawMaterialModule } from './finished-product-raw-material/finished-product-raw-material.module';
import { FinishedProductPackagingMaterialModule } from './finished-product-packaging-material/finished-product-packaging-material.module';
import configuration from './config/configuration';
import { MailerModule } from '@nestjs-modules/mailer';
import { CustomMailerModule } from './custom-mailer/custom-mailer.module';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { TransformResponseInterceptor } from './utils/interceptors/transformResponseInterceptor';

@Module({
  imports: [
    DatabaseModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.MAILER_HOST,
        port: parseInt(process.env.MAILER_PORT),
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASS,
        },
      },
      template: {
        dir: 'dist/custom-mailer/mail-templates',
        adapter: new HandlebarsAdapter(),
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    CompanyModule,
    UserModule,
    CurrenciesModule,
    AuthModule,
    SupplierModule,
    SupplierContactModule,
    RawMaterialModule,
    PackagingMaterialModule,
    FinishedProductModule,
    FinishedProductRawMaterialModule,
    FinishedProductPackagingMaterialModule,
    CustomMailerModule,
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
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly seederService: SeederService) {}

  async onApplicationBootstrap() {
    await this.seederService.seedAll();
  }
}
