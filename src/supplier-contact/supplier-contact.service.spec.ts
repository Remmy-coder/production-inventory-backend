import { Test, TestingModule } from '@nestjs/testing';
import { SupplierContactService } from './supplier-contact.service';

describe('SupplierContactService', () => {
  let service: SupplierContactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplierContactService],
    }).compile();

    service = module.get<SupplierContactService>(SupplierContactService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
