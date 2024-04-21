import { TestBed } from '@angular/core/testing';

import { MainHotelServiceService } from './main-hotel-service.service';

describe('MainHotelServiceService', () => {
  let service: MainHotelServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainHotelServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
