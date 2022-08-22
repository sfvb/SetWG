import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { CardService } from 'src/card/card.service';
import { Card } from 'src/card/entities/card.entity';
import { CardspotService } from './cardspot.service';
import { CreateCardspotInput } from './dto/create-cardspot.input';
import { UpdateCardspotInput } from './dto/update-cardspot.input';
import { Cardspot } from './entities/cardspot.entity';

@Resolver('Cardspot')
export class CardspotResolver {
  constructor(
    private readonly cardspotService: CardspotService,
    private cardService: CardService,
  ) {}

  @Mutation('createCardspot')
  create(
    @Args('createCardspotInput') createCardspotInput: CreateCardspotInput,
  ) {
    return this.cardspotService.create(createCardspotInput);
  }

  @Query('cardspot')
  findAll() {
    return this.cardspotService.findAll();
  }

  @Query('cardspot')
  findOne(@Args('id') id: string) {
    return this.cardspotService.findOne(id);
  }

  @Mutation('removeCardspot')
  remove(@Args('id') id: number) {
    return this.cardspotService.remove(id);
  }
}
