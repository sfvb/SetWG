import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from 'src/card/entities/card.entity';
import { Repository } from 'typeorm';
import { CreateCardspotInput } from './dto/create-cardspot.input';
import { UpdateCardspotInput } from './dto/update-cardspot.input';
import { Cardspot } from './entities/cardspot.entity';

@Injectable()
export class CardspotService {
  constructor(
    @InjectRepository(Cardspot)
    private cardspotRepository: Repository<Cardspot>,
  ) {}

  async create(createCardspotInput: CreateCardspotInput): Promise<Cardspot> {
    return this.cardspotRepository.save(createCardspotInput);
  }

  async createMany(
    createCardspotInput: CreateCardspotInput[],
  ): Promise<Cardspot[]> {
    return this.cardspotRepository.save(createCardspotInput);
  }

  findAll() {
    return `This action returns all cardspot`;
  }

  findOne(id: string) {
    return this.cardspotRepository.findOneOrFail(id);
  }

  update(spots: Cardspot[]) {
    return this.cardspotRepository.save(spots);
  }

  remove(id: number) {
    return `This action removes a #${id} cardspot`;
  }
  async getGameSpots(id: string): Promise<Cardspot[]> {
    const spots = await this.cardspotRepository.find({
      where: { gameId: id },
    });
    return spots;
  }
}
