import { Injectable, Inject, ConflictException } from '@nestjs/common';
import { CreateFinishedProductDto } from './dto/create-finished-product.dto';
import { UpdateFinishedProductDto } from './dto/update-finished-product.dto';
import { AbstractService } from 'src/common/abstract/abstract.service';
import { FinishedProduct } from './entities/finished-product.entity';
import { finishedProductConstants } from './finished-product.constants';
import { Repository } from 'typeorm';
import { FinishedProductRawMaterial } from 'src/finished-product-raw-material/entities/finished-product-raw-material.entity';
import { FinishedProductPackagingMaterial } from 'src/finished-product-packaging-material/entities/finished-product-packaging-material.entity';
import { FinishedProductRawMaterialService } from 'src/finished-product-raw-material/finished-product-raw-material.service';
import { RawMaterialService } from 'src/raw-material/raw-material.service';
import { FinishedProductPackagingMaterialService } from 'src/finished-product-packaging-material/finished-product-packaging-material.service';
import { PackagingMaterialService } from 'src/packaging-material/packaging-material.service';
import { CompanyService } from 'src/company/company.service';
import { RawMaterial } from 'src/raw-material/entities/raw-material.entity';
import { Company } from 'src/company/entities/company.entity';
import { PackagingMaterial } from 'src/packaging-material/entities/packaging-material.entity';

@Injectable()
export class FinishedProductService extends AbstractService<FinishedProduct> {
  constructor(
    @Inject(finishedProductConstants.provide)
    private finishedProductRepository: Repository<FinishedProduct>,
    private companyService: CompanyService,
    private finishedProductRawMaterialService: FinishedProductRawMaterialService,
    private rawMaterialService: RawMaterialService,
    private finishedProductPackagingMaterialService: FinishedProductPackagingMaterialService,
    private packagingMaterialService: PackagingMaterialService,
  ) {
    super(finishedProductRepository, [
      'finishedProductRawMaterial',
      'finishedProductRawMaterial.rawMaterial',
      'finishedProductPackagingMaterial',
      'finishedProductPackagingMaterial.packagingMaterial',
    ]);
  }

  async debitItem(
    item: RawMaterial | PackagingMaterial,
    usedQuantity: number,
  ): Promise<void> {
    item.quantity -= usedQuantity;
    await item.save();
  }

  async createProduct(
    createFinishedProductDto: CreateFinishedProductDto,
  ): Promise<any> {
    const company = await this.companyService.findById(
      createFinishedProductDto.companyId,
    );

    if (!company) {
      throw new ConflictException('Company does not exists');
    }

    const finishedProduct = new FinishedProduct();
    Object.assign(finishedProduct, createFinishedProductDto);
    finishedProduct.company = company;
    //await finishedProduct.save();
    //this.finishedProductRepository.create(finishedProduct);

    const rawMaterialDummy: FinishedProductRawMaterial[] = [];

    const packagingMaterialDummy: FinishedProductPackagingMaterial[] = [];

    for (const rawMaterials of createFinishedProductDto.finishedProductRawMaterial) {
      const { rawMaterialId, usedQuantity } = rawMaterials;

      const rawMaterial = await this.rawMaterialService.findById(rawMaterialId);

      if (!rawMaterial) {
        throw new ConflictException('Raw material does not exist');
      }

      if (rawMaterial.quantity - usedQuantity <= rawMaterial.reserve) {
        throw new ConflictException(
          'Raw material quantity is less or equal to the reorder level. Kindly Restock and try again',
        );
      }

      this.debitItem(rawMaterial, usedQuantity);

      // rawMaterial.quantity -= usedQuantity;
      // await rawMaterial.save();

      const finishedProductRawMaterial = new FinishedProductRawMaterial();
      //finishedProductRawMaterial.finishedProduct = finishedProduct;
      finishedProductRawMaterial.rawMaterial = rawMaterial;
      finishedProductRawMaterial.usedQuantity = usedQuantity;

      await finishedProductRawMaterial.save();
      rawMaterialDummy.push(finishedProductRawMaterial);
    }

    for (const packagingMaterials of createFinishedProductDto.finishedProductPackagingMaterial) {
      const { packagingMaterialId, usedQuantity } = packagingMaterials;

      const packagingMaterial = await this.packagingMaterialService.findById(
        packagingMaterialId,
      );

      if (!packagingMaterial) {
        throw new ConflictException('Packaging material does not exist');
      }

      if (
        packagingMaterial.quantity - usedQuantity <=
        packagingMaterial.reserve
      ) {
        throw new ConflictException(
          'Packaging material quantity is less or equal to the reorder level. Kindly Restock and try again',
        );
      }

      this.debitItem(packagingMaterial, usedQuantity);

      // packagingMaterial.quantity -= usedQuantity;
      // await packagingMaterial.save();

      const finishedProductPackagingMaterial =
        new FinishedProductPackagingMaterial();
      //finishedProductPackagingMaterial.finishedProduct = finishedProduct;
      finishedProductPackagingMaterial.packagingMaterial = packagingMaterial;
      finishedProductPackagingMaterial.usedQuantity = usedQuantity;

      await finishedProductPackagingMaterial.save();
      packagingMaterialDummy.push(finishedProductPackagingMaterial);
    }

    finishedProduct.finishedProductRawMaterial = rawMaterialDummy;
    finishedProduct.finishedProductPackagingMaterial = packagingMaterialDummy;

    //console.log(finishedProduct);

    return await finishedProduct.save();
  }
}
