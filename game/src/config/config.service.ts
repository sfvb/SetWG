import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { ConfigKeys } from './config.interface';

@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService) {}

  public getAppListeningPort() {
    return this.configService.get('APP_PORT');
  }

  public getMongoURI() {
    return this.configService.get('MONGO_URI');
  }

  public getGQLEndpointPath() {
    return this.configService.get('GRAPHQL_ENDPOINT_PATH');
  }

  /**
   * @description This function return defined password salt
   * used when hash password
   * @returns number
   */
  public getPasswordHashSalt() {
    return this.configService.get<number>('PASSWORD_HASH_SALT');
  }

  public getTokenEncryptSecret() {
    return this.configService.get<string>('TOKEN_ENCRYPT_SECRET');
  }

  public getPDFFolderName() {
    return this.configService.get<string>('PDF_FOLDER_NAME');
  }

  public getEnv() {
    return this.configService.get<'production' | 'environment'>('NODE_ENV');
  }

  public getPDFFolderPath() {
    return join(process.cwd(), this.getPDFFolderName());
  }

  public getPubSubConfig() {
    const redisPort = Number(process.env.REDIS_PORT);
    return {
      redisHost: process.env.REDIS_HOST,
      redisPort: redisPort,
      redisPwd: process.env.REDIS_PWD,
      redisEnabled: process.env.PUBSUB_USE_REDIS === 'true' ? true : false,
    };
  }

  public getTypeOrmConfig() {
    return {
      host: this.configService.get('POSTGRES_HOST'),
      port: +this.configService.get<number>('POSTGRES_PORT'),
      username: this.configService.get('POSTGRES_USER'),
      password: this.configService.get('POSTGRES_PASSWORD'),
      database: this.configService.get('POSTGRES_DB'),
    };
  }
}
