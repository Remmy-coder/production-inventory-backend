import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    super(supplierRepository, [
      'supplierContact',
      'company',
      'company.currency',
      'rawMaterials',
    ]);
  }

  async supplierRegistration(
    createSupplierDto: CreateSupplierDto,
  ): Promise<Supplier> {
    try {
      const company = await this.companyService.findById(
        createSupplierDto.companyId,
      );

      if (!company) {
        throw new ConflictException('Company does not exists');
      }

      const contact = new SupplierContact();
      //Object.assign(contact, createSupplierDto.supplierContact);
      // await contact.save();

      //const supplier = new Supplier();
      // Object.assign(supplier, createSupplierDto);
      // supplier.supplierContact = contact;
      // supplier.company = company;

      return this.create(createSupplierDto, Supplier, (dto) => ({
        company,
        contact,
      }));
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateSupplierContact(
    id: string,
    updateSupplierDto: UpdateSupplierDto,
  ): Promise<SupplierContact> {
    try {
      const option: any = { id };
      const entity = await this.supplierRepository.findOne({
        where: option,
      });

      const entity2 = await this.supplierContactService.findById(
        updateSupplierDto.supplierContact.id,
      );

      if (!entity || !entity2)
        throw new NotFoundException('Supplier not found!');

      entity2.firstName =
        updateSupplierDto.supplierContact.firstName || entity2.firstName;
      entity2.lastName =
        updateSupplierDto.supplierContact.lastName || entity2.lastName;
      entity2.email = updateSupplierDto.supplierContact.email || entity2.email;
      entity2.dialcode =
        updateSupplierDto.supplierContact.dialcode || entity2.dialcode;
      entity2.phoneNumber =
        updateSupplierDto.supplierContact.phoneNumber || entity2.phoneNumber;

      return await entity2.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
