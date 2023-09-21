import { Test, TestingModule } from '@nestjs/testing';
import { FinishedProductPackagingMaterialService } from './finished-product-packaging-material.service';

describe('FinishedProductPackagingMaterialService', () => {
  let service: FinishedProductPackagingMaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinishedProductPackagingMaterialService],
    }).compile();

    service = module.get<FinishedProductPackagingMaterialService>(FinishedProductPackagingMaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
