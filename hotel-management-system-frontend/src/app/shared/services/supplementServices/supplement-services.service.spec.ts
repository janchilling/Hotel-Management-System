import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SupplementServicesService } from './supplement-services.service';
import { ApiPathService } from '../apiPath/api-path.service';
import { HttpClient } from '@angular/common/http';

describe('SupplementServicesService', () => {
  let service: SupplementServicesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SupplementServicesService, ApiPathService]
    });
    service = TestBed.inject(SupplementServicesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get supplements by contract ID successfully', () => {
    const contractId = 123;
    service.getSupplementsByContractId(contractId).subscribe(response => {
      expect(response).toBeTruthy();
      // Add additional expectations based on the response from the server
    });

    const request = httpMock.expectOne(`${service.backendHostName}/v1/contracts/${contractId}/supplements`);
    expect(request.request.method).toBe('GET');
    request.flush({ /* mock response body */ });
  });

  it('should handle errors when getting supplements by contract ID', () => {
    const contractId = 123;
    service.getSupplementsByContractId(contractId).subscribe(response => {
      expect(response).toBeNull();
    });

    const request = httpMock.expectOne(`${service.backendHostName}/v1/contracts/${contractId}/supplements`);
    request.error(new ErrorEvent('error'));
  });

  it('should add supplement successfully', () => {
    const mockSupplement = { /* mock supplement object */ };
    service.addSupplement(mockSupplement).subscribe(response => {
      expect(response).toBeTruthy();
      // Add additional expectations based on the response from the server
    });

    const request = httpMock.expectOne(`${service.backendHostName}/v1/supplements`);
    expect(request.request.method).toBe('POST');
    request.flush({ /* mock response body */ });
  });

  it('should handle errors when adding supplement', () => {
    const mockSupplement = { /* invalid/malformed supplement object */ };
    service.addSupplement(mockSupplement).subscribe(response => {
      expect(response).toBeNull();
    });

    const request = httpMock.expectOne(`${service.backendHostName}/v1/supplements`);
    request.error(new ErrorEvent('error'));
  });

  // Add more test cases as needed
});
