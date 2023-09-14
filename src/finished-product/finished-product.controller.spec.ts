import { Test, TestingModule } from '@nestjs/testing';
import { FinishedProductController } from './finished-product.controller';
import { FinishedProductService } from './finished-product.service';

describe('FinishedProductController', () => {
  let controller: FinishedProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FinishedProductController],
      providers: [FinishedProductService],
    }).compile();

    controller = module.get<FinishedProductController>(FinishedProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
