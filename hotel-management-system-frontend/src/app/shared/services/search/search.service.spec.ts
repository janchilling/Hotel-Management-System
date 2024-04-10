import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ApiPathService} from "../apiPath/api-path.service";

describe('SearchService', () => {
  let service: SearchService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiPathService, SearchService]
    });
    service = TestBed.inject(SearchService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getSearchData with correct URL and return data', () => {
    const testData = [{ id: 1, name: 'Hotel A' }];
    const destination = 'Paris';
    const noOfRooms = '2';
    const checkIn = '2024-05-01';
    const checkOut = '2024-05-05';

    service.getSearchData(destination, noOfRooms, checkIn, checkOut).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpTestingController.expectOne(`${service.backendHostName}/v1/products?destination=${destination}&noOfRooms=${noOfRooms}&checkIn=${checkIn}&checkOut=${checkOut}`);
    expect(req.request.method).toEqual('GET');

    req.flush(testData);
  });

  it('should call adminSearchData with correct URL and return data', () => {
    const testData = [{ id: 1, name: 'Hotel A' }];
    const hotel = 'Hilton';

    service.adminSearchData(hotel).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpTestingController.expectOne(`${service.backendHostName}/v1/products/admin?hotel=${hotel}`);
    expect(req.request.method).toEqual('GET');

    req.flush(testData);
  });
});
