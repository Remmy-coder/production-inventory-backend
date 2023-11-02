import {
  Injectable,
  Inject,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreatePackagingMaterialDto } from './dto/create-packaging-material.dto';
import { UpdatePackagingMaterialDto } from './dto/update-packaging-material.dto';
import { AbstractService } from 'src/common/abstract/abstract.service';
import { PackagingMaterial } from './entities/packaging-material.entity';
import { packagingMaterialConstants } from './packaging-material.constants';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CompanyService } from 'src/company/company.service';
import { SupplierService } from 'src/supplier/supplier.service';
import { RawMaterialApprovalStatusDto } from 'src/raw-material/dto/raw-material-approval-status.dto';
import { MaterialApprovalStatus } from 'src/utils/enums/material-approval-status.enum';
import { PaginationResponseDto } from 'src/utils/pagination/pagination-response.dto';
import { PackagingMaterialApprovalStatusDto } from './dto/packaging-material-approval-status.dto';

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
    try {
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
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updatePackagingMaterial(
    id: string,
    updatePackagingMaterialDto: UpdatePackagingMaterialDto,
  ): Promise<PackagingMaterial> {
    try {
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
        throw new ConflictException(
          'Supplier does not belong to this company.',
        );

      entity.name = updatePackagingMaterialDto.name || entity.name;
      entity.barcode = updatePackagingMaterialDto.barcode || entity.barcode;
      entity.sku = updatePackagingMaterialDto.sku || entity.sku;
      entity.basePrice =
        updatePackagingMaterialDto.basePrice || entity.basePrice;
      entity.quantity = updatePackagingMaterialDto.quantity || entity.quantity;
      entity.reserve = updatePackagingMaterialDto.reserve || entity.reserve;
      entity.unit = updatePackagingMaterialDto.unit || entity.unit;
      entity.supplier = supplier || entity.supplier;

      return await entity.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async packagingMaterialApprovalStatus(
    id: string,
    materialApprovalStatusDto: PackagingMaterialApprovalStatusDto,
  ): Promise<PackagingMaterial> {
    try {
      const options: any = { id };
      const entity = await this.packagingMaterialRepository.findOne({
        where: options,
      });

      if (!entity) throw new NotFoundException('Raw material not found!');

      if (
        materialApprovalStatusDto.approvalStatus ==
        MaterialApprovalStatus.APPROVED
      ) {
        entity.approvalStatus = MaterialApprovalStatus.APPROVED;
        entity.approvalDate = new Date();
      }

      if (
        materialApprovalStatusDto.approvalStatus ==
        MaterialApprovalStatus.DISAPPROVED
      ) {
        this.handleDisapproval(materialApprovalStatusDto, entity);
      }

      return await entity.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async handleDisapproval(
    materialApprovalStatusDto: PackagingMaterialApprovalStatusDto,
    entity: PackagingMaterial,
  ): Promise<void> {
    try {
      if (materialApprovalStatusDto.reasonForDisapproval != undefined) {
        entity.approvalStatus = MaterialApprovalStatus.DISAPPROVED;
        entity.approvalDate = new Date();
        entity.reasonForDisapproval =
          materialApprovalStatusDto.reasonForDisapproval;
      } else {
        throw new ConflictException(
          'Reason for disapproval is required when a material is marked as disapproved.',
        );
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findByApprovalStatus(
    approvalStatus: MaterialApprovalStatus,
    page: number,
    limit: number,
    companyId: string,
  ): Promise<PaginationResponseDto<PackagingMaterial>> {
    try {
      const [data, totalCount] =
        await this.packagingMaterialRepository.findAndCount({
          where: {
            approvalStatus: approvalStatus,
            company: {
              id: companyId,
            },
          } as unknown as
            | FindOptionsWhere<PackagingMaterial>
            | FindOptionsWhere<PackagingMaterial>[],
          relations: [
            'supplier',
            'company',
            'supplier.supplierContact',
            'company.currency',
          ],
          skip: (page - 1) * limit,
          take: limit,
        });
      const totalPages = Math.ceil(totalCount / limit);

      const paginatedResponse: PaginationResponseDto<PackagingMaterial> = {
        data,
        meta: {
          totalCount,
          totalPages,
          currentPage: page,
          pageSize: limit,
        },
      };

      return paginatedResponse;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
