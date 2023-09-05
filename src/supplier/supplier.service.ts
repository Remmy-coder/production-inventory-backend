import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { AbstractService } from 'src/common/abstract/abstract.service';
import { Supplier } from './entities/supplier.entity';
import { supplierConstants } from './supplier.constants';
import { Repository } from 'typeorm';
import { SupplierContact } from 'src/supplier-contact/entities/supplier-contact.entity';
import { SupplierContactService } from 'src/supplier-contact/supplier-contact.service';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class SupplierService extends AbstractService<Supplier> {
  constructor(
    @Inject(supplierConstants.provide)
    private supplierRepository: Repository<Supplier>,
    private supplierContactService: SupplierContactService,
    private companyService: CompanyService,
  ) {
    super(supplierRepository);
  }

  async supplierRegistration(
    createSupplierDto: CreateSupplierDto,
  ): Promise<Supplier> {
    const company = await this.companyService.findById(
      createSupplierDto.companyId,
    );

    if (!company) {
      throw new ConflictException('Company does not exists');
    }

    const contact = new SupplierContact();
    contact.firstName = createSupplierDto.supplierContact.firstName;
    contact.lastName = createSupplierDto.supplierContact.lastName;
    contact.email = createSupplierDto.supplierContact.email;
    contact.dialcode = createSupplierDto.supplierContact.dialcode;
    contact.phoneNumber = createSupplierDto.supplierContact.phoneNumber;
    contact.save();

    // const contact:  = this.supplierContactService.create(
    //   createSupplierDto.supplierContact,
    // );

    const supplier = new Supplier();
    supplier.name = createSupplierDto.name;
    supplier.country = createSupplierDto.country;
    supplier.state = createSupplierDto.state;
    supplier.address = createSupplierDto.address;
    supplier.website = createSupplierDto.website;
    supplier.supplierContact = contact;
    supplier.company = company;

    return supplier.save();
  }
}
