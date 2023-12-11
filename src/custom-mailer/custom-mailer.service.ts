import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IOtpMailPayload } from './interfaces/otpMail.interface';
import { IUserEmailVerificationPayload } from './interfaces/userEmailVerification.interface';
import { ICompanyActivationEmailPayload } from './interfaces/companyActivationEmail.interface';

@Injectable()
export class CustomMailerService {
  constructor(private mailerService: MailerService) {}

  async testingEmailSending(toemail: string): Promise<string> {
    await this.mailerService.sendMail({
      to: toemail,
      from: process.env.MAILER_USER,
      subject: 'Simple Plain Text',
      text: 'Welcome to pms email demo',
    });

    return 'success';
  }

  async loginOtpEmail(payload: IOtpMailPayload): Promise<string> {
    await this.mailerService.sendMail({
      to: payload.email,
      from: process.env.MAILER_USER,
      subject: 'Login OTP',
      template: 'otpForLogin',
      context: {
        user: payload,
      },
    });

    return 'success';
  }

  async userEmailVerification(
    payload: IUserEmailVerificationPayload,
  ): Promise<string> {
    await this.mailerService.sendMail({
      to: payload.email,
      from: process.env.MAILER_USER,
      subject: 'Email Verification',
      template: 'userEmailVerification',
      context: {
        user: payload,
      },
    });

    return 'success';
  }

  async companyActivationEmail(
    payload: ICompanyActivationEmailPayload,
  ): Promise<string> {
    await this.mailerService.sendMail({
      to: payload.email,
      from: 'remmy.ro@gmail.com',
      subject: 'Activate Your Production Inventory Account',
      template: 'companyActivationEmail',
      context: {
        user: payload,
      },
    });

    return 'success';
  }
}
