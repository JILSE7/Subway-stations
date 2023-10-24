import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { ImageGql } from '../dto/args/image.arg';

const stationImgDefault =
  'https://www.mexicodesconocido.com.mx/wp-content/uploads/2020/04/metro_logotipo.png';

export type StationDocument = HydratedDocument<Station>;

@Schema()
@ObjectType()
export class Station extends Document {
  @Field(() => String, { name: 'name' })
  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  /* @Prop({
    unique: false,
    index: false,
    default: stationImgDefault,
  }) */
  @Field(() => [ImageGql], { name: 'images' })
  @Prop({
    type: [
      {
        line: { type: 'String' },
        image: { type: 'String', default: stationImgDefault, _id: 1 },
      },
    ],
    index: false,
  })
  images: [];

  @Field(() => Number, { name: 'lat' })
  @Prop({
    unique: false,
  })
  lat: number;

  @Field(() => Number, { name: 'long' })
  @Prop({
    unique: false,
  })
  long: number;
}

export const StationSchema = SchemaFactory.createForClass(Station);
