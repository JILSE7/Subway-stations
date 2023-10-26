import { SubwayFamily } from '@app/common/types/enums/line-family.enum';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as SchemaMoongose, SchemaTypes } from 'mongoose';
import { Station } from './station.entity';

@Schema()
@ObjectType()
export class Line extends Document {
  @Field(() => String)
  _id: SchemaMoongose.Types.ObjectId;

  @Field(() => String, { name: 'name' })
  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  @Field(() => [Station], { name: 'stations' })
  @Prop({
    type: [
      {
        _id: SchemaTypes.ObjectId,
        station_id: String,
      },
    ],
    ref: 'Station',
  })
  stations: Station[];

  @Field(() => String, { name: 'subwayFamily', nullable: true })
  @Prop({
    type: String,
    required: true,
  })
  subwayFamily: SubwayFamily;

  @Field(() => String, { name: 'line_id' })
  @Prop({
    unique: true,
    required: true,
    index: true,
  })
  line_id: string;
}

export const LineSchema = SchemaFactory.createForClass(Line);
