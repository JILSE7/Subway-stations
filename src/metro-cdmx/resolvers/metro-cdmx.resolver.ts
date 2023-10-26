import { Response } from '@app/common/types/constants/StationResponse';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Line } from 'src/stations/entities/line.entity';
import { MetroCdmxService } from '../services/metro-cdmx.service';

@Resolver(() => String)
export class MetroCdmxResolver {
  constructor(private readonly metroCdmxService: MetroCdmxService) {}

  /* @Mutation(() => MetroCdmx)
  createMetroCdmx(
    @Args('createMetroCdmxInput') createMetroCdmxInput: CreateMetroCdmxInput,
  ) {
    return this.metroCdmxService.create(createMetroCdmxInput);
  } */

  @Query(() => [Line], { name: 'metroCdmx' })
  findAll() {
    return this.metroCdmxService.findAll();
  }

  /* @Query(() => MetroCdmx, { name: 'metroCdmx' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.metroCdmxService.findOne(id);
  } */

  /* @Mutation(() => MetroCdmx)
  updateMetroCdmx(
    @Args('updateMetroCdmxInput') updateMetroCdmxInput: UpdateMetroCdmxInput,
  ) {
    return this.metroCdmxService.update(
      updateMetroCdmxInput.id,
      updateMetroCdmxInput,
    );
  } */

  /* @Mutation(() => MetroCdmx)
  removeMetroCdmx(@Args('id', { type: () => Int }) id: number) {
    return this.metroCdmxService.remove(id);
  } */
}
