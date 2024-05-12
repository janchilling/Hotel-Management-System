import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SeasonServicesService } from './season-services.service';
import { ApiPathService } from '../apiPath/api-path.service';
import { HttpClient } from '@angular/common/http';

describe('SeasonServicesService', () => {
  let service: SeasonServicesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SeasonServicesService, ApiPathService]
    });
    service = TestBed.inject(SeasonServicesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get seasons by contract ID successfully', () => {
    const contractId = 123;
    service.getSeasonsByContractId(contractId).subscribe(response => {
      expect(response).toBeTruthy();
      // Add additional expectations based on the response from the server
    });

    const request = httpMock.expectOne(`${service.backendHostName}/v1/contracts/${contractId}/seasons`);
    expect(request.request.method).toBe('GET');
    request.flush({ /* mock response body */ });
  });

  it('should handle errors when getting seasons by contract ID', () => {
    const contractId = 123;
    service.getSeasonsByContractId(contractId).subscribe(response => {
      expect(response).toBeNull();
    });

    const request = httpMock.expectOne(`${service.backendHostName}/v1/contracts/${contractId}/seasons`);
    request.error(new ErrorEvent('error'));
  });

  // Add more test cases as needed
});
