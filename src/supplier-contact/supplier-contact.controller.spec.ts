import { Test, TestingModule } from '@nestjs/testing';
import { SupplierContactController } from './supplier-contact.controller';
import { SupplierContactService } from './supplier-contact.service';

describe('SupplierContactController', () => {
  let controller: SupplierContactController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierContactController],
      providers: [SupplierContactService],
    }).compile();

    controller = module.get<SupplierContactController>(SupplierContactController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
