import { Test, TestingModule } from '@nestjs/testing';
import { FinishedProductRawMaterialService } from './finished-product-raw-material.service';

describe('FinishedProductRawMaterialService', () => {
  let service: FinishedProductRawMaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinishedProductRawMaterialService],
    }).compile();

    service = module.get<FinishedProductRawMaterialService>(FinishedProductRawMaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
