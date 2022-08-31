import { CreateCardsetInput } from './create-cardset.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCardsetInput extends PartialType(CreateCardsetInput) {
  id: number;
}
