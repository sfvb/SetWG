import { Card } from 'src/card/entities/card.entity';
import { Game } from 'src/game/entities/game.entity';

export class CreateCardspotInput {
  card_number: number;
  cardId: string;
  gameId: string;
}
