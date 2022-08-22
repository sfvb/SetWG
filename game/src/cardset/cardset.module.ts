import { Module } from '@nestjs/common';
import { CardsetService } from './cardset.service';
import { CardsetResolver } from './cardset.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cardset } from './entities/cardset.entity';
import { CardModule } from 'src/card/card.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cardset]), CardModule],
  providers: [CardsetResolver, CardsetService],
  exports: [CardsetService],
})
export class CardsetModule {}
