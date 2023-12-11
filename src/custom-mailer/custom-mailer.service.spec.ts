import { Test, TestingModule } from '@nestjs/testing';
import { CustomMailerService } from './custom-mailer.service';

describe('CustomMailerService', () => {
  let service: CustomMailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomMailerService],
    }).compile();

    service = module.get<CustomMailerService>(CustomMailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
