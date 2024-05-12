import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AdminRoomTypeServicesService } from './admin-room-type-services.service';

describe('AdminRoomTypeServicesService', () => {
  let service: AdminRoomTypeServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AdminRoomTypeServicesService]
    });
    service = TestBed.inject(AdminRoomTypeServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
