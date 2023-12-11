import { Module } from '@nestjs/common';
import { CustomMailerService } from './custom-mailer.service';
import { CustomMailerController } from './custom-mailer.controller';

@Module({
  providers: [CustomMailerService],
  controllers: [CustomMailerController],
})
export class CustomMailerModule {}
