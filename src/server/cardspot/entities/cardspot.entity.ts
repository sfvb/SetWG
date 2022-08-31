import { Card } from '../../card/entities/card.entity';
import { Game } from '../../game/entities/game.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cardspot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  card_number: number;

  @Column({ nullable: true })
  cardId: string;

  @OneToOne(() => Card, (card) => card.spot, { eager: true })
  @JoinColumn()
  card: Card;

  @Column()
  gameId: string;

  @ManyToOne(() => Game, (game) => game.card_spots)
  game: Game[];
}
