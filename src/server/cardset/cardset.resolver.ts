import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CardsetService } from './cardset.service';
import { UpdateCardsetInput } from './dto/update-cardset.input';
import { Cardset } from './entities/cardset.entity';

@Resolver('Cardset')
export class CardsetResolver {
  constructor(private readonly cardsetService: CardsetService) {}

  @Mutation('createCardset')
  create(): Promise<Cardset> {
    return this.cardsetService.create();
  }

  @Query('cardset')
  findAll() {
    return this.cardsetService.findAll();
  }

  @Query('cardset')
  findOne(@Args('id') id: string) {
    return this.cardsetService.findOne(id);
  }

  @Mutation('updateCardset')
  update(@Args('updateCardsetInput') updateCardsetInput: UpdateCardsetInput) {
    return this.cardsetService.update(
      updateCardsetInput.id,
      updateCardsetInput,
    );
  }

  @Mutation('removeCardset')
  remove(@Args('id') id: string) {
    return this.cardsetService.remove(id);
  }
}
