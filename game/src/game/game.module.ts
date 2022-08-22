import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameResolver } from './game.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { CardsetModule } from 'src/cardset/cardset.module';
import { CardspotModule } from 'src/cardspot/cardspot.module';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from 'src/user/user.module';
import { Score } from './entities/score.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Score]), CardsetModule, CardspotModule, UserModule],
  providers: [GameResolver, GameService],
})
export class GameModule {}
