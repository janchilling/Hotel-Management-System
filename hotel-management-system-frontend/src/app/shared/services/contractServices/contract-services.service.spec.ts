import { TestBed } from '@angular/core/testing';

import { ContractServicesService } from './contract-services.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('ContractServicesService', () => {
  let service: ContractServicesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContractServicesService]
    });
    service = TestBed.inject(ContractServicesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add contract successfully', () => {
    const mockContract = { /* Mock contract object */ };
    service.addContract(mockContract).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.backendHostName}/v1/contracts/`);
    expect(req.request.method).toBe('POST');
    req.flush(mockContract);
  });

  it('should fail to add contract', () => {
    const mockContract = { /* Mock contract object */ };
    service.addContract(mockContract).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${service.backendHostName}/v1/contracts/`);
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Internal Server Error'));
  });
});
