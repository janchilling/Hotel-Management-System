import { TestBed } from '@angular/core/testing';

import { HotelDetailsByIdService } from './hotel-details-by-id.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('HotelDetailsByIdService', () => {
  let service: HotelDetailsByIdService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HotelDetailsByIdService]
    });
    service = TestBed.inject(HotelDetailsByIdService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch hotel details by ID successfully', () => {
    const mockHotelId = 123;
    const expectedUrl = `${service.backendHostName}/v1/products/${mockHotelId}`;
    service.getHotelDetailsById(mockHotelId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush({ /* Mock hotel data */ });
  });

  it('should fetch hotel details by ID for admin successfully', () => {
    const mockHotelId = 123;
    const expectedUrl = `${service.backendHostName}/v1/hotels/${mockHotelId}`;
    service.getHotelDetailsByIdAdmin(mockHotelId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush({ /* Mock hotel data */ });
  });
});
