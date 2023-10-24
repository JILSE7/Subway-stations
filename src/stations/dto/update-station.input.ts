import { CreateStationInput } from './create-station.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@InputType()
export class UpdateStationInput extends PartialType(CreateStationInput) {
  @Field(() => ID)
  @IsMongoId()
  id: string;
}
