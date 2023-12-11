import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomMailerService } from './custom-mailer.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { IOtpMailPayload } from './interfaces/otpMail.interface';
import { IUserEmailVerificationPayload } from './interfaces/userEmailVerification.interface';
import { ICompanyActivationEmailPayload } from './interfaces/companyActivationEmail.interface';

@ApiTags('mailerService')
@Controller('mailerService')
export class CustomMailerController {
  constructor(private customMailerService: CustomMailerService) {}

  @Public()
  @Get('testingMailer')
  async testingMailer(@Query('toemail') toemail: string) {
    return await this.customMailerService.testingEmailSending(toemail);
  }

  @Public()
  @Post('testingHtmlEmail')
  async testingHtmlEmail(@Body() payload: IOtpMailPayload) {
    return await this.customMailerService.loginOtpEmail(payload);
  }

  @Public()
  @Post('testingUserVerificationEmail')
  async testingUserVerificationEmail(
    @Body() payload: IUserEmailVerificationPayload,
  ) {
    return await this.customMailerService.userEmailVerification(payload);
  }

  @Public()
  @Post('testingCompanyActivationEmail')
  async testingCompanyActivationEmail(
    @Body() payload: ICompanyActivationEmailPayload,
  ) {
    return await this.customMailerService.companyActivationEmail(payload);
  }
}
