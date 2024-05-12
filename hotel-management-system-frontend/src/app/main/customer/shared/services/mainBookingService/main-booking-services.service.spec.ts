import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MainBookingServicesService } from './main-booking-services.service';
import { ApiPathService } from '../../../../../shared/services/apiPath/api-path.service';
import { HttpClient } from '@angular/common/http';

describe('MainBookingServicesService', () => {
  let service: MainBookingServicesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MainBookingServicesService, ApiPathService]
    });
    service = TestBed.inject(MainBookingServicesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add booking successfully', () => {
    const mockBooking = { /* mock booking object */ };
    service.addBooking(mockBooking).subscribe(response => {
      expect(response).toBeTruthy();
      // Add additional expectations based on the response from the server
    });

    const request = httpMock.expectOne(`${service.backendHostName}/v1/bookings`);
    expect(request.request.method).toBe('POST');
    request.flush({ /* mock response body */ });
  });

  it('should handle errors when adding booking', () => {
    const mockBooking = { /* invalid/malformed booking object */ };
    service.addBooking(mockBooking).subscribe(response => {
      expect(response).toBeNull();
    });

    const request = httpMock.expectOne(`${service.backendHostName}/v1/bookings`);
    request.error(new ErrorEvent('error'));
  });

  it('should get bookings by customer ID successfully', () => {
    const userId = 123;
    service.getBookingsByCustomer(userId).subscribe(response => {
      expect(response).toBeTruthy();
      // Add additional expectations based on the response from the server
    });

    const request = httpMock.expectOne(`${service.backendHostName}/v1/customers/${userId}/bookings`);
    expect(request.request.method).toBe('GET');
    request.flush({ /* mock response body */ });
  });

  it('should handle errors when getting bookings by customer ID', () => {
    const userId = 123;
    service.getBookingsByCustomer(userId).subscribe(response => {
      expect(response).toBeNull();
    });

    const request = httpMock.expectOne(`${service.backendHostName}/v1/customers/${userId}/bookings`);
    request.error(new ErrorEvent('error'));
  });

  it('should get booking by booking ID successfully', () => {
    const bookingId = 456;
    service.getBookingsByBookingId(bookingId).subscribe(response => {
      expect(response).toBeTruthy();
      // Add additional expectations based on the response from the server
    });

    const request = httpMock.expectOne(`${service.backendHostName}/v1/bookings/${bookingId}`);
    expect(request.request.method).toBe('GET');
    request.flush({ /* mock response body */ });
  });

  it('should handle errors when getting booking by booking ID', () => {
    const bookingId = 456;
    service.getBookingsByBookingId(bookingId).subscribe(response => {
      expect(response).toBeNull();
    });

    const request = httpMock.expectOne(`${service.backendHostName}/v1/bookings/${bookingId}`);
    request.error(new ErrorEvent('error'));
  });

  it('should check if user has booking successfully', () => {
    const userId = 789;
    const checkInDate = '2024-05-12';
    const checkOutDate = '2024-05-15';

    service.checkUserHasBooking(userId, checkInDate, checkOutDate).subscribe(response => {
      expect(response).toBeTruthy();
      // Add additional expectations based on the response from the server
    });

    const expectedUrl = `${service.backendHostName}/v1/customers/${userId}/availability?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;
    const request = httpMock.expectOne(expectedUrl);
    expect(request.request.method).toBe('GET');
    request.flush({ /* mock response body */ });
  });

  it('should handle errors when checking if user has booking', () => {
    const userId = 789;
    const checkInDate = '2024-05-12';
    const checkOutDate = '2024-05-15';

    service.checkUserHasBooking(userId, checkInDate, checkOutDate).subscribe(response => {
      expect(response).toBeNull();
    });

    const expectedUrl = `${service.backendHostName}/v1/customers/${userId}/availability?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;
    const request = httpMock.expectOne(expectedUrl);
    request.error(new ErrorEvent('error'));
  });

  // Add more test cases as needed
});
