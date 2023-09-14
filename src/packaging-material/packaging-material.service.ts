import {
  Injectable,
  Inject,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePackagingMaterialDto } from './dto/create-packaging-material.dto';
import { UpdatePackagingMaterialDto } from './dto/update-packaging-material.dto';
import { AbstractService } from 'src/common/abstract/abstract.service';
import { PackagingMaterial } from './entities/packaging-material.entity';
import { packagingMaterialConstants } from './packaging-material.constants';
import { Repository } from 'typeorm';
import { CompanyService } from 'src/company/company.service';
import { SupplierService } from 'src/supplier/supplier.service';

@Injectable()
export class PackagingMaterialService extends AbstractService<PackagingMaterial> {
  constructor(
    @Inject(packagingMaterialConstants.provide)
    private packagingMaterialRepository: Repository<PackagingMaterial>,
    private companyService: CompanyService,
    private supplierService: SupplierService,
  ) {
    super(packagingMaterialRepository, [
      'supplier',
      'company',
      'supplier.supplierContact',
      'company.currency',
    ]);
  }

  async createPackagingMaterial(
    createPackagingMaterialDto: CreatePackagingMaterialDto,
  ): Promise<PackagingMaterial> {
    const supplier = await this.supplierService.findById(
      createPackagingMaterialDto.supplierId,
    );

    if (!supplier) {
      throw new ConflictException('Supplier does not exists');
    }

    const company = await this.companyService.findById(supplier.company.id);

    if (!company) {
      throw new ConflictException('Company does not exists');
    }

    // const packagingMaterial = new PackagingMaterial();
    // Object.assign(packagingMaterial, createPackagingMaterialDto);
    // packagingMaterial.company = company;
    // packagingMaterial.supplier = supplier;

    return this.create(
      createPackagingMaterialDto,
      PackagingMaterial, // Provide the entity class constructor.
      (dto) => ({
        company,
        supplier,
      }),
    );
  }

  async updatePackagingMaterial(
    id: string,
    updatePackagingMaterialDto: UpdatePackagingMaterialDto,
  ): Promise<PackagingMaterial> {
    const options: any = { id };
    const entity = await this.packagingMaterialRepository.findOne({
      where: options,
    });

    const supplier = await this.supplierService.findById(
      updatePackagingMaterialDto.supplierId,
    );

    if (!entity) throw new NotFoundException('Packaging material not found!');

    if (!supplier) throw new NotFoundException('Supplier not found');

    if (entity.company.id !== supplier.company.id)
      throw new ConflictException('Supplier does not belong to this company.');

    entity.name = updatePackagingMaterialDto.name || entity.name;
    entity.barcode = updatePackagingMaterialDto.barcode || entity.barcode;
    entity.sku = updatePackagingMaterialDto.sku || entity.sku;
    entity.basePrice = updatePackagingMaterialDto.basePrice || entity.basePrice;
    entity.quantity = updatePackagingMaterialDto.quantity || entity.quantity;
    entity.reserve = updatePackagingMaterialDto.reserve || entity.reserve;
    entity.unit = updatePackagingMaterialDto.unit || entity.unit;
    entity.supplier = supplier || entity.supplier;

    return await entity.save();
  }
}
