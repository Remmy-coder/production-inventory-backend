import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CompanyModule } from './company/company.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { SeederService } from './seeders/seeder.service';
import { currenciesProviders } from './currencies/currencies.providers';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    CompanyModule,
    UserModule,
    CurrenciesModule,
  ],
  controllers: [AppController],
  providers: [...currenciesProviders, AppService, SeederService],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly seederService: SeederService) {}

  async onApplicationBootstrap() {
    await this.seederService.seedAll();
  }
}
