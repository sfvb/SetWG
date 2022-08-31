import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCardInput } from './dto/create-card.input';
import { UpdateCardInput } from './dto/update-card.input';
import { Card } from './entities/card.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card) private cardRepository: Repository<Card>,
  ) {}

  create(createCardInput: CreateCardInput): Promise<Card> {
    const newCard = this.cardRepository.create(createCardInput);

    return this.cardRepository.save(newCard);
  }

  findAll() {
    return this.cardRepository.find();
  }

  async findOne(id: string): Promise<Card> {
    return this.cardRepository.findOneOrFail({ where: { id } });
  }

  update(cards: Card[]) {
    return this.cardRepository.save(cards);
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
