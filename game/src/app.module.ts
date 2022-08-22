import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
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

@Module({
  imports: [
    ConfigurationModule,
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
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
