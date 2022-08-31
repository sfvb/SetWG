import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('findOneOrCreate')
  findOneOrCreate(@Args('externalId') externalId: string) {
    return this.userService.findOneOrCreate(externalId);
  }
}
