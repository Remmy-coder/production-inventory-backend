import {
  Injectable,
  Inject,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
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
import { MaterialApprovalStatus } from 'src/utils/enums/material-approval-status.enum';
import { FinishedProductApprovalStatusDto } from './dto/finished-product-approval-status.dto';
import { PaginationResponseDto } from 'src/utils/pagination/pagination-response.dto';

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

    const rawMaterialDummy: FinishedProductRawMaterial[] = [];

    const packagingMaterialDummy: FinishedProductPackagingMaterial[] = [];

    for (const rawMaterials of createFinishedProductDto.finishedProductRawMaterial) {
      const { rawMaterialId, usedQuantity } = rawMaterials;

      const rawMaterial = await this.rawMaterialService.findById(rawMaterialId);

      if (!rawMaterial) {
        throw new ConflictException('Raw material does not exist');
      }

      const finishedProductRawMaterial = new FinishedProductRawMaterial();
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

      const finishedProductPackagingMaterial =
        new FinishedProductPackagingMaterial();
      finishedProductPackagingMaterial.packagingMaterial = packagingMaterial;
      finishedProductPackagingMaterial.usedQuantity = usedQuantity;

      await finishedProductPackagingMaterial.save();
      packagingMaterialDummy.push(finishedProductPackagingMaterial);
    }

    finishedProduct.finishedProductRawMaterial = rawMaterialDummy;
    finishedProduct.finishedProductPackagingMaterial = packagingMaterialDummy;

    return await finishedProduct.save();
  }

  async finishedProductApprovalStatus(
    id: string,
    productApprovalStatusDto: FinishedProductApprovalStatusDto,
  ): Promise<FinishedProduct> {
    const options: any = { id };
    const entity = await this.finishedProductRepository.findOne({
      where: options,
      relations: [
        'finishedProductRawMaterial',
        'finishedProductRawMaterial.rawMaterial',
        'finishedProductPackagingMaterial',
        'finishedProductPackagingMaterial.packagingMaterial',
      ],
    });

    if (!entity) throw new NotFoundException('Finished product not found!');

    if (
      productApprovalStatusDto.approvalStatus == MaterialApprovalStatus.APPROVED
    ) {
      for (const materials of Object.values(
        entity.finishedProductRawMaterial,
      )) {
        const { usedQuantity, rawMaterial } = materials;

        if (rawMaterial.quantity - usedQuantity <= rawMaterial.reserve) {
          throw new ConflictException(
            'Raw material quantity is less or equal to the reorder level. Kindly Restock and try again',
          );
        }

        rawMaterial.quantity -= usedQuantity;
      }

      for (const materials of Object.values(
        entity.finishedProductPackagingMaterial,
      )) {
        const { usedQuantity, packagingMaterial } = materials;

        if (
          packagingMaterial.quantity - usedQuantity <=
          packagingMaterial.reserve
        ) {
          throw new ConflictException(
            'Packaging material quantity is less or equal to the reorder level. Kindly Restock and try again',
          );
        }

        packagingMaterial.quantity -= usedQuantity;
      }
      entity.approvalStatus = MaterialApprovalStatus.APPROVED;
      entity.approvalDate = new Date();
    }

    if (
      productApprovalStatusDto.approvalStatus ==
      MaterialApprovalStatus.DISAPPROVED
    ) {
      this.handleDisapproval(productApprovalStatusDto, entity);
    }

    return await entity.save();
  }

  async handleDisapproval(
    productApprovalStatusDto: FinishedProductApprovalStatusDto,
    entity: FinishedProduct,
  ): Promise<void> {
    if (productApprovalStatusDto.reasonForDisapproval != undefined) {
      entity.approvalStatus = MaterialApprovalStatus.DISAPPROVED;
      entity.approvalDate = new Date();
      entity.reasonForDisapproval =
        productApprovalStatusDto.reasonForDisapproval;
    } else {
      throw new ConflictException(
        'Reason for disapproval is required when a product is marked as disapproved.',
      );
    }
  }

  async findByApprovalStatus(
    approvalStatus: MaterialApprovalStatus,
    page: number,
    limit: number,
    companyId: string,
  ): Promise<PaginationResponseDto<FinishedProduct>> {
    const [data, totalCount] =
      await this.finishedProductRepository.findAndCount({
        where: {
          approvalStatus: approvalStatus,
          company: {
            id: companyId,
          },
        },
        relations: [
          'finishedProductRawMaterial',
          'finishedProductRawMaterial.rawMaterial',
          'finishedProductPackagingMaterial',
          'finishedProductPackagingMaterial.packagingMaterial',
        ],
        skip: (page - 1) * limit,
        take: limit,
      });
    const totalPages = Math.ceil(totalCount / limit);

    const paginatedResponse: PaginationResponseDto<FinishedProduct> = {
      data,
      meta: {
        totalCount,
        totalPages,
        currentPage: page,
        pageSize: limit,
      },
    };

    return paginatedResponse;
  }
}
