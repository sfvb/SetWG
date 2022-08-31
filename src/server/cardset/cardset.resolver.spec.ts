import { Test, TestingModule } from '@nestjs/testing';
import { CardsetResolver } from './cardset.resolver';
import { CardsetService } from './cardset.service';

describe('CardsetResolver', () => {
  let resolver: CardsetResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardsetResolver, CardsetService],
    }).compile();

    resolver = module.get<CardsetResolver>(CardsetResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
