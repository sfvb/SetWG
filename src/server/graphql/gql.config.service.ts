import { Injectable } from '@nestjs/common';
import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { ConfigurationService } from '../config/config.service';

const path = require('path');
@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(private readonly configService: ConfigurationService) {}
  createGqlOptions(): GqlModuleOptions {
    return {
      typePaths: ["./src/server/**/*.graphql"],
      definitions: {
        path: path.join(process.cwd(), "src/server/schema.ts"),
      },
      path: this.configService.getGQLEndpointPath(),
      context: async ({
        req: request,
        connection,
      }: {
        req: Request;
        connection: any;
      }): Promise<any> => {
        // SUBSCRIPTION
        if (connection) {
          return { req: connection.context };
        }
        return { req: request };
      },
    };
  }
}
