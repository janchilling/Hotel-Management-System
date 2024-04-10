import { TestBed } from '@angular/core/testing';

import { DiscountServicesService } from './discount-services.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('DiscountServicesService', () => {
  let service: DiscountServicesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DiscountServicesService]
    });
    service = TestBed.inject(DiscountServicesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add discount successfully', () => {
    const mockDiscount = { /* Mock discount object */ };
    service.addDiscount(mockDiscount).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.backendHostName}/v1/discounts/`);
    expect(req.request.method).toBe('POST');
    req.flush(mockDiscount);
  });

  it('should fail to add discount', () => {
    const mockDiscount = { /* Mock discount object */ };
    service.addDiscount(mockDiscount).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${service.backendHostName}/v1/discounts/`);
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Internal Server Error'));
  });

  it('should fetch discounts successfully', () => {
    const mockContractId = 123;
    service.getDiscounts(mockContractId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service.backendHostName}/v1/contracts/${mockContractId}/discounts/`);
    expect(req.request.method).toBe('GET');
    req.flush([{ /* Mock discount data */ }]);
  });

  it('should fail to fetch discounts', () => {
    const mockContractId = 123;
    service.getDiscounts(mockContractId).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${service.backendHostName}/v1/contracts/${mockContractId}/discounts/`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('Internal Server Error'));
  });
});
