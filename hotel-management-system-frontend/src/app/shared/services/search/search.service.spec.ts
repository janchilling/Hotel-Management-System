import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SearchService } from './search.service';
import { ApiPathService } from '../apiPath/api-path.service';
import { HttpClient } from '@angular/common/http';
import { StandardResponse } from '../../interfaces/standard-response';
import { HotelDetails } from '../../interfaces/hotel-details';
import { throwError } from 'rxjs';

describe('SearchService', () => {
  let service: SearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService, ApiPathService]
    });
    service = TestBed.inject(SearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get search data successfully', () => {
    const destination = 'New York';
    const noOfRooms = '2';
    const noOfPersons = '4';
    const checkIn = '2024-05-12';
    const checkOut = '2024-05-15';

    service.getSearchData(destination, noOfRooms, noOfPersons, checkIn, checkOut).subscribe(response => {
      expect(response).toBeTruthy();
      // Add additional expectations based on the response from the server
    });

    const request = httpMock.expectOne(`${service.backendHostName}/v1/products?destination=${destination}&noOfRooms=${noOfRooms}&noOfAdults=${noOfPersons}&checkIn=${checkIn}&checkOut=${checkOut}`);
    expect(request.request.method).toBe('GET');
    request.flush({ /* mock response body */ });
  });

  it('should handle errors when getting search data', () => {
    const destination = 'New York';
    const noOfRooms = '2';
    const noOfPersons = '4';
    const checkIn = '2024-05-12';
    const checkOut = '2024-05-15';

    service.getSearchData(destination, noOfRooms, noOfPersons, checkIn, checkOut).subscribe({
      error: (err) => {
        expect(err).toBeTruthy();
      }
    });

    const request = httpMock.expectOne(`${service.backendHostName}/v1/products?destination=${destination}&noOfRooms=${noOfRooms}&noOfAdults=${noOfPersons}&checkIn=${checkIn}&checkOut=${checkOut}`);
    request.error(new ErrorEvent('error'));
  });

  it('should get admin search data successfully', () => {
    const hotel = 'Hotel ABC';

    service.adminSearchData(hotel).subscribe(response => {
      expect(response).toBeTruthy();
      // Add additional expectations based on the response from the server
    });

    const request = httpMock.expectOne(`${service.backendHostName}/v1/products/admin?hotel=${hotel}`);
    expect(request.request.method).toBe('GET');
    request.flush({ /* mock response body */ });
  });

  it('should handle errors when getting admin search data', () => {
    const hotel = 'Hotel ABC';

    service.adminSearchData(hotel).subscribe({
      error: (err) => {
        expect(err).toBeTruthy();
      }
    });

    const request = httpMock.expectOne(`${service.backendHostName}/v1/products/admin?hotel=${hotel}`);
    request.error(new ErrorEvent('error'));
  });

  // Add more test cases as needed
});
