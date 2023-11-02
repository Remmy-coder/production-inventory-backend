import {
  BadRequestException,
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
import { FindOptionsWhere, Repository } from 'typeorm';
import { CompanyService } from 'src/company/company.service';
import { SupplierService } from 'src/supplier/supplier.service';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { SupplierContact } from 'src/supplier-contact/entities/supplier-contact.entity';
import { RawMaterialApprovalStatusDto } from './dto/raw-material-approval-status.dto';
import { MaterialApprovalStatus } from 'src/utils/enums/material-approval-status.enum';
import { PaginationResponseDto } from 'src/utils/pagination/pagination-response.dto';

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
    try {
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

      // const rawMaterial = new RawMaterial();
      // Object.assign(rawMaterial, createRawMaterialDto);
      // rawMaterial.company = company;
      // rawMaterial.supplier = supplier;

      // return await rawMaterial.save();

      return this.create(
        createRawMaterialDto,
        RawMaterial, // Provide the entity class constructor.
        (dto) => ({
          company,
          supplier,
        }),
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateRawMaterial(
    id: string,
    updateRawMaterialDto: UpdateRawMaterialDto,
  ): Promise<RawMaterial> {
    try {
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
        throw new ConflictException(
          'Supplier does not belong to this company.',
        );

      entity.name = updateRawMaterialDto.name || entity.name;
      entity.barcode = updateRawMaterialDto.barcode || entity.barcode;
      entity.sku = updateRawMaterialDto.sku || entity.sku;
      entity.basePrice = updateRawMaterialDto.basePrice || entity.basePrice;
      entity.quantity = updateRawMaterialDto.quantity || entity.quantity;
      entity.reserve = updateRawMaterialDto.reserve || entity.reserve;
      entity.unit = updateRawMaterialDto.unit || entity.unit;
      entity.supplier = supplier || entity.supplier;

      return await entity.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async rawMaterialApprovalStatus(
    id: string,
    materialApprovalStatusDto: RawMaterialApprovalStatusDto,
  ): Promise<RawMaterial> {
    try {
      const options: any = { id };
      const entity = await this.rawMaterialRepository.findOne({
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
    materialApprovalStatusDto: RawMaterialApprovalStatusDto,
    entity: RawMaterial,
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
  ): Promise<PaginationResponseDto<RawMaterial>> {
    try {
      const [data, totalCount] = await this.rawMaterialRepository.findAndCount({
        where: {
          approvalStatus: approvalStatus,
          company: {
            id: companyId,
          },
        } as unknown as
          | FindOptionsWhere<RawMaterial>
          | FindOptionsWhere<RawMaterial>[],
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

      const paginatedResponse: PaginationResponseDto<RawMaterial> = {
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
