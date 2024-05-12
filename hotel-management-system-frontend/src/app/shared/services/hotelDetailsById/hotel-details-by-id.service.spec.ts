import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HotelDetailsByIdService } from './hotel-details-by-id.service';
import { ApiPathService } from '../apiPath/api-path.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('HotelDetailsByIdService', () => {
  let service: HotelDetailsByIdService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HotelDetailsByIdService, ApiPathService]
    });
    service = TestBed.inject(HotelDetailsByIdService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch hotel details by id', () => {
    const hotelId = 123;
    const dummyHotelDetails = { id: 123, name: 'Test Hotel', description: 'Test Description' };

    service.getHotelDetailsByIdAdmin(hotelId).subscribe((hotelDetails) => {
      expect(hotelDetails).toEqual(dummyHotelDetails);
    });

    const req = httpTestingController.expectOne(`${service.backendHostName}/v1/hotels/${hotelId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(dummyHotelDetails);
  });

  it('should handle error when fetching hotel details fails', () => {
    const hotelId = 123;
    const errorResponse = new HttpErrorResponse({
      error: 'Error fetching hotel details',
      status: 404,
      statusText: 'Not Found'
    });

    service.getHotelDetailsByIdAdmin(hotelId).subscribe(
      () => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404);
        expect(error.statusText).toEqual('Not Found');
        expect(error.error).toEqual(errorResponse);
      }
    );

    const req = httpTestingController.expectOne(`${service.backendHostName}/v1/hotels/${hotelId}`);
    req.flush(errorResponse, { status: 404, statusText: 'Not Found' });
  });

});
