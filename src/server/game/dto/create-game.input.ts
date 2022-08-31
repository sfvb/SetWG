import { User } from '../../user/entities/user.entity';

export class CreateGameInput {
  cardSetId: string;
  name: string;
  ownerId: string;
  owner: User;
}
