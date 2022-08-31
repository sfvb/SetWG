import { CreateCardspotInput } from './create-cardspot.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCardspotInput extends PartialType(CreateCardspotInput) {
  id: number;
}
