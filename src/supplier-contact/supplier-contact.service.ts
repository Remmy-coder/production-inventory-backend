import { Injectable, Inject } from '@nestjs/common';
import { CreateSupplierContactDto } from './dto/create-supplier-contact.dto';
import { UpdateSupplierContactDto } from './dto/update-supplier-contact.dto';
import { AbstractService } from 'src/common/abstract/abstract.service';
import { SupplierContact } from './entities/supplier-contact.entity';
import { supplierContactConstants } from './supplier-contact.constants';
import { Repository } from 'typeorm';

@Injectable()
export class SupplierContactService extends AbstractService<SupplierContact> {
  constructor(
    @Inject(supplierContactConstants.provide)
    private supplierContactRepository: Repository<SupplierContact>,
  ) {
    super(supplierContactRepository);
  }
}
