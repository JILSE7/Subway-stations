import { Field, ObjectType } from '@nestjs/graphql';
import { Line } from 'src/stations/entities/line.entity';
import { Station } from 'src/stations/entities/station.entity';

@ObjectType()
export class StationResponse {
  @Field(() => [Station])
  stations: Station[];

  @Field(() => [Line])
  lines: Line[];
}
