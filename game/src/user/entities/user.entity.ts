import { Game } from 'src/game/entities/game.entity';
import { Score } from 'src/game/entities/score.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  externalId: string;

  @OneToMany(() => Game, (game) => game.owner)
  ownedGames: [Game];

  @OneToMany(() => Score, (score) => score.player)
  scores: [Score];
}
