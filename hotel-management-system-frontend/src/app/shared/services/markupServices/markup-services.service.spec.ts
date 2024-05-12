import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MarkupServicesService } from './markup-services.service';
import { ApiPathService } from '../apiPath/api-path.service';
import { HttpClient } from '@angular/common/http';

describe('MarkupServicesService', () => {
  let service: MarkupServicesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MarkupServicesService, ApiPathService]
    });
    service = TestBed.inject(MarkupServicesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a markup successfully', () => {
    const mockMarkup = { /* mock markup object */ };
    service.addMarkup(mockMarkup).subscribe(response => {
      expect(response).toBeTruthy();
      // Add additional expectations based on the response from the server
    });

    const request = httpMock.expectOne(`${service.backendHostName}/v1/markups`);
    expect(request.request.method).toBe('POST');
    request.flush({ /* mock response body */ });
  });

  it('should handle errors when adding markup', () => {
    const mockMarkup = { /* invalid/malformed markup object */ };
    service.addMarkup(mockMarkup).subscribe(response => {
      expect(response).toBeNull();
    });

    const request = httpMock.expectOne(`${service.backendHostName}/v1/markups`);
    request.error(new ErrorEvent('error'));
  });

  it('should get markups by contract ID successfully', () => {
    const contractId = 123;
    service.getMarkupsByContractId(contractId).subscribe(response => {
      expect(response).toBeTruthy();
      // Add additional expectations based on the response from the server
    });

    const request = httpMock.expectOne(`${service.backendHostName}/v1/contracts/${contractId}/markups`);
    expect(request.request.method).toBe('GET');
    request.flush({ /* mock response body */ });
  });

  it('should handle errors when getting markups by contract ID', () => {
    const contractId = 123;
    service.getMarkupsByContractId(contractId).subscribe(response => {
      expect(response).toBeNull();
    });

    const request = httpMock.expectOne(`${service.backendHostName}/v1/contracts/${contractId}/markups`);
    request.error(new ErrorEvent('error'));
  });

  // Add more test cases as needed
});
