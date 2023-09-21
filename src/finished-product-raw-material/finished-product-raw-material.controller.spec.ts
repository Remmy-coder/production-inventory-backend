import { Test, TestingModule } from '@nestjs/testing';
import { FinishedProductRawMaterialController } from './finished-product-raw-material.controller';
import { FinishedProductRawMaterialService } from './finished-product-raw-material.service';

describe('FinishedProductRawMaterialController', () => {
  let controller: FinishedProductRawMaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinishedProductRawMaterialController],
      providers: [FinishedProductRawMaterialService],
    }).compile();

    controller = module.get<FinishedProductRawMaterialController>(FinishedProductRawMaterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
