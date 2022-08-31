import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ConfigurationModule from './config/config.module';
import { TypeOrmConfigService } from './database/typeorm.config.service';
import { GqlConfigService } from './graphql/gql.config.service';
import { CardModule } from './card/card.module';
import { CardsetModule } from './cardset/cardset.module';
import { GameModule } from './game/game.module';
import { CardspotModule } from './cardspot/cardspot.module';
import { UserModule } from './user/user.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Card } from './card/entities/card.entity';
import { Cardset } from './cardset/entities/cardset.entity';
import { Game } from './game/entities/game.entity';
import { Cardspot } from './cardspot/entities/cardspot.entity';
import { User } from './user/entities/user.entity';
import { Score } from './game/entities/score.entity';

@Module({
  imports: [
    ConfigurationModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'admin',
        password: 'admin',
        database: 'setwg',
        entities: [Card,Cardset,Game,Cardspot,User,Score],
        synchronize: true,
      }),
    }),
    CardModule,
    CardsetModule,
    GameModule,
    CardspotModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
