import { TestBed } from '@angular/core/testing';

import { HotelServicesService } from './hotel-services.service';

describe('HotelServicesService', () => {
  let service: HotelServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
