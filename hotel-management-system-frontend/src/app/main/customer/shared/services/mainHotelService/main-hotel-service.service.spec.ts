import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { MainHotelServiceService } from './main-hotel-service.service';

describe('MainHotelServiceService', () => {
  let service: MainHotelServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(MainHotelServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
