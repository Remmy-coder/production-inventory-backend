import { Test, TestingModule } from '@nestjs/testing';
import { FinishedProductPackagingMaterialController } from './finished-product-packaging-material.controller';
import { FinishedProductPackagingMaterialService } from './finished-product-packaging-material.service';

describe('FinishedProductPackagingMaterialController', () => {
  let controller: FinishedProductPackagingMaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinishedProductPackagingMaterialController],
      providers: [FinishedProductPackagingMaterialService],
    }).compile();

    controller = module.get<FinishedProductPackagingMaterialController>(FinishedProductPackagingMaterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
