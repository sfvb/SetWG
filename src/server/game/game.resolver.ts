import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { GameService } from './game.service';
import { CreateGameInput } from './dto/create-game.input';
import { CardsetService } from '../cardset/cardset.service';
import { Game } from './entities/game.entity';
import { Cardspot } from '../cardspot/entities/cardspot.entity';
import { CardspotService } from '../cardspot/cardspot.service';
import { SetInput } from './dto/set-input';
import { UserService } from '../user/user.service';

@Resolver('Game')
export class GameResolver {
  constructor(
    private readonly gameService: GameService,
    private readonly cardspotService: CardspotService,
    private readonly cardsetService: CardsetService,
    private readonly userService: UserService,
  ) {}

  @Mutation('createGame')
  async createGame(@Args('createGameInput') createGameInput: CreateGameInput) {
    const cardset = await this.cardsetService.create();
    createGameInput.cardSetId = cardset.id;
    const owner = await this.userService.findOneOrCreate(
      createGameInput.ownerId,
    );
    createGameInput.ownerId = owner.id;
    return this.gameService.create(createGameInput);
  }

  @Query('games')
  findAll() {
    return this.gameService.findAll();
  }

  @Query('game')
  findOne(@Args('id') id: string) {
    return this.gameService.findOne(id);
  }

  @Mutation('removeGame')
  remove(@Args('id') id: number) {
    return this.gameService.remove(id);
  }

  @ResolveField(() => [Cardspot])
  async gamespots(@Parent() game: Game): Promise<Cardspot[]> {
    const spots = await this.cardspotService.getGameSpots(game.id);
    return spots;
  }


  @Mutation('checkSet')
  async checkSet(
    @Args('setInput') setInput: SetInput,
    @Args('playerId') playerId: string,
  ): Promise<Game> {
    const game = await this.gameService.findOne(setInput.id);
    const selectedCards = [];
    const board_cards = game.card_spots;
    board_cards.forEach((spot) => {
      if (setInput.spots.includes(spot.card_number)) {
        selectedCards.push(spot.card);
      }
    });


    if (selectedCards.length === 3) {
      const card1 = selectedCards[0];
      const card2 = selectedCards[1];
      const card3 = selectedCards[2];
      if (
        //this.threeAreEqual(card1.color, card2.color, card3.color)
        (this.threeAreEqual(card1.color, card2.color, card3.color) ||
          this.threeAreAllDifferent(card1.color, card2.color, card3.color)) &&
        (this.threeAreEqual(card1.shape, card2.shape, card3.shape) ||
          this.threeAreAllDifferent(card1.shape, card2.shape, card3.shape)) &&
        (this.threeAreEqual(card1.amount, card2.amount, card3.amount) ||
          this.threeAreAllDifferent(card1.amount, card2.amount, card3.amount))
      ) {
        const player = await this.userService.findOneOrCreate(playerId);
        this.gameService.increaseScore(player.id, setInput.id);
        const amount = 3;
        const cardsetId = game.cardSetId;
        const newcards = await this.cardsetService.draw(cardsetId, amount);
        let newCardIndex = 0;
        if (newcards.length === 0) {
          board_cards.forEach((spot) => {
            if (setInput.spots.includes(spot.card_number)) {
              spot.card = null;
              newCardIndex++;
            }
          });
        } else {
          board_cards.forEach((spot) => {
            if (setInput.spots.includes(spot.card_number)) {
              spot.card = newcards[newCardIndex];
              newCardIndex++;
            }
          });
          await this.cardspotService.update(board_cards);
        }
      }
    }
    const newGame = await this.gameService.findOne(setInput.id);
    return newGame;
  }

  threeAreEqual(p1: string, p2: string, p3: string): boolean {
    return p1 === p2 && p1 === p3;
  }
  threeAreAllDifferent(p1: string, p2: string, p3: string): boolean {
    return p1 !== p2 && p1 !== p3 && p2 !== p3;
  }

  @Mutation('pauseGame')
  async pauseGame(
    @Args('gameId') gameId: string,
    @Args('playerId') playerId: string,
  ): Promise<Game> {
    const player = await this.userService.findOneOrCreate(playerId);
    return await this.gameService.pauseGame(gameId, player.id);;
  }
}
