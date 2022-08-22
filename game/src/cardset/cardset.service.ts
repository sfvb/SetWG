import { Injectable } from '@nestjs/common';
import { Parent, ResolveField } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { CardService } from 'src/card/card.service';
import { Card } from 'src/card/entities/card.entity';
import { Repository } from 'typeorm';
import { CreateCardsetInput } from './dto/create-cardset.input';
import { UpdateCardsetInput } from './dto/update-cardset.input';
import { Cardset } from './entities/cardset.entity';

@Injectable()
export class CardsetService {
  constructor(
    @InjectRepository(Cardset) private cardsetRepository: Repository<Cardset>,
    private cardService: CardService,
  ) {}

  async create(): Promise<Cardset> {
    const createCardsetInput = new CreateCardsetInput();
    createCardsetInput.cards = [];
    const colors = ['blue', 'red', 'green'];
    const shapes = ['triangle', 'circle', 'square'];
    const amounts = ['1', '2', '3'];
    for (let colorIndex = 0; colorIndex < colors.length; colorIndex++) {
      for (let shapeIndex = 0; shapeIndex < shapes.length; shapeIndex++) {
        for (let amountIndex = 0; amountIndex < amounts.length; amountIndex++) {
          const newCard = await this.cardService.create({
            amount: amounts[amountIndex],
            color: colors[colorIndex],
            shape: shapes[shapeIndex],
            isVisible: false,
            hasBeenTaken: false,
            status: 'deck',
          });
          createCardsetInput.cards.push(newCard);
        }
      }
    }

    return await this.cardsetRepository.save(createCardsetInput);
  }

  async draw(id: string, amount: number): Promise<Card[]> {
    const response = await this.cardsetRepository
      .createQueryBuilder('cardset')
      .leftJoinAndSelect(
        (qb) =>
          qb
            .select()
            .from('card', 'c')
            .where('c.status = :deck', { deck: 'deck' })
            .orderBy({ 'c.Id': 'ASC' }),
        'card',
        'card."cardSetId" = cardset.id', // the answer
      )
      .where('cardset.id = :id', { id })
      .getRawMany();
    const drawnCards = response.slice(0, amount);
    if (drawnCards.length === 1) {
      drawnCards.pop();
    }
    drawnCards.forEach((card) => (card.status = 'drawn'));
    return this.cardService.update(drawnCards);
  }
  findAll() {
    return `This action returns all cardset`;
  }

  findOne(id: string) {
    return this.cardsetRepository.findOneOrFail(id);
  }

  update(id: number, updateCardsetInput: UpdateCardsetInput) {
    return `This action updates a #${id} cardset`;
  }

  remove(id: string) {
    return this.cardsetRepository.findOneOrFail(id);
  }
}
