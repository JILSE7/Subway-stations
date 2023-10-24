import { Module } from '@nestjs/common';
import { StationsService } from './services/stations.service';
import { StationsResolver } from './resolvers/stations.resolver';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Station, StationSchema } from './entities/station.entity';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Station.name, schema: StationSchema }]),
  ],
  providers: [StationsResolver, StationsService],
})
export class StationsModule {}
