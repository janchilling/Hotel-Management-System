import { TestBed } from '@angular/core/testing';

import { SupplementServicesService } from './supplement-services.service';

describe('SupplementServicesService', () => {
  let service: SupplementServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupplementServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
