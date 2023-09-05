import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth.login.dto';
import { Public } from './decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';

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
  async signIn(@Body() signInDto: AuthLoginDto) {
    return this.authService.signIn(signInDto);
  }

  @Public()
  @Get('verifyOtp/:id/:otp')
  async verifyOtp(@Param('id') userId: string, @Param('otp') otp: string) {
    const { userData, otpRes } = await this.authService.verifyOtp(userId, otp);

    if (otpRes) {
      const payload = { sub: userData.id, username: userData.email };
      return {
        accessToken: await this.jwtService.signAsync(payload),
        userData: userData,
      };
    } else {
      return { message: 'OTP verification failed' };
    }
  }
}
