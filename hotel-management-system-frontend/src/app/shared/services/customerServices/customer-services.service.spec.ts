import { TestBed } from '@angular/core/testing';

import { CustomerServicesService } from './customer-services.service';

describe('CustomerServicesService', () => {
  let service: CustomerServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
