import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { UserProviders } from 'src/user/user.providers';
import { DatabaseModule } from 'src/database/database.module';
import { CompanyProviders } from 'src/company/company.providers';
import { CompanyService } from 'src/company/company.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrenciesProviders } from 'src/currencies/currencies.providers';
import { CurrenciesService } from 'src/currencies/currencies.service';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    ...UserProviders,
    ...CompanyProviders,
    ...CurrenciesProviders,
    UserService,
    CompanyService,
    CurrenciesService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
