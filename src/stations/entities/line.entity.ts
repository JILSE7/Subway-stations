import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Station } from './station.entity';

@Schema()
export class Line extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  @Prop({
    type: [SchemaTypes.ObjectId],
    ref: 'Station',
  })
  stations: Station[];
}

export const LineSchema = SchemaFactory.createForClass(Line);
