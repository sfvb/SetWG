import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigKeys } from './config.interface';
import { ConfigurationService } from './config.service';

const ConfigModule = NestConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
  load: [
    (): ConfigKeys => {
      if (
        process.env.PASSOWRD_HASH_SALT &&
        isNaN(parseInt(process.env.PASSWORD_HASH_SALT))
      ) {
        console.error(
          'PASSWORD_HASH_SALT must be a number or leave it as default',
        );
        process.exit(1);
      }

      return {
        APP_PORT: parseInt(process.env.APP_PORT) || 8080,
        MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/db',
        PASSWORD_HASH_SALT: parseInt(process.env.PASSWORD_HASH_SALT) || 11,
        TOKEN_ENCRYPT_SECRET: process.env.TOKEN_ENCRYPT_SECRET || 's3cr3t!@#',
        GRAPHQL_ENDPOINT_PATH: process.env.GRAPHQL_ENDPOINT_PATH || '/graphql',
        PDF_FOLDER_NAME: process.env.PDF_FOLDER_NAME,
        NODE_ENV:
          process.env.NODE_ENV === 'production' ? 'production' : 'development',
      };
    },
  ],
});

@Global()
@Module({
  imports: [ConfigModule],
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export default class ConfigurationModule {}
