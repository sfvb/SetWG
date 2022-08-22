import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigurationService } from 'src/config/config.service';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigurationService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    const { database, host, password, port, username } =
      this.configService.getTypeOrmConfig();
    return {
      type: 'postgres',
      entities: [__dirname + '/../**/*.entity.js'],
      host: host,
      port: +port,
      username: username,
      password: password,
      database: database,
      synchronize: false,
      autoLoadEntities: true,
      migrations: ['src/migrations/**/*.ts'],
      cli: {
        migrationsDir: 'src/database/migrations',
      },
      //logging: true,
    };
  }
}
