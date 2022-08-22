import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Game } from './game.entity';

@Entity()
export class Score {
  @PrimaryColumn()
  playerId: string;

  @ManyToOne(() => User, (user) => user.scores)
  player: User;

  @PrimaryColumn()
  gameId: string;

  @ManyToOne(() => Game, (game) => game.scores)
  game: Game;

  @Column()
  score: number;
}
