import { Card } from 'src/card/entities/card.entity';
import { Game } from 'src/game/entities/game.entity';
import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cardset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Card, (card) => card.card_set)
  cards: [Card];

  @OneToOne(() => Game, (game) => game.card_set)
  game: Game;
}
