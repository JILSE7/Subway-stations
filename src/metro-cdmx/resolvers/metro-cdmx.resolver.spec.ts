import { Test, TestingModule } from '@nestjs/testing';
import { MetroCdmxResolver } from './metro-cdmx.resolver';
import { MetroCdmxService } from '../services/metro-cdmx.service';

describe('MetroCdmxResolver', () => {
  let resolver: MetroCdmxResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetroCdmxResolver, MetroCdmxService],
    }).compile();

    resolver = module.get<MetroCdmxResolver>(MetroCdmxResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
