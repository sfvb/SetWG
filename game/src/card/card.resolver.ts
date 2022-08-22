import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CardService } from './card.service';
import { CreateCardInput } from './dto/create-card.input';
import { UpdateCardInput } from './dto/update-card.input';
import { Card } from './entities/card.entity';

@Resolver('Card')
export class CardResolver {
  constructor(private readonly cardService: CardService) {}

  @Mutation('createCard')
  create(@Args('createCardInput') createCardInput: CreateCardInput) {
    createCardInput.isVisible = false;
    createCardInput.hasBeenTaken = false;
    return this.cardService.create(createCardInput);
  }

  @Query(() => [Card])
  cards(): Promise<Card[]> {
    return this.cardService.findAll();
  }

  @Query('card')
  card(@Args('id') id: string) {
    return this.cardService.findOne(id);
  }

  @Mutation('removeCard')
  remove(@Args('id') id: number) {
    return this.cardService.remove(id);
  }
}
