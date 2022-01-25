import { Test, TestingModule } from '@nestjs/testing';
import { LongTermReservedService } from './long-term-reserved.service';

describe('LongTermReservedService', () => {
  let service: LongTermReservedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LongTermReservedService],
    }).compile();

    service = module.get<LongTermReservedService>(LongTermReservedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
