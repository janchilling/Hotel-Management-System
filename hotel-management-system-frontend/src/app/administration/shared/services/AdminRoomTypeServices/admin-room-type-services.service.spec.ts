import { TestBed } from '@angular/core/testing';

import { AdminRoomTypeServicesService } from './admin-room-type-services.service';

describe('AdminRoomTypeServicesService', () => {
  let service: AdminRoomTypeServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminRoomTypeServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
