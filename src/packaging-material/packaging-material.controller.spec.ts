import { Test, TestingModule } from '@nestjs/testing';
import { PackagingMaterialController } from './packaging-material.controller';
import { PackagingMaterialService } from './packaging-material.service';

describe('PackagingMaterialController', () => {
  let controller: PackagingMaterialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackagingMaterialController],
      providers: [PackagingMaterialService],
    }).compile();

    controller = module.get<PackagingMaterialController>(PackagingMaterialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
