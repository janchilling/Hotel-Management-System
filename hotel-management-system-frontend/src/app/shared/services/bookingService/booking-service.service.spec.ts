import { TestBed } from '@angular/core/testing';

import { BookingServiceService } from './booking-service.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('BookingServiceService', () => {
  let service: BookingServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookingServiceService]
    });
    service = TestBed.inject(BookingServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add booking successfully', () => {
    const mockBooking = { /* Mock booking object */ };
    service.addBooking(mockBooking).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.backendHostName}/v1/bookings/`);
    expect(req.request.method).toBe('POST');
    req.flush(mockBooking);
  });

  it('should fail to add booking', () => {
    const mockBooking = { /* Mock booking object */ };
    service.addBooking(mockBooking).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${service.backendHostName}/v1/bookings/`);
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Internal Server Error'));
  });

  it('should fetch bookings by customer successfully', () => {
    const mockUserId = 123;
    service.getBookingsByCustomer(mockUserId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.backendHostName}/v1/customers/${mockUserId}/bookings/`);
    expect(req.request.method).toBe('GET');
    req.flush([{ /* Mock booking data */ }]);
  });

  it('should fail to fetch bookings by customer', () => {
    const mockUserId = 123;
    service.getBookingsByCustomer(mockUserId).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${service.backendHostName}/v1/customers/${mockUserId}/bookings/`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Internal Server Error'));
  });

  it('should fetch booking by bookingId successfully', () => {
    const mockBookingId = 456;
    service.getBookingsByBookingId(mockBookingId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.backendHostName}/v1/bookings/${mockBookingId}`);
    expect(req.request.method).toBe('GET');
    req.flush({ /* Mock booking data */ });
  });

  it('should fail to fetch booking by bookingId', () => {
    const mockBookingId = 456;
    service.getBookingsByBookingId(mockBookingId).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${service.backendHostName}/v1/bookings/${mockBookingId}`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Internal Server Error'));
  });
});
