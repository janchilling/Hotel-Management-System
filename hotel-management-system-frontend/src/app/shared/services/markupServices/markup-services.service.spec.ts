import { TestBed } from '@angular/core/testing';

import { MarkupServicesService } from './markup-services.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('MarkupServicesService', () => {
  let service: MarkupServicesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MarkupServicesService]
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

  it('should add markup successfully', () => {
    const mockMarkup = { /* Mock markup object */ };
    service.addMarkup(mockMarkup).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.backendHostName}/v1/markups/`);
    expect(req.request.method).toBe('POST');
    req.flush(mockMarkup);
  });

  it('should fail to add markup', () => {
    const mockMarkup = { /* Mock markup object */ };
    service.addMarkup(mockMarkup).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${service.backendHostName}/v1/markups/`);
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Internal Server Error'));
  });

  it('should fetch markups by contract ID successfully', () => {
    const mockContractId = 123;
    service.getMarkupsByContractId(mockContractId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.backendHostName}/v1/contracts/${mockContractId}/markups`);
    expect(req.request.method).toBe('GET');
    req.flush([{ /* Mock markup data */ }]);
  });

  it('should fail to fetch markups by contract ID', () => {
    const mockContractId = 123;
    service.getMarkupsByContractId(mockContractId).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${service.backendHostName}/v1/contracts/${mockContractId}/markups`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Internal Server Error'));
  });
});
