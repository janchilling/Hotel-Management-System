import { TestBed } from '@angular/core/testing';

import { DiscountServicesService } from './discount-services.service';

describe('DiscountServicesService', () => {
  let service: DiscountServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscountServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
