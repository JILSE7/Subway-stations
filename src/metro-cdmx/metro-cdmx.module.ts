import { Module } from '@nestjs/common';
import { MetroCdmxService } from './services/metro-cdmx.service';
import { MetroCdmxResolver } from './resolvers/metro-cdmx.resolver';
import { StationsModule } from 'src/stations/stations.module';
import { Line } from 'src/stations/entities/line.entity';

@Module({
  imports: [StationsModule],
  providers: [MetroCdmxResolver, MetroCdmxService],
})
export class MetroCdmxModule {}
