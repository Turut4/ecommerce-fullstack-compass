import { Test, TestingModule } from '@nestjs/testing';
import { SkuService } from './sku.service';

describe('SkuService', () => {
  let service: SkuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SkuService],
    }).compile();

    service = module.get<SkuService>(SkuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
