import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateMetroCdmxInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
