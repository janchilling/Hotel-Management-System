import { TestBed } from '@angular/core/testing';

import { AdminDiscountServicesService } from './admin-discount-services.service';

describe('AdminDiscountServicesService', () => {
  let service: AdminDiscountServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminDiscountServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
