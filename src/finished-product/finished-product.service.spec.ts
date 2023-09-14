import { Test, TestingModule } from '@nestjs/testing';
import { FinishedProductService } from './finished-product.service';

describe('FinishedProductService', () => {
  let service: FinishedProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FinishedProductService],
    }).compile();

    service = module.get<FinishedProductService>(FinishedProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
