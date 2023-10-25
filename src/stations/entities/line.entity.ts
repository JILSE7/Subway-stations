import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Station } from './station.entity';

@Schema()
@ObjectType()
export class Line extends Document {
  @Field(() => String, { name: 'name' })
  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  @Field(() => [Station], { name: 'images' })
  @Prop({
    type: [SchemaTypes.ObjectId],
    ref: 'Station',
  })
  stations: Station[];
}

export const LineSchema = SchemaFactory.createForClass(Line);
