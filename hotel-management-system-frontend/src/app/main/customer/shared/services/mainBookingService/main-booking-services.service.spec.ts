import { TestBed } from '@angular/core/testing';

import { MainBookingServicesService } from './main-booking-services.service';

describe('MainBookingServicesService', () => {
  let service: MainBookingServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainBookingServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
