import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRawMaterialDto } from './dto/create-raw-material.dto';
import { UpdateRawMaterialDto } from './dto/update-raw-material.dto';
import { AbstractService } from 'src/common/abstract/abstract.service';
import { RawMaterial } from './entities/raw-material.entity';
import { rawMaterialConstants } from './raw-material.constants';
import { Repository } from 'typeorm';
import { CompanyService } from 'src/company/company.service';
import { SupplierService } from 'src/supplier/supplier.service';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { SupplierContact } from 'src/supplier-contact/entities/supplier-contact.entity';

@Injectable()
export class RawMaterialService extends AbstractService<RawMaterial> {
  constructor(
    @Inject(rawMaterialConstants.provide)
    private rawMaterialRepository: Repository<RawMaterial>,
    private companyService: CompanyService,
    private supplierService: SupplierService,
  ) {
    super(rawMaterialRepository, [
      'supplier',
      'company',
      'supplier.supplierContact',
      'company.currency',
    ]);
  }

  async createRawMaterial(
    createRawMaterialDto: CreateRawMaterialDto,
  ): Promise<RawMaterial> {
    const supplier = await this.supplierService.findById(
      createRawMaterialDto.supplierId,
    );

    if (!supplier) {
      throw new ConflictException('Supplier does not exists');
    }

    const company = await this.companyService.findById(supplier.company.id);

    if (!company) {
      throw new ConflictException('Company does not exists');
    }

    const rawMaterial = new RawMaterial();
    Object.assign(rawMaterial, createRawMaterialDto);
    rawMaterial.company = company;
    rawMaterial.supplier = supplier;

    return await rawMaterial.save();
  }

  async updateRawMaterial(
    id: string,
    updateRawMaterialDto: UpdateRawMaterialDto,
  ): Promise<RawMaterial> {
    const options: any = { id };
    const entity = await this.rawMaterialRepository.findOne({
      where: options,
    });

    const supplier = await this.supplierService.findById(
      updateRawMaterialDto.supplierId,
    );

    if (!entity) throw new NotFoundException('Raw material not found!');

    if (!supplier) throw new NotFoundException('Supplier not found');

    if (entity.company.id !== supplier.company.id)
      throw new ConflictException('Supplier does not belong to this company.');

    entity.name = updateRawMaterialDto.name || entity.name;
    entity.barcode = updateRawMaterialDto.barcode || entity.barcode;
    entity.sku = updateRawMaterialDto.sku || entity.sku;
    entity.basePrice = updateRawMaterialDto.basePrice || entity.basePrice;
    entity.quantity = updateRawMaterialDto.quantity || entity.quantity;
    entity.reserve = updateRawMaterialDto.reserve || entity.reserve;
    entity.unit = updateRawMaterialDto.unit || entity.unit;
    entity.supplier = supplier || entity.supplier;

    return await entity.save();
  }

  // async getFullInfoMany(): Promise<RawMaterial[]> {
  //   return this.rawMaterialRepository
  //     .createQueryBuilder('rawMaterial')
  //     .leftJoinAndSelect('rawMaterial.supplier', 'supplier')
  //     .leftJoinAndSelect('supplier.supplierContact', 'supplierContact')
  //     .leftJoinAndSelect('rawMaterial.company', 'company')
  //     .leftJoinAndSelect('company.currency', 'currencies')
  //     .getMany();
  // }

  // async getFullInfo(id: string): Promise<RawMaterial> {
  //   return this.rawMaterialRepository
  //     .createQueryBuilder('rawMaterial')
  //     .leftJoinAndSelect('rawMaterial.supplier', 'supplier')
  //     .leftJoinAndSelect('supplier.supplierContact', 'supplierContact')
  //     .leftJoinAndSelect('rawMaterial.company', 'company')
  //     .leftJoinAndSelect('company.currency', 'currencies')
  //     .where('rawMaterial.id = :id', { id })
  //     .getOne();
  // }
}
