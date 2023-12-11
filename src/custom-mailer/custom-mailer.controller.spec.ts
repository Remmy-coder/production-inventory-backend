import { Test, TestingModule } from '@nestjs/testing';
import { CustomMailerController } from './custom-mailer.controller';

describe('CustomMailerController', () => {
  let controller: CustomMailerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomMailerController],
    }).compile();

    controller = module.get<CustomMailerController>(CustomMailerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
