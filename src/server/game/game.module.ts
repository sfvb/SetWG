import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameResolver } from './game.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { CardsetModule } from '../cardset/cardset.module';
import { CardspotModule } from '../cardspot/cardspot.module';
import { UserModule } from '../user/user.module';
import { Score } from './entities/score.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Score]), CardsetModule, CardspotModule, UserModule],
  providers: [GameResolver, GameService],
})
export class GameModule {}
