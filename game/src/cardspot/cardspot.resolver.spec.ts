import { Test, TestingModule } from '@nestjs/testing';
import { CardspotResolver } from './cardspot.resolver';
import { CardspotService } from './cardspot.service';

describe('CardspotResolver', () => {
  let resolver: CardspotResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardspotResolver, CardspotService],
    }).compile();

    resolver = module.get<CardspotResolver>(CardspotResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
