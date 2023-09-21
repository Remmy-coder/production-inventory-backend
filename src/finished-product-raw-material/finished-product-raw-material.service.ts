import { Inject, Injectable } from '@nestjs/common';
import { CreateFinishedProductRawMaterialDto } from './dto/create-finished-product-raw-material.dto';
import { UpdateFinishedProductRawMaterialDto } from './dto/update-finished-product-raw-material.dto';
import { finishedProductRawMaterialConstants } from './finished-product-raw-material.constants';
import { Repository } from 'typeorm';
import { FinishedProductRawMaterial } from './entities/finished-product-raw-material.entity';
import { AbstractService } from 'src/common/abstract/abstract.service';

@Injectable()
export class FinishedProductRawMaterialService extends AbstractService<FinishedProductRawMaterial> {
  constructor(
    @Inject(finishedProductRawMaterialConstants.provide)
    private finishedProductRawMaterialRepository: Repository<FinishedProductRawMaterial>,
  ) {
    super(finishedProductRawMaterialRepository);
  }
}
