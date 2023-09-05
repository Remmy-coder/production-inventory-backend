import { Module } from '@nestjs/common';
import { SupplierContactService } from './supplier-contact.service';
import { SupplierContactController } from './supplier-contact.controller';
import { SupplierContactProviders } from './supplier-contact.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SupplierContactController],
  providers: [...SupplierContactProviders, SupplierContactService],
})
export class SupplierContactModule {}
