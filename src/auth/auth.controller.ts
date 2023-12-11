import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth.login.dto';
import { Public } from './decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { SETTINGS } from 'app.utils';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body(SETTINGS.VALIDATION_PIPE) signInDto: AuthLoginDto) {
    return await this.authService.signIn(signInDto);
  }

  @Public()
  @Patch('verifyOtp/:id/:otp')
  async verifyOtp(@Param('id') userId: string, @Param('otp') otp: string) {
    const { userData, otpRes } = await this.authService.verifyOtp(userId, otp);

    if (otpRes) {
      const payload = {
        sub: userData.id,
        username: userData.email,
        companyId: userData.company.id,
      };
      return {
        accessToken: await this.jwtService.signAsync(payload),
        userData: userData,
      };
    } else {
      throw new HttpException(
        'OTP verification failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
