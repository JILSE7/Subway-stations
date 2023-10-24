import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType()
export class ImageGql {
  @Field(() => String)
  @IsString()
  line: string;

  @Field(() => String)
  @IsString()
  image: string;
}
