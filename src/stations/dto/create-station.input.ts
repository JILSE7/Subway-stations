import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateStationInput {
  @Field(() => String, {
    description: 'Station Name',
    nullable: false,
    name: 'name',
  })
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @Field(() => [String], { name: 'images', defaultValue: [] })
  @IsArray()
  @IsOptional()
  images?: [];

  @Field(() => Number, { name: 'lat', nullable: false })
  @IsNumber({ maxDecimalPlaces: 6 })
  lat: number;

  @Field(() => Number, { name: 'long', nullable: false })
  @IsNumber({ maxDecimalPlaces: 6 })
  long: number;
}
