import { Cardset } from 'src/cardset/entities/cardset.entity';
import { Cardspot } from 'src/cardspot/entities/cardspot.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: string;

  @Column()
  color: string;

  @Column()
  shape: string;

  @Column()
  isVisible: boolean;

  @Column()
  hasBeenTaken: boolean;

  @ManyToOne(() => Cardset, (set) => set.cards)
  card_set?: Cardset;

  @OneToOne(() => Cardspot, (cardspot) => cardspot.card)
  spot: Cardspot;

  @Column()
  status: string;
}
