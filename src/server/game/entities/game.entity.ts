import { Cardset } from '../../cardset/entities/cardset.entity';
import { Cardspot } from '../../cardspot/entities/cardspot.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Score } from './score.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cardSetId: string;

  @OneToOne(() => Cardset, (set) => set.game)
  @JoinColumn()
  card_set: Cardset;

  @OneToMany(() => Cardspot, (cardspot) => cardspot.game, {
    eager: true,
  })
  card_spots: Cardspot[];

  @Column()
  name: string;

  @Column('boolean', { default: false })
  isDone: boolean;

  @Column()
  ownerId: string;

  @ManyToOne(() => User, (user) => user.ownedGames)
  owner: User;

  @OneToMany(() => Score, (score) => score.game)
  scores: Score[];

  @Column({ nullable: true })
  pausedById: string;

  @ManyToOne(() => User)
  pausedBy: User;
}
