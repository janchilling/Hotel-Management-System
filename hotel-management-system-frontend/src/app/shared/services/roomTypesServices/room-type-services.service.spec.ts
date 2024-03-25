import { TestBed } from '@angular/core/testing';

import { RoomTypeServicesService } from './room-type-services.service';

describe('RoomTypeServicesService', () => {
  let service: RoomTypeServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomTypeServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
