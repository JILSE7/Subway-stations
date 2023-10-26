import { CreateMetroCdmxInput } from './create-metro-cdmx.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMetroCdmxInput extends PartialType(CreateMetroCdmxInput) {
  @Field(() => Int)
  id: number;
}
