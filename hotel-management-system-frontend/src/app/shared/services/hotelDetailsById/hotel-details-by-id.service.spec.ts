import { TestBed } from '@angular/core/testing';

import { HotelDetailsByIdService } from './hotel-details-by-id.service';

describe('HotelDetailsByIdService', () => {
  let service: HotelDetailsByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelDetailsByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
