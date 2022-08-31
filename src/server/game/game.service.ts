import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardsetService } from '../cardset/cardset.service';
import { CardspotService } from '../cardspot/cardspot.service';
import { Cardset } from '../cardset/entities/cardset.entity';
import { CreateCardspotInput } from '../cardspot/dto/create-cardspot.input';
import { Repository } from 'typeorm';
import { CreateGameInput } from './dto/create-game.input';
import { Game } from './entities/game.entity';
import { Score } from './entities/score.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private gameRepository: Repository<Game>,
    @InjectRepository(Score) private scoreRepository: Repository<Score>,
    private readonly cardsetService: CardsetService,
    private readonly cardspotService: CardspotService,
  ) {}

  async create(createGameInput: CreateGameInput): Promise<Game> {
    const returnGame = await this.gameRepository.save(createGameInput);
    const boardcards = await this.cardsetService.draw(
      createGameInput.cardSetId,
      12,
    );
    const boardpositions = [] as Array<CreateCardspotInput>;
    let position = 0;
    await boardcards.forEach((card) => {
      const boardposition = new CreateCardspotInput();
      boardposition.card_number = position;
      boardposition.cardId = card.id;
      boardposition.gameId = returnGame.id;
      boardpositions.push(boardposition);
      position++;
    });
    await this.cardspotService.createMany(boardpositions);
    return returnGame;
  }

  findAll(): Promise<Game[]> {
    return this.gameRepository.find();
  }

  async findOne(id: string): Promise<Game> {
    const game = this.gameRepository.findOneOrFail({ where: { id } });
    return game;
  }

  update(game: Game) {
    return null;
  }

  remove(id: number) {
    return null;
  }

  getCardset(id: string): Promise<Cardset> {
    return this.cardsetService.findOne(id);
  }

  async findOneScore(playerId: string, gameId: string): Promise<Score> {
    const score = this.scoreRepository.findOne({ where: { playerId, gameId } });
    return score;
  }

  async createScore(playerId: string, gameId: string): Promise<Score> {
    let score = this.scoreRepository.save({ playerId, gameId, score: 1 });
    return score;
  }

  async increaseScore(playerId: string, gameId: string): Promise<Score> {
    let score = await this.findOneScore(playerId, gameId);
    if (!score) {
      score = await this.createScore(playerId, gameId);
    } else {
      score.score += 1;
    }
    return this.scoreRepository.save(score);
  }

  async pauseGame(gameId: string, playerId: string): Promise<Game> {
    console.log('game paused');
    const game = await this.findOne(gameId);
    game.pausedById = playerId;
    return this.gameRepository.save(game);
  }
}
