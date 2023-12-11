import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  Inject,
  ServiceUnavailableException,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { AuthLoginDto } from './dto/auth.login.dto';
import * as speakeasy from 'speakeasy';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { userConstants } from 'src/user/user.constants';
import { CustomMailerService } from 'src/custom-mailer/custom-mailer.service';
import { IOtpMailPayload } from 'src/custom-mailer/interfaces/otpMail.interface';

interface IResOtp {
  userData?: Partial<User>;
  otpRes: boolean;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @Inject(userConstants.provide)
    private userRepository: Repository<User>,
    private customMailerService: CustomMailerService,
  ) {}

  async signIn(authLoginDto: AuthLoginDto): Promise<any> {
    try {
      const user = await this.userService.findOneByEmail(authLoginDto.email);
      if (!user) throw new NotFoundException('User not found!');

      const isMatch = await bcrypt.compare(
        authLoginDto.password,
        user.password,
      );
      if (!isMatch) {
        throw new UnauthorizedException(
          'Please use a valid email and password',
        );
      }

      const currentTime = new Date();

      //Generate otp once every 2
      if (
        user.otpGeneratedAt &&
        currentTime.getTime() - user.otpGeneratedAt.getTime() < 2 * 60 * 1000
      ) {
        throw new ServiceUnavailableException(
          'OTP can only be generated once within every 2 minutes, Kindly wait and try again!',
        );
      }

      const { password, ...result } = user;

      const otpSecret = speakeasy.generateSecret({ length: 20 }).base32;

      const token = speakeasy.totp({
        secret: otpSecret,
        encoding: 'base32',
      });

      user.otpSecret = otpSecret;
      user.otpToken = token;
      user.otpGeneratedAt = currentTime;
      await this.userRepository.save(user);

      const emailPayload: IOtpMailPayload = {
        firstName: user.firstName,
        otpToken: token,
        email: user.email,
      };

      this.customMailerService.loginOtpEmail(emailPayload);

      return {
        message: 'OTP has been sent to your mail.',
        userId: user.id,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async verifyOtp(userId: string, otp: string): Promise<IResOtp> {
    try {
      const user = await this.userService.findOne(userId);
      if (!user) throw new NotFoundException('User not found!');

      const currentTime = new Date();

      if (
        !user.otpSecret ||
        !user.otpToken ||
        currentTime.getTime() - user.otpGeneratedAt.getTime() > 2 * 60 * 1000
      ) {
        return {
          otpRes: false,
        }; // OTP expired
      }

      const isVerified = speakeasy.totp.verify({
        secret: user.otpSecret,
        encoding: 'base32',
        token: String(otp),
        window: 2,
      });

      if (isVerified) {
        user.otpSecret = null;
        user.otpToken = null;
        await this.userRepository.save(user);
      }

      const { password, ...result } = user;

      return {
        userData: user,
        otpRes: isVerified,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
