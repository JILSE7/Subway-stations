import { Test, TestingModule } from '@nestjs/testing';
import { MetroCdmxService } from './metro-cdmx.service';

describe('MetroCdmxService', () => {
  let service: MetroCdmxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetroCdmxService],
    }).compile();

    service = module.get<MetroCdmxService>(MetroCdmxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
