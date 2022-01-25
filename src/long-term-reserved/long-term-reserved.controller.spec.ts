import { Test, TestingModule } from '@nestjs/testing';
import { LongTermReservedController } from './long-term-reserved.controller';

describe('LongTermReservedController', () => {
  let controller: LongTermReservedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LongTermReservedController],
    }).compile();

    controller = module.get<LongTermReservedController>(LongTermReservedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
