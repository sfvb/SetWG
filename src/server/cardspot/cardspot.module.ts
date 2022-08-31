import { Module } from '@nestjs/common';
import { CardspotService } from './cardspot.service';
import { CardspotResolver } from './cardspot.resolver';
import { Cardspot } from './entities/cardspot.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardModule } from '../card/card.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cardspot]), CardModule],
  providers: [CardspotResolver, CardspotService],
  exports: [CardspotService],
})
export class CardspotModule {}
