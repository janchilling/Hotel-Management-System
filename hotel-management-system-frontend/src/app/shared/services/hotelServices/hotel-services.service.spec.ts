import { TestBed } from '@angular/core/testing';

import { HotelServicesService } from './hotel-services.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('HotelServicesService', () => {
  let service: HotelServicesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HotelServicesService]
    });
    service = TestBed.inject(HotelServicesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add hotel successfully', () => {
    const mockHotel = { /* Mock hotel object */ };
    service.addHotel(mockHotel).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.backendHostName}/v1/hotels/`);
    expect(req.request.method).toBe('POST');
    req.flush(mockHotel);
  });

  it('should fail to add hotel', () => {
    const mockHotel = { /* Mock hotel object */ };
    service.addHotel(mockHotel).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${service.backendHostName}/v1/hotels/`);
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Internal Server Error'));
  });

  it('should fetch hotel images successfully', () => {
    const mockHotelId = 123;
    service.getHotelImages(mockHotelId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.backendHostName}/v1/hotels/${mockHotelId}/images`);
    expect(req.request.method).toBe('GET');
    req.flush([{ /* Mock image data */ }]);
  });

  it('should fail to fetch hotel images', () => {
    const mockHotelId = 123;
    service.getHotelImages(mockHotelId).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${service.backendHostName}/v1/hotels/${mockHotelId}/images`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Internal Server Error'));
  });
});
