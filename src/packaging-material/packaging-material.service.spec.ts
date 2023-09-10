import { Test, TestingModule } from '@nestjs/testing';
import { PackagingMaterialService } from './packaging-material.service';

describe('PackagingMaterialService', () => {
  let service: PackagingMaterialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PackagingMaterialService],
    }).compile();

    service = module.get<PackagingMaterialService>(PackagingMaterialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
