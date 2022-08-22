import { Test, TestingModule } from '@nestjs/testing';
import { CardspotService } from './cardspot.service';

describe('CardspotService', () => {
  let service: CardspotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardspotService],
    }).compile();

    service = module.get<CardspotService>(CardspotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
