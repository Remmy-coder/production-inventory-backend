import { Inject, Injectable } from '@nestjs/common';
import { CreateFinishedProductPackagingMaterialDto } from './dto/create-finished-product-packaging-material.dto';
import { UpdateFinishedProductPackagingMaterialDto } from './dto/update-finished-product-packaging-material.dto';
import { AbstractService } from 'src/common/abstract/abstract.service';
import { FinishedProductPackagingMaterial } from './entities/finished-product-packaging-material.entity';
import { finishedProductPackagingMaterialConstants } from './finished-product-packaging-material.constants';
import { Repository } from 'typeorm';

@Injectable()
export class FinishedProductPackagingMaterialService extends AbstractService<FinishedProductPackagingMaterial> {
  constructor(
    @Inject(finishedProductPackagingMaterialConstants.provide)
    private finishedProductPackagingMaterialRepository: Repository<FinishedProductPackagingMaterial>,
  ) {
    super(finishedProductPackagingMaterialRepository);
  }
}
